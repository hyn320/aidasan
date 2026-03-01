"use client";

import { MessageComposer } from "@/components/threads/MessageComposer";
import { MessageList } from "@/components/threads/MessageList";
import { ThreadHeader } from "@/components/threads/ThreadHeader";
import { useEffect, useMemo, useState } from "react";
import { Message } from "@/types/message";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  threadId: string;
};

export default function ThreadClient({ threadId }: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const mediatorType: "plush" | "plant" | "ojisan" = "plush";
  const title = "家事の分担"; // ここも一旦固定でOK

  // 今はログイン無しなので固定（usersテーブルのAのid）
  // const currentUserId = "a3db4705-3c8f-4b4d-aae0-09500e4dc44e"; //A
  const currentUserId = "cd3a3a03-d0de-40b0-96c7-a0e34cbb9ed7"; //B

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
    if (!threadId) return;
    fetchMessages();
  }, [threadId]);

  // --- 送信：DBにinsert → 返ってきた行(data)を追加 ---
  const handleSend = async (text: string) => {
    const body = text.trim();
    if (!body) return;

    // 1) user 行を insert（id/createdAt はDBに任せる）
    const { data: userRow, error: userErr } = await supabase
      .from("messages")
      .insert({
        threadId,
        kind: "user",
        senderId: currentUserId,
        body,
      })
      .select()
      .single();

    if (userErr || !userRow) {
      console.error("insert user error:", userErr);
      return;
    }

    // 2) mediator 行を insert（quotedMessageId に userRow.id）
    const { data: mediatorRow, error: medErr } = await supabase
      .from("messages")
      .insert({
        threadId,
        kind: "mediator",
        senderId: null,
        body, // ここは間さんの文にしたければ後で変える
        quotedMessageId: userRow.id,
      })
      .select()
      .single();

    if (medErr || !mediatorRow) {
      console.error("insert mediator error:", medErr);
      // userRowだけでも表示は更新したいなら↓は残してOK
      setMessages((prev) => [...prev, userRow] as Message[]);
      return;
    }

    // 3) 画面更新（user + mediator の順で追加）
    setMessages((prev) => [...prev, userRow, mediatorRow] as Message[]);
  };
  // 念のため（DB側で絞ってるけど、UIはこれがあると安全）
  const threadMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );
  }, [messages]);
  console.log("✅ ThreadClient rendered. threadId =", threadId);

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E3D6] bg-[url(/rectangle23.svg)] bg-contain bg-no-repeat bg-top ">
      <ThreadHeader
        threadId={threadId}
        title={title}
        onRefresh={fetchMessages}
      />
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
