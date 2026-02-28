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
  const currentUserId = "a3db4705-3c8f-4b4d-aae0-09500e4dc44e";

  const [thread, setThread] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  // ============================
  // 🔥 Supabaseから thread を取得
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

  if (loading) return <div>Loading...</div>;
  if (!thread) return <div>Thread not found</div>;

  // ============================
  // 🔥 自分が A か B か判定
  // ============================
  const meIsA = thread.createdBy === currentUserId;

  // DB の状態
  const meResolved = meIsA ? thread.resolvedA : thread.resolvedB;
  const partnerResolved = meIsA ? thread.resolvedB : thread.resolvedA;

  const isDone = thread.resolvedA && thread.resolvedB;

  // ============================
  // 🔥 解決ボタン処理（DB 更新）
  // ============================
  const handleResolve = async () => {
    const updateField = meIsA ? "resolvedA" : "resolvedB";

    const { error } = await supabase
      .from("threads")
      .update({ [updateField]: true })
      .eq("id", threadId);

    if (error) {
      console.error(error);
      return;
    }

    // 即時反映
    const updated = { ...thread, [updateField]: true };

    // 両者完了なら archived を更新
    if (updated.resolvedA && updated.resolvedB) {
      await supabase.from("threads").update({ archived: true }).eq("id", threadId);
      updated.archived = true;
    }

    setThread(updated);
  };

  // ============================
  // 🔥 表示レンダリング
  // ============================
  return (
    <div className="min-h-screen bg-[url('/background.svg')] bg-top bg-no-repeat bg-cover">
      <ResolveHeader title="解決を確認" />
      <MediatorDecoration mediatorType={thread.mediatorType} />

      {/* ========================= */}
      {/*  完了画面 */}
      {/* ========================= */}
      {isDone ? (
        <>
          <p className="px-6 mt-4 text-center text-sm text-gray-600">
            ふたりとも、よく話してくれたね。
            <br />
            おめでとう！解決できたよ。
          </p>

          <div className="mt-6 space-y-4 px-6">
            <UserResolveItem
              icon="/niwatori.svg"
              name="あなた"
              status="done"
              isMe
            />

            <UserResolveItem
              icon="/kaeru.svg"
              name="相手"
              status="done"
            />
          </div>

          <Done />
        </>
      ) : (
        <>
          {/* 文章切り替え */}
          <p className="px-6 mt-4 text-center text-sm text-gray-600">
            {!meResolved && !partnerResolved && (
              <>
                解決できたと思ったら「解決した」を押してね。
              </>
            )}

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
          </p>

          {/* 自分と相手 */}
          <div className="mt-6 space-y-4 px-6">
            <UserResolveItem
              icon="/niwatori.svg"
              name="あなた"
              status={meResolved ? "done" : "pending"}
              onClick={handleResolve}
              isMe
            />

            <UserResolveItem
              icon="/kaeru.svg"
              name="相手"
              status={partnerResolved ? "done" : "pending"}
            />
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            両者が「解決した」を押すと完了になります。
          </p>
        </>
      )}
    </div>
  );
}