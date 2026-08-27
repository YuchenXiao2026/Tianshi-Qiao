"use client";

import { ShoppingBag, Heart, Leaf, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AppShell } from "@/components/tsq/app-shell";
import { ProfileHeader } from "@/components/tsq/profile-header";
import { ME } from "@/lib/tsq/data";
import { cn } from "@/utils/utils";

const KIND_TAG: Record<string, string> = {
  green: "bg-[color:var(--soft)] text-[color:var(--deep)]",
  warm: "bg-[#fff4d9] text-[#bd7c10]",
  purple: "bg-[#eee8ff] text-[color:var(--purple)]",
};

export default function MePage() {
  const { t } = useTranslation();
  return (
    <AppShell>
      <div style={{ paddingTop: "max(56px, env(safe-area-inset-top, 0px))" }}>
        <ProfileHeader />

        <div className="space-y-5 px-4 pt-5">
          {/* 我的资源（拥有） */}
          <section data-el="me-resources">
            <SectionTitle
              icon={<ShoppingBag className="h-4 w-4" />}
              title={t("tsq.me.resources")}
              sub={t("tsq.me.resourcesSub")}
              tone="green"
            />
            <div className="rounded-[20px] border border-[color:var(--border)] bg-white p-3.5 shadow-[var(--brand-shadow-sm)]">
              <div className="flex flex-wrap gap-2">
                {ME.resources.map((r) => (
                  <div
                    key={r.label}
                    className={cn(
                      "rounded-2xl px-3 py-2 text-left",
                      KIND_TAG[r.kind],
                    )}
                  >
                    <p className="text-[13px] font-semibold leading-none">{r.label}</p>
                    <p className="mt-1 text-[12px] opacity-80">{r.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 我的需求（心愿） */}
          <section data-el="me-needs">
            <SectionTitle
              icon={<Heart className="h-4 w-4" />}
              title={t("tsq.me.needs")}
              sub={t("tsq.me.needsSub")}
              tone="warm"
            />
            <div className="overflow-hidden rounded-[20px] border border-[color:var(--border)] bg-white shadow-[var(--brand-shadow-sm)]">
              {ME.needs.map((n, i) => (
                <div
                  key={n}
                  className={cn(
                    "flex items-center gap-2.5 px-3.5 py-3",
                    i < ME.needs.length - 1 && "border-b border-[#f1f2ec]",
                  )}
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--purple)]" />
                  <span className="flex-1 text-[14px]">{n}</span>
                  <ChevronRight className="h-4 w-4 text-neutral-300" />
                </div>
              ))}
            </div>
          </section>

          {/* 经验值 · 成长 */}
          <section data-el="me-growth">
            <SectionTitle
              icon={<Leaf className="h-4 w-4" />}
              title={t("tsq.me.growth")}
              sub={t("tsq.me.growthSub")}
              tone="green"
            />
            <div className="rounded-[20px] border border-[color:var(--border)] bg-white p-3.5 shadow-[var(--brand-shadow-sm)]">
              {/* 成长进度 */}
              <div className="mb-3">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] text-muted-foreground">
                    {t("tsq.me.toNext", { lv: ME.level + 1, n: 220 })}
                  </span>
                  <span className="text-[13px] font-semibold text-[color:var(--deep)]">
                    {ME.growth} / 1500
                  </span>
                </div>
                <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[color:var(--soft)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#6cc653] to-[#48a63e]"
                    style={{ width: `${(ME.growth / 1500) * 100}%` }}
                  />
                </div>
              </div>
              {/* 成长记录 */}
              <div className="space-y-2.5 border-t border-[#f1f2ec] pt-3">
                {ME.growthLog.map((g) => (
                  <div key={g.title} className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-xl bg-[color:var(--soft)] text-[color:var(--deep)]">
                      <Leaf className="h-4 w-4" />
                    </span>
                    <div className="flex-1">
                      <p className="text-[14px] leading-tight">{g.title}</p>
                      <p className="text-[12px] text-muted-foreground">{g.date}</p>
                    </div>
                    <span className="text-[14px] font-semibold text-[color:var(--deep)]">
                      +{g.delta}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}

function SectionTitle({
  icon,
  title,
  sub,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  sub: string;
  tone: "green" | "warm";
}) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <span
        className={cn(
          "grid h-6 w-6 place-items-center rounded-lg",
          tone === "green"
            ? "bg-[color:var(--soft)] text-[color:var(--deep)]"
            : "bg-[#fff4d9] text-[#bd7c10]",
        )}
      >
        {icon}
      </span>
      <h2 className="text-[17px] font-semibold">{title}</h2>
      <span className="text-[13px] text-muted-foreground">{sub}</span>
    </div>
  );
}
