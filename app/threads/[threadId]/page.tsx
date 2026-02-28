//ずれのトーク画面
//まだ相手がいないときは上のテーマのところを待機中にする
//解決するボタン押したら解決確認のページへ

import ThreadClient from "@/components/threads/ThreadClient";

export default function ThreadPage({
  params,
}: {
  params: { threadId: string };
}) {
  const threadId = params.threadId;
  return <ThreadClient threadId={threadId} />;
}
