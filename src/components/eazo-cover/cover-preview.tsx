"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Check, TrendingUp } from "lucide-react";

// 隐私安全的封面演示数据（不得导入产品路由 / 不含真实用户数据）
const COVER_PREVIEW_DATA = {
  bg: "https://cdn.eazo.ai/user-contents/design-variant-images/ecd84a6a86ee4e09a3e462eb96e29f66.png",
  match: { tag: "想找的人", score: 92, title: "资源设计师 · 可合作" },
  startGrowth: 1280,
};

// 自主循环（约 4s）：小天匹配卡出现 → 接受 → 成长值上涨，演示资源互换核心动作
export function CoverPreview() {
  const [phase, setPhase] = useState(0); // 0 展示 1 接受 2 成长
  const [growth, setGrowth] = useState(COVER_PREVIEW_DATA.startGrowth);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    let alive = true;
    function loop() {
      setPhase(0);
      setGrowth(COVER_PREVIEW_DATA.startGrowth);
      timers.push(
        setTimeout(() => alive && setPhase(1), 1400),
        setTimeout(() => {
          if (!alive) return;
          setPhase(2);
          setGrowth(COVER_PREVIEW_DATA.startGrowth + 28);
        }, 2300),
        setTimeout(() => alive && loop(), 4200),
      );
    }
    loop();
    return () => {
      alive = false;
      timers.forEach(clearTimeout);
    };
  }, []);

  const { match } = COVER_PREVIEW_DATA;

  return (
    <div className="relative mx-auto h-dvh w-full max-w-[430px] overflow-hidden bg-[#FAFAF7]">
      <div className="absolute inset-x-0 top-0 h-[62%] overflow-hidden">
        <Image
          src={COVER_PREVIEW_DATA.bg}
          alt="生命树"
          fill
          priority
          sizes="430px"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FAFAF7]/10 to-[#FAFAF7]" />
      </div>

      {/* 成长值 */}
      <div className="absolute left-5 top-14 text-[#2F7D32]">
        <p className="text-[13px] text-neutral-500">成长值</p>
        <div className="flex items-baseline gap-1">
          <strong className="text-4xl font-bold tabular-nums">{growth}</strong>
          <TrendingUp className="h-5 w-5" />
        </div>
        <p
          className={`text-[13px] transition-opacity duration-500 ${
            phase === 2 ? "opacity-100" : "opacity-0"
          } text-[#2F7D32]`}
        >
          +28 新成长 🌿
        </p>
      </div>

      {/* 小天匹配卡 */}
      <div className="absolute inset-x-5 bottom-24">
        <div className="mb-2 flex items-center gap-1.5 text-[15px] font-semibold text-[#2F7D32]">
          <Sparkles className="h-4 w-4" /> 小天为你匹配到的
        </div>
        <div
          className={`rounded-3xl border border-[rgba(88,169,66,.16)] bg-white p-4 shadow-[0_16px_40px_rgba(55,95,42,.14)] transition-all duration-500 ${
            phase >= 1 ? "scale-[0.98] opacity-90" : "scale-100 opacity-100"
          }`}
        >
          <span className="inline-block rounded-full bg-[#EAF6E5] px-2.5 py-1 text-xs text-[#2F7D32]">
            {match.tag}
          </span>
          <div className="mt-2 flex items-end justify-between">
            <div>
              <strong className="text-3xl text-[#2F7D32]">{match.score}%</strong>
              <p className="mt-0.5 text-sm text-neutral-700">{match.title}</p>
            </div>
            <div
              className={`flex items-center gap-1 rounded-full px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 ${
                phase >= 1 ? "bg-[#48a63e]" : "bg-[#58A942]"
              }`}
            >
              <Check className="h-4 w-4" /> {phase >= 1 ? "已接受" : "接受"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
