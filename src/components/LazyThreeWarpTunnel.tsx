import React, { Suspense, lazy, useRef } from 'react';
import { useInView } from 'motion/react';

/**
 * 隧道区块位于页面最底部，首屏完全用不到。
 * 这里把 three.js（约 600 kB）拆成独立 chunk，滚动到附近才加载，
 * 避免它拖慢首屏的解析与渲染。
 */
const ThreeWarpTunnel = lazy(() =>
  import('./ThreeWarpTunnel').then((module) => ({ default: module.ThreeWarpTunnel }))
);

interface LazyThreeWarpTunnelProps {
  onOpenConsultation: () => void;
}

/** 占位骨架：尺寸与真实区块逐项对齐，避免懒加载造成布局跳动。 */
const TunnelPlaceholder: React.FC = () => (
  <section className="relative w-full bg-[#060713] overflow-hidden" aria-hidden="true">
    <div
      className="w-full h-14 sm:h-20"
      style={{
        background: 'linear-gradient(to bottom, #fbfaf8 0%, #ede9fe 25%, #1e1b4b 70%, #060713 100%)',
      }}
    />
    <div className="w-full min-h-[480px] sm:min-h-[560px] md:min-h-[640px]" />
  </section>
);

export const LazyThreeWarpTunnel: React.FC<LazyThreeWarpTunnelProps> = ({ onOpenConsultation }) => {
  const sentinelRef = useRef<HTMLDivElement>(null);

  // 提前 600px 触发，滚到隧道时通常已经加载完成。
  const isNearViewport = useInView(sentinelRef, { once: true, margin: '600px 0px' });

  return (
    <div ref={sentinelRef}>
      {isNearViewport ? (
        <Suspense fallback={<TunnelPlaceholder />}>
          <ThreeWarpTunnel onOpenConsultation={onOpenConsultation} />
        </Suspense>
      ) : (
        <TunnelPlaceholder />
      )}
    </div>
  );
};
