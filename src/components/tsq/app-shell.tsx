"use client";

import { TabBar } from "./tab-bar";
import { Pet } from "./pet";

// 移动端应用外壳：安全区 + 底部 Tab + 常驻灵宠
export function AppShell({
  children,
  bare = false,
}: {
  children: React.ReactNode;
  bare?: boolean; // bare=true 时用于沉浸式首页（自带背景），去掉画布底色
}) {
  return (
    <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-[color:var(--bg-canvas)]">
      <div
        className="relative"
        style={{
          paddingTop: bare ? undefined : "max(56px, env(safe-area-inset-top, 0px))",
          paddingBottom: "calc(max(34px, env(safe-area-inset-bottom, 0px)) + 80px)",
        }}
      >
        {children}
      </div>
      <Pet />
      <TabBar />
    </div>
  );
}
