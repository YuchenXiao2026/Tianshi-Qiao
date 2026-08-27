"use client";

import { create } from "zustand";

type PetState = {
  open: boolean;
  bubble: string;
  toggle: () => void;
  close: () => void;
  setBubble: (b: string) => void;
};

// 灵宠面板开合与气泡文案的全局状态
export const usePetStore = create<PetState>((set) => ({
  open: false,
  bubble: "我发现 3 个新机会",
  toggle: () => set((s) => ({ open: !s.open })),
  close: () => set({ open: false }),
  setBubble: (bubble) => set({ bubble }),
}));
