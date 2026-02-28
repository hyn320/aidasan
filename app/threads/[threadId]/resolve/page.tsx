//ここは両方が解決したか確認できる画面です
//解決したボタンは何回も押したりできるように
//二人とも解決したら二人の解決がそろったよの奴が出るように
//ホームに戻る押したらホームの画面に戻すように
//app/threads/[threadId]/resolve/page.tsx
// app/threads/[threadId]/resolve/page.tsx
// app/threads/[threadId]/resolve/page.tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { mockThreads } from "@/mock/threads";
import { UserResolveItem } from "@/components/resolve/UserResolveItem";
import { ResolveHeader } from "@/components/resolve/ResolveHeader";
import { MediatorDecoration } from "@/components/resolve/MediatorDecoration";
import Done from "@/components/resolve/Done";

export default function ResolvePage() {
  const params = useParams();
  const threadId = params.threadId as string;

  const thread = mockThreads.find((t) => t.id === threadId);
  if (!thread) return <div>Thread not found</div>;

  // 🔥 状態管理（ここが重要）
  const [meResolved, setMeResolved] = useState(false);
  const [partnerResolved, setPartnerResolved] = useState(false);

  // 両方trueなら完了画面
  const isDone = meResolved && partnerResolved;

  return (
    <div className="min-h-screen bg-[url('/background.svg')] bg-top bg-no-repeat bg-cover">

      <ResolveHeader title="解決を確認" />
      <MediatorDecoration mediatorType={thread.mediatorType} />

      {/* ========================= */}
      {/* ✅ 両方解決した場合 */}
      {/* ========================= */}
      {isDone && (
        <>
          <p className="px-6 mt-4 text-center text-sm text-gray-600">
            ふたりとも、よく話してくれたね。
            <br />
            おめでとう！解決できたよ。
          </p>

          <div className="mt-6 space-y-4 px-6">
            <UserResolveItem
              icon="/niwatori.svg"
              name="ゆーてる"
              status="done"
              onClick={() => setMeResolved(false)} // ← 押し直し可能
              isMe
            />

            <UserResolveItem
              icon="/kaeru.svg"
              name="ゆーや"
              status="done"
            />
          </div>

          <Done />
        </>
      )}

      {/* ========================= */}
      {/* ✅ まだ両方揃ってない場合 */}
      {/* ========================= */}
      {!isDone && (
        <>
          {/* 文章切り替え */}
          <p className="px-6 mt-4 text-center text-sm text-gray-600">
            {!meResolved && !partnerResolved && (
              <>
                ふたりとも、よく話してくれたね。
                <br />
                解決できたと思ったら「解決した」を押してみてね。
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

          <div className="mt-6 space-y-4 px-6">
            {/* 自分 */}
            <UserResolveItem
              icon="/niwatori.svg"
              name="ゆーてる"
              status={meResolved ? "done" : "pending"}
              onClick={() => setMeResolved((prev) => !prev)} // ← トグル！
              isMe
            />

            {/* 相手 */}
            <UserResolveItem
              icon="/kaeru.svg"
              name="ゆーや"
              status={partnerResolved ? "done" : "pending"}
            />
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            両者が「解決した」を押すと完了になります。
          </p>

          {/* 🔥 デモボタン */}
          <div className="text-center mt-4 space-x-4">
            <button
              onClick={() => setPartnerResolved(true)}
              className="text-xs text-gray-400 underline"
            >
              （デモ）相手が先に押す
            </button>

            <button
              onClick={() => {
                setMeResolved(false);
                setPartnerResolved(false);
              }}
              className="text-xs text-gray-400 underline"
            >
              リセット
            </button>
          </div>
        </>
      )}
    </div>
  );
}
/*'use client';

import { mockThreads } from "@/mock/threads";
import { UserResolveItem } from "@/components/resolve/UserResolveItem";
import { ResolveHeader } from "@/components/resolve/ResolveHeader";
import { MediatorDecoration } from "@/components/resolve/MediatorDecoration";

export default function ResolvePage({ params }: { params: { threadId: string } }) {
  const thread = mockThreads.find((t) => t.id === params.threadId);

  return (
    <div className="min-h-screen bg-[url('/background.svg')] bg-top bg-no-repeat bg-cover">

      <ResolveHeader title="解決を確認" />

      <MediatorDecoration mediatorType={thread?.mediatorType ?? "plush"} />

      <p className="px-6 mt-4 text-center text-sm text-gray-600">
        ふたりとも、よく話してくれたね。
        <br />
        解決できたと思ったら「解決した」を押してみてね。
      </p>

      <div className="mt-6 space-y-4 px-6">
        <UserResolveItem
          icon="/niwatori.svg"
          name="ゆーてる"
          status="pending"
          actionHref={`/threads/${thread?.id}/resolve/waiting`}
        />

        <UserResolveItem
          icon="/kaeru.svg"
          name="ゆーや"
          status="pending"
          actionHref={`/threads/${thread?.id}/resolve/partner-waiting`}
          disabled
        />
      </div>

      <p className="mt-6 text-center text-xs text-gray-500">
        両者が「解決した」を押すと完了になります。
      </p>

    </div>
  );
}*/