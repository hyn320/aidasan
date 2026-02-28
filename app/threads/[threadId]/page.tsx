//ずれのトーク画面
//まだ相手がいないときは上のテーマのところを待機中にする
//解決するボタン押したら解決確認のページへ

import ThreadClient from "@/components/threads/ThreadClient";

export default async function ThreadPage({
  params,
}: {
  params: Promise<{ threadId: string }>;
}) {
  const { threadId } = await params;
  return <ThreadClient threadId={threadId} />;
}
