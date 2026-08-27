"use client";

import { useEffect } from "react";

// 封面就绪信号：封面动画首帧稳定后标记，供平台截图服务识别。
// 仅在 /eazo-cover-preview 使用，不得引入产品状态或鉴权。
export function EazoCoverReady({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const mark = () => {
      document.documentElement.setAttribute("data-eazo-cover-ready", "1");
    };
    const raf = requestAnimationFrame(() => requestAnimationFrame(mark));
    return () => cancelAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
