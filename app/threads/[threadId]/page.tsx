//ずれのトーク画面
//まだ相手がいないときは上のテーマのところを待機中にする
//解決するボタン押したら解決確認のページへ

"use client";

import { MessageComposer } from "@/components/threads/MessageComposer";
import { MessageList } from "@/components/threads/MessageList";
import { ThreadHeader } from "@/components/threads/ThreadHeader";
import { useMemo, useState } from "react";
import { mockThreads } from "@/mock/threads";
import { Message } from "@/types/message";
import { mockMessages } from "@/mock/message";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  const threadId = params.threadId;
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const thread = mockThreads.find((t) => t.id === threadId);
  const mediatorType = thread?.mediatorType ?? "plush";
  const currentUserId = "uA";

  const handleSend = (text: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      threadId,
      kind: "user",
      senderId: currentUserId,
      body: text,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  const threadMessages = useMemo(() => {
    return messages
      .filter((m) => m.threadId === threadId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [messages, threadId]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F0E8] bg-[url(/rectangle23.svg)] bg-contain bg-no-repeat  bg-top">
      <ThreadHeader threadId={threadId} title={thread?.body} />
      <MessageList
        threadId={threadId}
        mediatorType={mediatorType}
        currentUserId={currentUserId}
        messages={threadMessages}
      />
      <MessageComposer />
    </div>
  );
}
