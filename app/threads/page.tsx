//app/threads/page.tsx


"use client";

import { useState } from "react";
import ThreadsNavTabs from "@/components/threads/ThreadsNavTabs";
import ThreadCard from "@/components/threads/ThreadCard";
import BottomNav from "@/components/threads/BottomNav";
import TopMenu from "@/components/threads/TopMenu";
import { mockThreads } from "@/mock/threads";

export default function ThreadsPage() {
  const [activeTab, setActiveTab] =
    useState<"all" | "ongoing" | "resolved">("all");

  const filtered = mockThreads.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "ongoing") return !(t.resolvedA && t.resolvedB);
    if (activeTab === "resolved") return t.resolvedA && t.resolvedB;
  });

  const counts = {
    all: mockThreads.length,
    ongoing: mockThreads.filter(
      (t) => !(t.resolvedA && t.resolvedB)
    ).length,
    resolved: mockThreads.filter(
      (t) => t.resolvedA && t.resolvedB
    ).length,
  };

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/threads/threadsbackground.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 右上メニュー */}
      <TopMenu />

      <div className="pt-35">
        <ThreadsNavTabs
          activeTab={activeTab}
          onChange={setActiveTab}
          counts={counts}
        />
      </div>

      {/* カード一覧 */}
      <div className="mt-6 flex flex-col items-center gap-6 pb-24">
        {filtered.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} self="uA" />
        ))}
      </div>

      {/* 下ナビ */}
      <BottomNav />
    </div>
  );
}