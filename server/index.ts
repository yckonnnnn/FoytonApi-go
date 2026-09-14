import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';
import { createCipheriv, createDecipheriv, createHash, randomBytes, randomInt, randomUUID, timingSafeEqual } from 'node:crypto';
import { mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

type AuthedRequest = Request & { user?: any; apiKey?: any };
type RoutePolicy = 'cheapest' | 'stable' | 'provider';

const app = express();
const port = Number(process.env.PORT || 8787);
const databasePath = path.resolve(process.env.DATABASE_PATH || './data/foyton.db');
mkdirSync(path.dirname(databasePath), { recursive: true });
const db = new DatabaseSync(databasePath);
db.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;');

const now = () => new Date().toISOString();
const id = (prefix: string) => `${prefix}_${randomUUID().replaceAll('-', '')}`;
const sha256 = (value: string) => createHash('sha256').update(value).digest('hex');
const money = (value: number) => Math.round(value * 1_000_000) / 1_000_000;
const jwtSecret = process.env.JWT_SECRET || (process.env.NODE_ENV === 'production' ? '' : 'development-only-secret-change-me');

if (!jwtSecret) throw new Error('JWT_SECRET is required in production');

function encryptionKey() {
  const configured = process.env.ENCRYPTION_KEY;
  if (configured && /^[a-f\d]{64}$/i.test(configured)) return Buffer.from(configured, 'hex');
  if (process.env.NODE_ENV === 'production') throw new Error('ENCRYPTION_KEY must be 64 hex characters');
  return createHash('sha256').update('foyton-development-encryption-key').digest();
}

function encrypt(value: string) {
  if (!value) return '';
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', encryptionKey(), iv);
  const body = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return [iv.toString('hex'), cipher.getAuthTag().toString('hex'), body.toString('hex')].join('.');
}

function decrypt(value: string) {
  if (!value) return '';
  const [iv, tag, body] = value.split('.').map((part) => Buffer.from(part, 'hex'));
  const decipher = createDecipheriv('aes-256-gcm', encryptionKey(), iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(body), decipher.final()]).toString('utf8');
}

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, username TEXT UNIQUE, name TEXT NOT NULL,
    password_hash TEXT NOT NULL, role TEXT NOT NULL DEFAULT 'user', status TEXT NOT NULL DEFAULT 'active',
    balance REAL NOT NULL DEFAULT 0, total_spent REAL NOT NULL DEFAULT 0,
    route_policy TEXT NOT NULL DEFAULT 'stable', preferred_provider TEXT,
    blocked_models TEXT NOT NULL DEFAULT '[]', monthly_budget REAL NOT NULL DEFAULT 0,
    alert_threshold INTEGER NOT NULL DEFAULT 80, low_balance_threshold REAL NOT NULL DEFAULT 10,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL, name TEXT NOT NULL, key_hash TEXT UNIQUE NOT NULL,
    key_prefix TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'active', monthly_limit REAL NOT NULL DEFAULT 0,
    monthly_used REAL NOT NULL DEFAULT 0, last_used_at TEXT, created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS providers (
    id TEXT PRIMARY KEY, name TEXT UNIQUE NOT NULL, base_url TEXT NOT NULL, api_key_enc TEXT NOT NULL DEFAULT '',
    protocol TEXT NOT NULL DEFAULT 'openai', status TEXT NOT NULL DEFAULT 'disabled', priority INTEGER NOT NULL DEFAULT 100,
    success_rate REAL NOT NULL DEFAULT 100, avg_latency_ms INTEGER NOT NULL DEFAULT 0,
    last_check_at TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS model_routes (
    id TEXT PRIMARY KEY, public_model TEXT NOT NULL, provider_id TEXT NOT NULL, upstream_model TEXT NOT NULL,
    input_price REAL NOT NULL, output_price REAL NOT NULL, input_cost REAL NOT NULL DEFAULT 0,
    output_cost REAL NOT NULL DEFAULT 0, enabled INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY(provider_id) REFERENCES providers(id), UNIQUE(public_model, provider_id)
  );
  CREATE TABLE IF NOT EXISTS usage_logs (
    id TEXT PRIMARY KEY, request_id TEXT UNIQUE NOT NULL, user_id TEXT NOT NULL, api_key_id TEXT,
    public_model TEXT NOT NULL, upstream_model TEXT, provider_id TEXT,
    prompt_tokens INTEGER NOT NULL DEFAULT 0, completion_tokens INTEGER NOT NULL DEFAULT 0,
    input_price REAL NOT NULL DEFAULT 0, output_price REAL NOT NULL DEFAULT 0,
    amount REAL NOT NULL DEFAULT 0, status_code INTEGER NOT NULL, result TEXT NOT NULL,
    latency_ms INTEGER NOT NULL DEFAULT 0, error_message TEXT, created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS ledger (
    id TEXT PRIMARY KEY, user_id TEXT NOT NULL, type TEXT NOT NULL, amount REAL NOT NULL,
    balance_after REAL NOT NULL, reference_id TEXT, note TEXT, created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS alerts (
    id TEXT PRIMARY KEY, user_id TEXT, type TEXT NOT NULL, title TEXT NOT NULL, message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'unread', created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  CREATE TABLE IF NOT EXISTS incidents (
    id TEXT PRIMARY KEY, title TEXT NOT NULL, message TEXT NOT NULL, severity TEXT NOT NULL,
    status TEXT NOT NULL, starts_at TEXT NOT NULL, resolved_at TEXT, created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS service_components (
    id TEXT PRIMARY KEY, name TEXT UNIQUE NOT NULL, status TEXT NOT NULL, note TEXT, updated_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS email_verification_codes (
    id TEXT PRIMARY KEY, email TEXT NOT NULL, purpose TEXT NOT NULL, code_hash TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0, expires_at TEXT NOT NULL, created_at TEXT NOT NULL
  );
`);

// Keep existing installations compatible with the username sign-in update.
try { db.exec('ALTER TABLE users ADD COLUMN username TEXT'); } catch { /* Column already exists. */ }
db.prepare("UPDATE users SET username=? WHERE username IS NULL OR username='' ").run('user_pending');
for (const user of db.prepare("SELECT id FROM users WHERE username='user_pending'").all() as any[]) {
  db.prepare('UPDATE users SET username=? WHERE id=?').run(`user_${String(user.id).replace(/^usr_/, '').slice(0, 12)}`, user.id);
}
db.exec('CREATE UNIQUE INDEX IF NOT EXISTS idx_users_username ON users(username)');

function one(sql: string, ...params: any[]) { return db.prepare(sql).get(...params) as any; }
function all(sql: string, ...params: any[]) { return db.prepare(sql).all(...params) as any[]; }
function run(sql: string, ...params: any[]) { return db.prepare(sql).run(...params); }

function seed() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword && !one('SELECT id FROM users WHERE email=?', adminEmail)) {
    const adminId = id('usr');
    run(`INSERT INTO users(id,email,username,name,password_hash,role,balance,created_at) VALUES(?,?,?,?,?,?,?,?)`,
      adminId, adminEmail, 'admin', '管理员', bcrypt.hashSync(adminPassword, 12), 'admin', 0, now());
  }
  const providers = [
    ['openai', 'OpenAI', 'https://api.openai.com/v1', 'openai'],
    ['anthropic', 'Anthropic', 'https://api.anthropic.com/v1', 'anthropic'],
    ['deepseek', 'DeepSeek', 'https://api.deepseek.com/v1', 'openai'],
  ];
  for (const [providerId, name, baseUrl, protocol] of providers) {
    run(`INSERT OR IGNORE INTO providers(id,name,base_url,protocol,status,created_at,updated_at) VALUES(?,?,?,?,?,?,?)`,
      providerId, name, baseUrl, protocol, 'disabled', now(), now());
  }
  for (const name of ['统一网关', '用户控制台', '计费服务']) {
    run(`INSERT OR IGNORE INTO service_components(id,name,status,note,updated_at) VALUES(?,?,?,?,?)`, id('cmp'), name, 'operational', '', now());
  }
}
seed();

app.use(express.json({ limit: '20mb' }));
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

function publicUser(user: any) {
  return {
    id: user.id, email: user.email, username: user.username, name: user.name, role: user.role,
    balance: user.balance, totalSpent: user.total_spent, status: user.status,
    routePolicy: user.route_policy, preferredProvider: user.preferred_provider,
    blockedModels: JSON.parse(user.blocked_models || '[]'), monthlyBudget: user.monthly_budget,
    alertThreshold: user.alert_threshold, lowBalanceThreshold: user.low_balance_threshold,
    createdAt: user.created_at,
  };
}

function sign(user: any) { return jwt.sign({ sub: user.id, role: user.role }, jwtSecret, { expiresIn: '7d' }); }

function auth(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
  try {
    const payload = jwt.verify(token || '', jwtSecret) as any;
    const user = one('SELECT * FROM users WHERE id=? AND status=?', payload.sub, 'active');
    if (!user) return res.status(401).json({ error: { message: '登录已失效' } });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: { message: '请先登录' } });
  }
}

function admin(req: AuthedRequest, res: Response, next: NextFunction) {
  auth(req, res, () => req.user.role === 'admin' ? next() : res.status(403).json({ error: { message: '无权访问' } }));
}

function keyAuth(req: AuthedRequest, res: Response, next: NextFunction) {
  const raw = req.headers.authorization?.replace(/^Bearer\s+/i, '') || String(req.headers['x-api-key'] || '');
  if (!raw) return res.status(401).json({ error: { message: '缺少 API Key', type: 'authentication_error' } });
  const key = one(`SELECT k.*,u.email,u.balance,u.status user_status,u.route_policy,u.preferred_provider,
    u.blocked_models,u.monthly_budget,u.alert_threshold,u.low_balance_threshold,u.total_spent
    FROM api_keys k JOIN users u ON u.id=k.user_id WHERE k.key_hash=?`, sha256(raw));
  if (!key || key.status !== 'active' || key.user_status !== 'active') {
    return res.status(401).json({ error: { message: 'API Key 无效或已停用', type: 'authentication_error' } });
  }
  req.apiKey = key;
  next();
}

app.get('/api/health', (_req, res) => res.json({ ok: true, time: now() }));

function createMailer() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== 'false',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
  });
}

async function sendMail(to: string, subject: string, text: string, html: string) {
  const mailer = createMailer();
  if (!mailer) throw new Error('邮件服务尚未配置，请联系管理员');
  await mailer.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to, subject, text, html });
}

function verificationHash(email: string, purpose: string, code: string) {
  return sha256(`${email}:${purpose}:${code}`);
}

function verifyEmailCode(email: string, purpose: string, code: string) {
  const record = one(`SELECT * FROM email_verification_codes WHERE email=? AND purpose=? ORDER BY created_at DESC LIMIT 1`, email, purpose);
  if (!record || new Date(record.expires_at).getTime() < Date.now()) throw new Error('验证码已过期，请重新获取');
  if (record.attempts >= 5) throw new Error('验证码尝试次数过多，请重新获取');
  const expected = Buffer.from(record.code_hash, 'hex');
  const received = Buffer.from(verificationHash(email, purpose, code), 'hex');
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    run('UPDATE email_verification_codes SET attempts=attempts+1 WHERE id=?', record.id);
    throw new Error('验证码不正确');
  }
  run('DELETE FROM email_verification_codes WHERE email=? AND purpose=?', email, purpose);
}

app.post('/api/auth/send-code', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const purpose = String(req.body.purpose || 'register');
  if (purpose !== 'register' || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: { message: '请输入有效邮箱地址' } });
  if (one('SELECT id FROM users WHERE email=?', email)) return res.status(409).json({ error: { message: '该邮箱已经注册，请直接登录' } });
  const recent = one(`SELECT created_at FROM email_verification_codes WHERE email=? AND purpose=? ORDER BY created_at DESC LIMIT 1`, email, purpose);
  if (recent && Date.now() - new Date(recent.created_at).getTime() < 60_000) return res.status(429).json({ error: { message: '验证码已发送，请稍后再试' } });
  const code = String(randomInt(100000, 1_000_000));
  const expiresAt = new Date(Date.now() + 10 * 60_000).toISOString();
  try {
    await sendMail(
      email,
      'Foyton 注册验证码',
      `你的 Foyton 注册验证码是 ${code}，10 分钟内有效。若非本人操作，请忽略此邮件。`,
      `<div style="font-family:Arial,sans-serif;line-height:1.6"><h2>Foyton 注册验证</h2><p>你的验证码是：</p><p style="font-size:28px;font-weight:700;letter-spacing:6px">${code}</p><p>验证码 10 分钟内有效。若非本人操作，请忽略此邮件。</p></div>`,
    );
    run('DELETE FROM email_verification_codes WHERE email=? AND purpose=?', email, purpose);
    run('INSERT INTO email_verification_codes(id,email,purpose,code_hash,expires_at,created_at) VALUES(?,?,?,?,?,?)', id('verify'), email, purpose, verificationHash(email, purpose, code), expiresAt, now());
    res.json({ ok: true, expiresIn: 600 });
  } catch (error: any) {
    console.error('verification email failed', error);
    res.status(503).json({ error: { message: '验证码发送失败，请稍后重试或联系管理员' } });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const email = String(req.body.email || '').trim().toLowerCase();
  const requestedUsername = String(req.body.username || req.body.name || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const verificationCode = String(req.body.verificationCode || '').trim();
  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) return res.status(400).json({ error: { message: '请填写有效邮箱，密码至少 8 位' } });
  if (!/^\d{6}$/.test(verificationCode)) return res.status(400).json({ error: { message: '请输入 6 位邮箱验证码' } });
  if (one('SELECT id FROM users WHERE email=?', email)) return res.status(409).json({ error: { message: '该邮箱已经注册' } });
  let username = requestedUsername || email.split('@')[0].replace(/[^a-z0-9_]/g, '').slice(0, 24);
  if (!username) username = 'user';
  if (!/^[a-z0-9_]{3,32}$/.test(username)) return res.status(400).json({ error: { message: '用户名只能使用 3-32 位小写字母、数字或下划线' } });
  if (one('SELECT id FROM users WHERE username=? COLLATE NOCASE', username)) return res.status(409).json({ error: { message: '用户名已被使用，请换一个' } });
  try { verifyEmailCode(email, 'register', verificationCode); }
  catch (error: any) { return res.status(400).json({ error: { message: error.message } }); }
  const userId = id('usr');
  run(`INSERT INTO users(id,email,username,name,password_hash,balance,created_at) VALUES(?,?,?,?,?,?,?)`, userId, email, username, username, await bcrypt.hash(password, 12), 0, now());
  const user = one('SELECT * FROM users WHERE id=?', userId);
  res.status(201).json({ token: sign(user), user: publicUser(user) });
});

app.post('/api/auth/login', async (req, res) => {
  const identifier = String(req.body.identifier || req.body.email || '').trim().toLowerCase();
  const user = one('SELECT * FROM users WHERE email=? COLLATE NOCASE OR username=? COLLATE NOCASE', identifier, identifier);
  if (!user || !await bcrypt.compare(String(req.body.password || ''), user.password_hash)) return res.status(401).json({ error: { message: '用户名、邮箱或密码错误' } });
  if (user.status !== 'active') return res.status(403).json({ error: { message: '账户已被停用' } });
  res.json({ token: sign(user), user: publicUser(user) });
});

app.get('/api/me', auth, (req: AuthedRequest, res) => res.json({ user: publicUser(req.user) }));

app.patch('/api/me/policy', auth, (req: AuthedRequest, res) => {
  const policy: RoutePolicy = req.body.routePolicy;
  const blocked = Array.isArray(req.body.blockedModels) ? req.body.blockedModels.map(String) : [];
  if (!['cheapest', 'stable', 'provider'].includes(policy)) return res.status(400).json({ error: { message: '线路策略无效' } });
  run(`UPDATE users SET route_policy=?,preferred_provider=?,blocked_models=?,monthly_budget=?,alert_threshold=?,low_balance_threshold=? WHERE id=?`,
    policy, req.body.preferredProvider || null, JSON.stringify(blocked), Math.max(0, Number(req.body.monthlyBudget || 0)),
    Math.min(100, Math.max(1, Number(req.body.alertThreshold || 80))), Math.max(0, Number(req.body.lowBalanceThreshold || 0)), req.user.id);
  res.json({ user: publicUser(one('SELECT * FROM users WHERE id=?', req.user.id)) });
});

app.get('/api/keys', auth, (req: AuthedRequest, res) => {
  const rows = all('SELECT id,name,key_prefix,status,monthly_limit,monthly_used,last_used_at,created_at FROM api_keys WHERE user_id=? ORDER BY created_at DESC', req.user.id);
  res.json({ keys: rows.map((row) => ({ id: row.id, name: row.name, keyMasked: `${row.key_prefix}••••••••••••`, status: row.status, monthlyLimit: row.monthly_limit, monthlyUsed: row.monthly_used, lastUsedAt: row.last_used_at, createdAt: row.created_at })) });
});

app.post('/api/keys', auth, (req: AuthedRequest, res) => {
  const raw = `sk-fyt-${randomBytes(24).toString('base64url')}`;
  const keyId = id('key');
  const prefix = raw.slice(0, 12);
  run(`INSERT INTO api_keys(id,user_id,name,key_hash,key_prefix,monthly_limit,created_at) VALUES(?,?,?,?,?,?,?)`,
    keyId, req.user.id, String(req.body.name || '默认密钥').slice(0, 80), sha256(raw), prefix, Math.max(0, Number(req.body.monthlyLimit || 0)), now());
  res.status(201).json({ key: { id: keyId, name: req.body.name || '默认密钥', rawKey: raw, keyMasked: `${prefix}••••••••••••`, status: 'active', monthlyLimit: Number(req.body.monthlyLimit || 0), monthlyUsed: 0, createdAt: now(), lastUsedAt: null } });
});

app.delete('/api/keys/:id', auth, (req: AuthedRequest, res) => {
  run('UPDATE api_keys SET status=? WHERE id=? AND user_id=?', 'revoked', req.params.id, req.user.id);
  res.status(204).end();
});

app.get('/api/usage', auth, (req: AuthedRequest, res) => {
  const logs = all(`SELECT l.*,p.name provider FROM usage_logs l LEFT JOIN providers p ON p.id=l.provider_id WHERE l.user_id=? ORDER BY l.created_at DESC LIMIT 500`, req.user.id);
  const summary = one(`SELECT COUNT(*) requests,COALESCE(SUM(prompt_tokens),0) promptTokens,COALESCE(SUM(completion_tokens),0) completionTokens,COALESCE(SUM(amount),0) amount FROM usage_logs WHERE user_id=?`, req.user.id);
  res.json({ logs, summary });
});

app.get('/api/alerts', auth, (req: AuthedRequest, res) => {
  res.json({ alerts: all('SELECT * FROM alerts WHERE user_id=? ORDER BY created_at DESC LIMIT 100', req.user.id) });
});

app.post('/api/alerts/:id/read', auth, (req: AuthedRequest, res) => {
  run('UPDATE alerts SET status=? WHERE id=? AND user_id=?', 'read', req.params.id, req.user.id);
  res.status(204).end();
});

app.get('/api/status', (_req, res) => {
  const components = all('SELECT id,name,status,note,updated_at FROM service_components ORDER BY name');
  const providers = all(`SELECT id,name,status,success_rate,avg_latency_ms,last_check_at FROM providers WHERE status!='disabled' ORDER BY name`);
  const incidents = all('SELECT * FROM incidents ORDER BY starts_at DESC LIMIT 20');
  const operational = [...components, ...providers].every((item) => item.status === 'operational');
  res.json({ overall: operational ? 'operational' : 'degraded', updatedAt: now(), components, providers, incidents });
});
app.get('/api/catalog', (_req, res) => res.json({ models: all('SELECT DISTINCT public_model FROM model_routes WHERE enabled=1 ORDER BY public_model').map((row) => row.public_model) }));

app.get('/api/admin/overview', admin, (_req, res) => {
  res.json({
    users: one('SELECT COUNT(*) count FROM users').count,
    activeProviders: one("SELECT COUNT(*) count FROM providers WHERE status='operational'").count,
    requests: one('SELECT COUNT(*) count FROM usage_logs').count,
    revenue: one('SELECT COALESCE(SUM(amount),0) total FROM usage_logs').total,
  });
});

app.get('/api/admin/users', admin, (_req, res) => res.json({ users: all('SELECT id,email,name,role,status,balance,total_spent,route_policy,created_at FROM users ORDER BY created_at DESC') }));
app.get('/api/admin/orders', admin, (_req, res) => res.json({ orders: all(`SELECT l.*,u.email FROM ledger l JOIN users u ON u.id=l.user_id ORDER BY l.created_at DESC LIMIT 500`) }));
app.get('/api/admin/usage', admin, (_req, res) => res.json({ logs: all(`SELECT l.*,u.email,p.name provider FROM usage_logs l JOIN users u ON u.id=l.user_id LEFT JOIN providers p ON p.id=l.provider_id ORDER BY l.created_at DESC LIMIT 500`) }));
app.patch('/api/admin/users/:id', admin, (req, res) => {
  const current = one('SELECT * FROM users WHERE id=?', req.params.id);
  if (!current) return res.status(404).json({ error: { message: '用户不存在' } });
  const nextBalance = req.body.balance === undefined ? current.balance : Math.max(0, Number(req.body.balance));
  run('UPDATE users SET status=?,balance=? WHERE id=?', req.body.status || current.status, nextBalance, current.id);
  if (nextBalance !== current.balance) run('INSERT INTO ledger(id,user_id,type,amount,balance_after,note,created_at) VALUES(?,?,?,?,?,?,?)', id('led'), current.id, 'admin_adjustment', money(nextBalance - current.balance), nextBalance, String(req.body.note || '管理员调整'), now());
  res.json({ user: publicUser(one('SELECT * FROM users WHERE id=?', current.id)) });
});

app.get('/api/admin/providers', admin, (_req, res) => {
  res.json({ providers: all(`SELECT id,name,base_url,protocol,status,priority,success_rate,avg_latency_ms,last_check_at,created_at,updated_at,(api_key_enc!='') has_key FROM providers ORDER BY priority,name`) });
});

app.post('/api/admin/providers', admin, (req, res) => {
  const providerId = req.body.id || id('provider');
  run(`INSERT INTO providers(id,name,base_url,api_key_enc,protocol,status,priority,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?)`,
    providerId, req.body.name, String(req.body.baseUrl || '').replace(/\/$/, ''), encrypt(String(req.body.apiKey || '')), req.body.protocol || 'openai', req.body.status || 'disabled', Number(req.body.priority || 100), now(), now());
  res.status(201).json({ id: providerId });
});

app.patch('/api/admin/providers/:id', admin, (req, res) => {
  const provider = one('SELECT * FROM providers WHERE id=?', req.params.id);
  if (!provider) return res.status(404).json({ error: { message: '上游不存在' } });
  run(`UPDATE providers SET name=?,base_url=?,api_key_enc=?,protocol=?,status=?,priority=?,updated_at=? WHERE id=?`,
    req.body.name ?? provider.name, String(req.body.baseUrl ?? provider.base_url).replace(/\/$/, ''), req.body.apiKey ? encrypt(req.body.apiKey) : provider.api_key_enc,
    req.body.protocol ?? provider.protocol, req.body.status ?? provider.status, Number(req.body.priority ?? provider.priority), now(), provider.id);
  res.json({ ok: true });
});

app.post('/api/admin/providers/:id/check', admin, async (req, res) => {
  const provider = one('SELECT * FROM providers WHERE id=?', req.params.id);
  if (!provider) return res.status(404).json({ error: { message: '上游不存在' } });
  const started = Date.now();
  let status = 'degraded';
  try {
    const headers: any = provider.protocol === 'anthropic' ? { 'x-api-key': decrypt(provider.api_key_enc), 'anthropic-version': '2023-06-01' } : { Authorization: `Bearer ${decrypt(provider.api_key_enc)}` };
    const response = await fetch(`${provider.base_url}/models`, { headers, signal: AbortSignal.timeout(8000) });
    status = response.ok ? 'operational' : 'degraded';
  } catch { status = 'outage'; }
  run('UPDATE providers SET status=?,avg_latency_ms=?,last_check_at=?,updated_at=? WHERE id=?', status, Date.now() - started, now(), now(), provider.id);
  res.json({ status, latencyMs: Date.now() - started });
});

app.get('/api/admin/model-routes', admin, (_req, res) => res.json({ routes: all(`SELECT r.*,p.name provider_name FROM model_routes r JOIN providers p ON p.id=r.provider_id ORDER BY r.public_model,p.priority`) }));
app.post('/api/admin/model-routes', admin, (req, res) => {
  const routeId = id('route');
  run(`INSERT INTO model_routes(id,public_model,provider_id,upstream_model,input_price,output_price,input_cost,output_cost,enabled) VALUES(?,?,?,?,?,?,?,?,?)`,
    routeId, req.body.publicModel, req.body.providerId, req.body.upstreamModel, Number(req.body.inputPrice), Number(req.body.outputPrice), Number(req.body.inputCost || 0), Number(req.body.outputCost || 0), req.body.enabled === false ? 0 : 1);
  res.status(201).json({ id: routeId });
});
app.patch('/api/admin/model-routes/:id', admin, (req, res) => {
  const route = one('SELECT * FROM model_routes WHERE id=?', req.params.id);
  if (!route) return res.status(404).json({ error: { message: '模型线路不存在' } });
  run(`UPDATE model_routes SET public_model=?,provider_id=?,upstream_model=?,input_price=?,output_price=?,input_cost=?,output_cost=?,enabled=? WHERE id=?`,
    req.body.publicModel ?? route.public_model, req.body.providerId ?? route.provider_id, req.body.upstreamModel ?? route.upstream_model,
    Number(req.body.inputPrice ?? route.input_price), Number(req.body.outputPrice ?? route.output_price), Number(req.body.inputCost ?? route.input_cost), Number(req.body.outputCost ?? route.output_cost), req.body.enabled === undefined ? route.enabled : Number(Boolean(req.body.enabled)), route.id);
  res.json({ ok: true });
});

app.get('/api/admin/incidents', admin, (_req, res) => res.json({ incidents: all('SELECT * FROM incidents ORDER BY starts_at DESC') }));
app.post('/api/admin/incidents', admin, (req, res) => {
  const incidentId = id('inc');
  run('INSERT INTO incidents(id,title,message,severity,status,starts_at,created_at) VALUES(?,?,?,?,?,?,?)', incidentId, req.body.title, req.body.message, req.body.severity || 'minor', req.body.status || 'investigating', now(), now());
  res.status(201).json({ id: incidentId });
});
app.patch('/api/admin/incidents/:id', admin, (req, res) => {
  const incident = one('SELECT * FROM incidents WHERE id=?', req.params.id);
  if (!incident) return res.status(404).json({ error: { message: '事件不存在' } });
  const status = req.body.status || incident.status;
  run('UPDATE incidents SET title=?,message=?,severity=?,status=?,resolved_at=? WHERE id=?', req.body.title ?? incident.title, req.body.message ?? incident.message, req.body.severity ?? incident.severity, status, status === 'resolved' ? now() : null, incident.id);
  res.json({ ok: true });
});
app.get('/api/admin/components', admin, (_req, res) => res.json({ components: all('SELECT * FROM service_components ORDER BY name') }));
app.patch('/api/admin/components/:id', admin, (req, res) => {
  const component = one('SELECT * FROM service_components WHERE id=?', req.params.id);
  if (!component) return res.status(404).json({ error: { message: '服务项目不存在' } });
  run('UPDATE service_components SET status=?,note=?,updated_at=? WHERE id=?', req.body.status || component.status, req.body.note ?? component.note, now(), component.id);
  res.json({ ok: true });
});

function chooseRoute(apiKey: any, publicModel: string) {
  const blocked: string[] = JSON.parse(apiKey.blocked_models || '[]');
  if (blocked.includes(publicModel)) throw Object.assign(new Error('该账户禁止使用此模型'), { status: 403 });
  let routes = all(`SELECT r.*,p.name provider_name,p.base_url,p.api_key_enc,p.protocol,p.success_rate,p.avg_latency_ms,p.priority
    FROM model_routes r JOIN providers p ON p.id=r.provider_id
    WHERE r.public_model=? AND r.enabled=1 AND p.status='operational'`, publicModel);
  if (apiKey.route_policy === 'provider' && apiKey.preferred_provider) routes = routes.filter((route) => route.provider_id === apiKey.preferred_provider);
  if (apiKey.route_policy === 'cheapest') routes.sort((a, b) => (a.input_cost + a.output_cost) - (b.input_cost + b.output_cost));
  else routes.sort((a, b) => b.success_rate - a.success_rate || a.avg_latency_ms - b.avg_latency_ms || a.priority - b.priority);
  if (!routes.length) throw Object.assign(new Error('当前没有可用的模型线路'), { status: 503 });
  return routes[0];
}

async function sendAlert(userId: string, type: string, title: string, message: string) {
  const recent = one(`SELECT id FROM alerts WHERE user_id=? AND type=? AND created_at>?`, userId, type, new Date(Date.now() - 6 * 3600_000).toISOString());
  if (recent) return;
  run('INSERT INTO alerts(id,user_id,type,title,message,created_at) VALUES(?,?,?,?,?,?)', id('alert'), userId, type, title, message, now());
  const user = one('SELECT email FROM users WHERE id=?', userId);
  if (!user || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASSWORD) return;
  try {
    const transport = nodemailer.createTransport({ host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT || 465), secure: process.env.SMTP_SECURE !== 'false', auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD } });
    await transport.sendMail({ from: process.env.SMTP_FROM || process.env.SMTP_USER, to: user.email, subject: `[Foyton] ${title}`, text: message });
  } catch (error) { console.error('alert email failed', error); }
}

function finalizeUsage(apiKey: any, route: any, requestId: string, started: number, statusCode: number, body: any, errorMessage?: string) {
  const usage = body?.usage || {};
  const prompt = Number(usage.prompt_tokens ?? usage.input_tokens ?? 0);
  const completion = Number(usage.completion_tokens ?? usage.output_tokens ?? 0);
  const amount = statusCode >= 200 && statusCode < 300 ? money(prompt / 1_000_000 * route.input_price + completion / 1_000_000 * route.output_price) : 0;
  db.exec('BEGIN IMMEDIATE');
  try {
    const fresh = one('SELECT balance,total_spent,monthly_budget,alert_threshold,low_balance_threshold FROM users WHERE id=?', apiKey.user_id);
    const monthStart = new Date();
    monthStart.setUTCDate(1); monthStart.setUTCHours(0, 0, 0, 0);
    const monthUsage = Number(one('SELECT COALESCE(SUM(amount),0) amount FROM usage_logs WHERE user_id=? AND created_at>=?', apiKey.user_id, monthStart.toISOString()).amount || 0);
    const balanceAfter = money(Math.max(0, fresh.balance - amount));
    run('UPDATE users SET balance=?,total_spent=total_spent+? WHERE id=?', balanceAfter, amount, apiKey.user_id);
    run('UPDATE api_keys SET monthly_used=monthly_used+?,last_used_at=? WHERE id=?', amount, now(), apiKey.id);
    run(`INSERT INTO usage_logs(id,request_id,user_id,api_key_id,public_model,upstream_model,provider_id,prompt_tokens,completion_tokens,input_price,output_price,amount,status_code,result,latency_ms,error_message,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      id('log'), requestId, apiKey.user_id, apiKey.id, route.public_model, route.upstream_model, route.provider_id, prompt, completion, route.input_price, route.output_price, amount, statusCode, statusCode >= 200 && statusCode < 300 ? 'success' : 'failed', Date.now() - started, errorMessage || null, now());
    if (amount > 0) run('INSERT INTO ledger(id,user_id,type,amount,balance_after,reference_id,note,created_at) VALUES(?,?,?,?,?,?,?,?)', id('led'), apiKey.user_id, 'usage', -amount, balanceAfter, requestId, `调用 ${route.public_model}`, now());
    db.exec('COMMIT');
    if (balanceAfter <= fresh.low_balance_threshold) void sendAlert(apiKey.user_id, 'low_balance', '余额不足提醒', `你的账户余额为 ¥${balanceAfter.toFixed(2)}，请及时充值。`);
    if (fresh.monthly_budget > 0 && (monthUsage + amount) / fresh.monthly_budget * 100 >= fresh.alert_threshold) void sendAlert(apiKey.user_id, 'budget', '预算使用提醒', `本月消费已达到你设置预算的 ${fresh.alert_threshold}%。`);
  } catch (error) { db.exec('ROLLBACK'); throw error; }
}

app.get('/v1/models', keyAuth, (_req, res) => {
  const models = all(`SELECT DISTINCT public_model FROM model_routes r JOIN providers p ON p.id=r.provider_id WHERE r.enabled=1 AND p.status='operational'`);
  res.json({ object: 'list', data: models.map((model) => ({ id: model.public_model, object: 'model', owned_by: 'foyton' })) });
});

app.post('/v1/chat/completions', keyAuth, async (req: AuthedRequest, res) => {
  const started = Date.now();
  const requestId = `req_${randomBytes(12).toString('hex')}`;
  let route: any;
  try {
    if (req.apiKey.balance <= 0) return res.status(402).json({ error: { message: '账户余额不足', type: 'insufficient_balance' } });
    if (req.apiKey.monthly_limit > 0 && req.apiKey.monthly_used >= req.apiKey.monthly_limit) return res.status(429).json({ error: { message: '该密钥已达到月度额度', type: 'quota_exceeded' } });
    route = chooseRoute(req.apiKey, String(req.body.model || ''));
    if (req.body.stream) return res.status(400).json({ error: { message: '当前版本暂不支持流式转发，请使用 stream=false', type: 'unsupported_feature' } });
    const headers: any = { 'Content-Type': 'application/json' };
    if (route.protocol === 'anthropic') {
      headers['x-api-key'] = decrypt(route.api_key_enc);
      headers['anthropic-version'] = '2023-06-01';
    } else headers.Authorization = `Bearer ${decrypt(route.api_key_enc)}`;
    const endpoint = route.protocol === 'anthropic' ? `${route.base_url}/messages` : `${route.base_url}/chat/completions`;
    const payload = { ...req.body, model: route.upstream_model };
    const response = await fetch(endpoint, { method: 'POST', headers, body: JSON.stringify(payload), signal: AbortSignal.timeout(120_000) });
    const body = await response.json().catch(() => ({ error: { message: '上游返回内容无法解析' } }));
    finalizeUsage(req.apiKey, route, requestId, started, response.status, body, body?.error?.message);
    res.setHeader('x-request-id', requestId);
    res.status(response.status).json(body);
  } catch (error: any) {
    if (route) finalizeUsage(req.apiKey, route, requestId, started, Number(error.status || 502), {}, error.message);
    void sendAlert(req.apiKey.user_id, 'abnormal', '调用异常提醒', `模型调用出现异常：${error.message}`);
    res.status(Number(error.status || 502)).json({ error: { message: error.message || '上游服务暂时不可用', type: 'upstream_error', request_id: requestId } });
  }
});

app.use('/api', (_req, res) => res.status(404).json({ error: { message: '接口不存在' } }));

if (process.env.NODE_ENV === 'production') {
  const distPath = path.resolve('dist');
  if (existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }
}

app.use((error: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error(error);
  res.status(500).json({ error: { message: '服务内部错误' } });
});

app.listen(port, () => console.log(`Foyton server listening on http://localhost:${port}`));
