import React, { useId } from 'react';

/**
 * 智能路由中枢的「大脑」核心图标。
 *
 * 分层（由下到上）：
 *   ① 血管 / 神经纤维树 —— 自脑干上行的主干 + 两级分支，带流动光点
 *   ② 神经节点          —— 主干与分支交汇处的胞体，缓慢呼吸闪烁
 *   ③ 脑轮廓 + 脑沟      —— 最外层描边（Lucide brain 轮廓，ISC 许可），渐变描边
 *
 * 坐标分两套：
 *   · 轮廓层是 24×24 坐标系（沿用 Lucide 原始数据），用 scale(100/24) 放大到本图
 *   · 血管/节点层直接在 100×100 坐标系里手工绘制
 */

/** 脑轮廓与脑沟（Lucide `brain`，ISC 许可），24×24 坐标系。 */
const BRAIN_OUTLINE = [
  'M12 18V5', // 中缝
  'M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4', // 内部脑沟
  'M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5', // 顶部额叶
  'M17.997 5.125a4 4 0 0 1 2.526 5.77',
  'M18 18a4 4 0 0 0 2-7.464',
  'M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517', // 底部
  'M6 18a4 4 0 0 1-2-7.464',
  'M6.003 5.125a4 4 0 0 0-2.526 5.77',
];

/** 把 24×24 的轮廓放大到 100×100 本图。 */
const OUTLINE_SCALE = 100 / 24;

/** 血管 / 神经纤维：自脑干上行的主干 + 两级分支（只画左半，右半镜像）。
 *  主干止于 y=71 —— 脑轮廓在 x=50 处的底边约 y=75，再往下会从底部缺口穿出去。 */
const VESSELS = [
  'M50,71 C51,64 49,58 50,51 C51,44 49,38 50,32', // 主干
  'M50,64 C45,61 40,58 35,54', // 一级分支
  'M50,53 C45,50 40,47 34,43',
  'M50,43 C46,40 42,37 38,33',
  'M50,34 C47,31 45,29 43,26',
  'M35,54 C30,51 26,48 22,44', // 二级分支
  'M35,54 C31,56 27,59 24,62',
  'M34,43 C29,40 25,37 21,33',
  'M34,43 C30,45 26,48 23,51',
  'M38,33 C35,30 33,28 31,25',
  'M43,26 C41,23 40,21 39,20',
];

/** 神经节点：主干各段 + 分支交汇处 + 分支末端（x=50 的中缝节点不镜像）。 */
const NODES: [number, number][] = [
  [50, 71], [50, 64], [50, 53], [50, 43], [50, 34],
  [35, 54], [34, 43], [38, 33], [43, 26],
  [22, 44], [24, 62], [21, 33], [23, 51], [31, 25], [39, 20],
];

/** 右半 = 左半以 x=50 为轴镜像（本图宽 100）。 */
const MIRROR = 'translate(100,0) scale(-1,1)';

/** 渲染两遍：本体 + 镜像。 */
const bothHalves = <T,>(items: T[]): { item: T; mirrored: boolean }[] =>
  items.flatMap((item) => [
    { item, mirrored: false },
    { item, mirrored: true },
  ]);

export const BrainCircuit: React.FC<{ className?: string }> = ({ className }) => {
  // 渐变 id 必须唯一，避免同页多实例互相覆盖。
  const uid = useId().replace(/[:]/g, '');
  const outlineGrad = `brain-outline-${uid}`;
  const vesselGrad = `brain-vessel-${uid}`;

  return (
    <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={outlineGrad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4f46e5" />
          <stop offset="55%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={vesselGrad} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      <g strokeLinecap="round" strokeLinejoin="round">
        {/* ① 血管 / 神经纤维树 */}
        {bothHalves(VESSELS).map(({ item, mirrored }, i) => (
          <path
            key={`vessel-${i}`}
            d={item}
            transform={mirrored ? MIRROR : undefined}
            stroke={`url(#${vesselGrad})`}
            strokeWidth="1.5"
            opacity="0.9"
          />
        ))}

        {/* ② 神经节点 */}
        {bothHalves(NODES.filter(([x]) => x !== 50)).map(({ item, mirrored }, i) => (
          <circle
            key={`node-${i}`}
            cx={item[0]}
            cy={item[1]}
            r="2.1"
            transform={mirrored ? MIRROR : undefined}
            fill="#6d28d9"
            className="animate-node-pulse"
            style={{ animationDelay: `${(i % 7) * 0.34}s` }}
          />
        ))}
        {/* 中缝上的节点不做镜像，单独绘制 */}
        {NODES.filter(([x]) => x === 50).map(([cx, cy], i) => (
          <circle
            key={`mid-${i}`}
            cx={cx}
            cy={cy}
            r="2.4"
            fill="#5b21b6"
            className="animate-node-pulse"
            style={{ animationDelay: `${i * 0.42}s` }}
          />
        ))}

        {/* ③ 脑轮廓 + 脑沟（最上层，最粗） */}
        <g transform={`scale(${OUTLINE_SCALE})`}>
          {BRAIN_OUTLINE.map((d, i) => (
            <path key={`outline-${i}`} d={d} stroke={`url(#${outlineGrad})`} strokeWidth="0.62" />
          ))}
        </g>
      </g>

      {/* 血管上的流动光点：pathLength 归一化后，短划线沿路径推进即成「信号流动」 */}
      <g strokeLinecap="round">
        {bothHalves(VESSELS).map(({ item, mirrored }, i) => (
          <path
            key={`flow-${i}`}
            d={item}
            transform={mirrored ? MIRROR : undefined}
            stroke="#c4b5fd"
            strokeWidth="1.9"
            pathLength={50}
            strokeDasharray="4 46"
            className="animate-vessel-flow"
            style={{ animationDelay: `${(i % VESSELS.length) * 0.3}s` }}
          />
        ))}
      </g>
    </svg>
  );
};
