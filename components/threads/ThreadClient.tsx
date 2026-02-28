"use client";

import { MessageComposer } from "@/components/threads/MessageComposer";
import { MessageList } from "@/components/threads/MessageList";
import { ThreadHeader } from "@/components/threads/ThreadHeader";
import { useEffect, useMemo, useState } from "react";
import { mockThreads } from "@/mock/threads";
import { Message } from "@/types/message";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  threadId: string;
};

export default function ThreadClient({ threadId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const thread = mockThreads.find((t) => t.id === threadId);
  const mediatorType = thread?.mediatorType ?? "plush";

  // 今はログイン無しなので固定（usersテーブルのAのid）
  const currentUserId = "a3db4705-3c8f-4b4d-aae0-09500e4dc44e";

  // --- DBからこのスレのメッセージを取得 ---
  async function fetchMessages() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("threadId", threadId)
      .order("createdAt", { ascending: true });

    if (error) {
      console.error("fetchMessages error:", error);
      return;
    }

    setMessages((data ?? []) as Message[]);
  }

  useEffect(() => {
    fetchMessages();
  }, [threadId]);

  // --- 送信：DBにinsert → 返ってきた行(data)を追加 ---
  const handleSend = async (text: string) => {
    const payload = {
      threadId,
      kind: "user" as const,
      senderId: currentUserId,
      body: text,
      // createdAt は DB の default now() に任せる
      // id も DB の default gen_random_uuid() に任せる
    };

    const { data, error } = await supabase
      .from("messages")
      .insert(payload)
      .select("*")
      .single();

    if (error) {
      console.error("insert error:", error);
      return;
    }
    if (!data) return;

    setMessages((prev) => [...prev, data as Message]);
  };

  // 念のため（DB側で絞ってるけど、UIはこれがあると安全）
  const threadMessages = useMemo(() => {
    return messages
      .filter((m) => m.threadId === threadId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
  }, [messages, threadId]);

  return (
    <div className="flex flex-col min-h-screen bg-[#F4F0E8] bg-[url(/rectangle23.svg)] bg-contain bg-no-repeat bg-top">
      <ThreadHeader threadId={threadId} title={thread?.body} />
      <MessageList
        threadId={threadId}
        mediatorType={mediatorType}
        currentUserId={currentUserId}
        messages={threadMessages}
      />
      <MessageComposer onSend={handleSend} />
    </div>
  );
}
