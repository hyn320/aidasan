// mock/threads.ts

import { Thread } from "@/types/thread";

export const mockThreads: Thread[] = [
  {
    id: "t1",
    body: "帰りが遅い問題",
    pairId: "p1",
    mediatorType: "plush",
    createdBy: "uA",
    resolvedA: false,
    resolvedB: false,
    archived: false,
    createdAt: "2026-02-21T09:00:00Z",
    userAName: "ユーザーA",
    userBName: "かなこ",
  },
    {
    id: "t2",
    body: "お金の使い方について",
    pairId: "p1",
    mediatorType: "plush",
    createdBy: "uB",
    resolvedA: true,
    resolvedB: false,
    archived: false,
    createdAt: "2026-02-22T12:00:00Z",
    userAName: "ユーザーA",
    userBName: "しげる",
  },
  {
    id: "t3",
    body: "記念日の過ごし方",
    pairId: "p1",
    mediatorType: "plush",
    createdBy: "uA",
    resolvedA: true,
    resolvedB: true,
    archived: true,
    createdAt: "2026-02-20T08:00:00Z",
    userAName: "ユーザーA",
    userBName: "しば",
  },
];

