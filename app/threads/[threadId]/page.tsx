//ずれのトーク画面
//まだ相手がいないときは上のテーマのところを待機中にする
//解決するボタン押したら解決確認のページへ

import { MessageComposer } from "@/components/threads/MessageComposer";
import { MessageList } from "@/components/threads/MessageList";
import { ThreadHeader } from "@/components/threads/ThreadHeader";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F0E8] bg-[url(/rectangle23.svg)] bg-contain bg-no-repeat  bg-top">
      <ThreadHeader />
      <MessageList threadId={threadId} mediatorType="plush" />
      <MessageComposer />
    </div>
  );
}
