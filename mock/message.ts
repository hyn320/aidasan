import { Message } from "@/types/message";

export const mockMessages: Message[] = [
  // t1
  {
    id: "m1",
    threadId: "t1",
    kind: "user",
    senderId: "uA",
    body: "最近ちょっと帰り遅いよね",
    createdAt: "2026-02-21T10:00:00Z",
  },
  {
    id: "m2",
    threadId: "t1",
    kind: "mediator",
    senderId: "mediator",
    body: "Aさんから聞いたよ：『最近ちょっと帰り遅いよね』",
    createdAt: "2026-02-21T10:01:00Z",
  },
  {
    id: "m3",
    threadId: "t1",
    kind: "user",
    senderId: "uB",
    body: "仕事が立て込んでて…でも心配させてごめんね",
    createdAt: "2026-02-21T10:02:00Z",
  },
  {
    id: "m4",
    threadId: "t1",
    kind: "mediator",
    senderId: "mediator",
    body: "Bさんから聞いたよ：『仕事が立て込んでて…でも心配させてごめんね』",
    createdAt: "2026-02-21T10:03:00Z",
  },

  // t2（片方解決のスレ用）
  {
    id: "m5",
    threadId: "t2",
    kind: "user",
    senderId: "uB",
    body: "家事、私が多い気がしてしんどい…",
    createdAt: "2026-02-20T12:10:00Z",
  },
  {
    id: "m6",
    threadId: "t2",
    kind: "mediator",
    senderId: "mediator",
    body: "Bさんから聞いたよ：『家事、私が多い気がしてしんどい…』",
    createdAt: "2026-02-20T12:11:00Z",
  },
];
