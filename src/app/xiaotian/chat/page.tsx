"use client";

import Image from "next/image";
import Link from "next/link";
import { Mic, Pencil, Send } from "lucide-react";
import { FlowShell, XiaotianAvatar } from "@/components/tsq/flow-shell";
import { TSQ_ASSETS } from "@/lib/tsq/assets";

const messages = [
  { from: "ai", text: "Hi，我是小天 🌱\n有什么想法都可以和我说，我会帮你一起梳理。" },
  { from: "me", text: "我有一个周末闲置工作室，想换一组品牌照片。" },
  { from: "ai", text: "明白啦，我先帮你整理意图。你的工作室可用时间是？" },
  { from: "me", text: "周六和周日白天都可以。" },
  { from: "ai", text: "地点方便公开到什么程度？是否接受仅展示区域信息？" },
  { from: "me", text: "可以先展示区域，不先公开具体门牌。" },
  { from: "ai", text: "好的。交换方式是只换摄影服务，还是也可以补差价？" },
  { from: "me", text: "优先互换，也可以视情况补差价。" },
];

export default function XiaotianChatPage() {
  return (
    <FlowShell title="天使桥" subtitle="和小天说" right="bell">
      <section data-el="xiaotian-chat" className="relative overflow-hidden rounded-[24px] border border-[color:var(--border)] bg-white/72 shadow-[var(--brand-shadow-md)] backdrop-blur-md">
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#e9f7ff] to-transparent" />
        <div className="relative max-h-[calc(100dvh-260px)] space-y-3 overflow-y-auto px-3 pb-4 pt-4">
          {messages.map((m, i) => (
            <ChatBubble key={i} from={m.from as "ai" | "me"} text={m.text} />
          ))}
          <article className="rounded-[18px] border border-[#f1dba7] bg-[#fff8ea] p-3 shadow-[0_8px_16px_rgba(180,120,40,.08)]">
            <div className="mb-2 flex items-center justify-between">
              <b className="text-[16px] text-[#071D3A]">小天整理中 🌱</b>
              <Pencil className="h-4 w-4 text-[#2679ff]" />
            </div>
            <ul className="space-y-1.5 text-[13px] leading-relaxed text-[#243b5a]">
              <li>• Offer（我提供）：周末工作室，换品牌照片</li>
              <li>• Need（我需要）：摄影服务（品牌照片）</li>
              <li>• Boundary（我设定）：先展示区域，不公开门牌；优先互换，可视情况补差价</li>
            </ul>
          </article>
        </div>
      </section>
      <div className="mt-3 flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-white p-2 shadow-[var(--brand-shadow-sm)]">
        <span className="flex-1 px-3 text-[14px] text-muted-foreground">和小天说点什么...</span>
        <Mic className="h-5 w-5 text-neutral-500" />
        <Link href="/xiaotian/intent" className="grid h-11 w-11 place-items-center rounded-full bg-[#5B8DEF] text-white shadow-[0_8px_18px_rgba(91,141,239,.28)] active:scale-95">
          <Send className="h-5 w-5" />
        </Link>
      </div>
    </FlowShell>
  );
}

function ChatBubble({ from, text }: { from: "ai" | "me"; text: string }) {
  const isMe = from === "me";
  return (
    <div className={`flex items-end gap-2 ${isMe ? "justify-end" : "justify-start"}`}>
      {!isMe && <XiaotianAvatar size={38} />}
      <div className={`max-w-[74%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed shadow-[0_6px_14px_rgba(55,95,42,.08)] ${isMe ? "rounded-br-sm bg-[#ccefdc] text-[#153b2a]" : "rounded-bl-sm bg-white text-[#243b5a]"}`}>{text}</div>
      {isMe && <span className="grid h-8 w-8 place-items-center rounded-full border border-[#e3c27c] bg-[#9dc4e4] text-white"><Image src={TSQ_ASSETS.pet} alt="你" width={22} height={22} className="opacity-0" />你</span>}
    </div>
  );
}
