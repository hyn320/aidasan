//ここは両方が解決したか確認できる画面です
//解決したボタンは何回も押したりできるように
//二人とも解決したら二人の解決がそろったよの奴が出るように
//ホームに戻る押したらホームの画面に戻すように
//app/threads/[threadId]/resolve/page.tsx
// app/threads/[threadId]/resolve/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { UserResolveItem } from "@/components/resolve/UserResolveItem";
import { ResolveHeader } from "@/components/resolve/ResolveHeader";
import { MediatorDecoration } from "@/components/resolve/MediatorDecoration";
import Done from "@/components/resolve/Done";

export default function ResolvePage() {
  const params = useParams();
  const threadId = params.threadId as string;

  // ★ 本当は Auth から取る
const currentUserId = "a3db4705-3c8f-4b4d-aae0-09500e4dc44e"; //A
// // const currentUserId = "cd3a3a03-d0de-40b0-96c7-a0e34cbb9ed7"; //B

  const [thread, setThread] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // 🔥 Supabase から thread を取得
  // ============================
  useEffect(() => {
    async function fetchThread() {
      const { data, error } = await supabase
        .from("threads")
        .select("*")
        .eq("id", threadId)
        .single();

      if (error) {
        console.error("Supabase Error:", error);
        return;
      }

      setThread(data);
      setLoading(false);
    }

    fetchThread();
  }, [threadId]);

  // ============================
  // 🔥 リアルタイム購読
  // ============================
  useEffect(() => {
    const channel = supabase
      .channel(`thread-${threadId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "threads",
          filter: `id=eq.${threadId}`,
        },
        (payload) => {
          setThread(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [threadId]);

  if (loading) return <div>Loading...</div>;
  if (!thread) return <div>Thread not found</div>;

  // ============================
  // 🔥 A = カエル（自分） / B = ニワトリ（相手）
  // ============================
  const meIsA = thread.userA === currentUserId;

  const meIcon = meIsA ? "/kaeru.svg" : "/niwatori.svg";
  const partnerIcon = meIsA ? "/niwatori.svg" : "/kaeru.svg";

  const meName = "あなた";
  const partnerName = "相手";

  // DB 状態
  const meResolved = meIsA ? thread.resolvedA : thread.resolvedB;
  const partnerResolved = meIsA ? thread.resolvedB : thread.resolvedA;

  const isDone = thread.resolvedA && thread.resolvedB;

  // ============================
  // 🔥 解決ボタン（トグル OK）
  // ============================
  const handleResolve = async () => {
    const updateField = meIsA ? "resolvedA" : "resolvedB";
    const newValue = !meResolved;

    const { error } = await supabase
      .from("threads")
      .update({ [updateField]: newValue })
      .eq("id", threadId);

    if (error) {
      console.error("Update error:", error);
      return;
    }

    const updated = { ...thread, [updateField]: newValue };

    // 両者完了で archived = true
    if (updated.resolvedA && updated.resolvedB) {
      await supabase.from("threads").update({ archived: true }).eq("id", threadId);
      updated.archived = true;
    } else {
      // どちらか解除したら archived = false に戻す
      await supabase.from("threads").update({ archived: false }).eq("id", threadId);
      updated.archived = false;
    }

    setThread(updated);
  };

  // ============================
  // 🔥 UI 表示
  // ============================
  return (
    <div className="min-h-screen bg-[url('/background.svg')] bg-top bg-no-repeat bg-cover">
      <ResolveHeader title="解決を確認" />
      <MediatorDecoration mediatorType={thread.mediatorType} />

      {/* ========================= */}
      {/* 完了/未完了どちらでもクリックできる */}
      {/* ========================= */}

      <p className="px-6 mt-4 text-center text-sm text-gray-600">
        {!meResolved && !partnerResolved && <>解決できたと思ったら「解決した」を押してね。</>}
        {meResolved && !partnerResolved && (
          <>
            あなたは「解決した」と伝えたよ。
            <br />
            相手の返事を待っているね。
          </>
        )}
        {!meResolved && partnerResolved && (
          <>
            相手は「解決した」と伝えたよ。
            <br />
            あなたの返事を待っているね。
          </>
        )}
        {isDone && (
          <>
            ふたりとも、よく話してくれたね。
            <br />
            おめでとう！解決できたよ。
          </>
        )}
      </p>

      <div className="mt-6 space-y-4 px-6">
        {/* 自分（完了画面でも押し直し可能） */}
        <UserResolveItem
          icon={meIcon}
          name={meName}
          status={meResolved ? "done" : "pending"}
          onClick={handleResolve}
          isMe
        />

        {/* 相手（見た目だけ変わる） */}
        <UserResolveItem
          icon={partnerIcon}
          name={partnerName}
          status={partnerResolved ? "done" : "pending"}
        />
      </div>

      {isDone && <Done />}
    </div>
  );
}