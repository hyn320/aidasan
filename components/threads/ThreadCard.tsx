// components/threads/ThreadCard.tsx

import Link from "next/link";
import { Thread } from "@/types/thread";

type Props = {
  thread: Thread;
  self: "uA" | "uB";
};

export default function ThreadCard({ thread, self }: Props) {
  const isA = self === "uA";
  const myResolved = isA ? thread.resolvedA : thread.resolvedB;
  const otherResolved = isA ? thread.resolvedB : thread.resolvedA;

  let status = "進行中";
  let statusColor = "bg-[#EBF0E8] text-[#4A6741]";

  if (myResolved && !otherResolved) {
    status = "相手の返事待ち";
    statusColor = "bg-[#FFF3E5] text-[#C8916A]";
  }

  if (myResolved && otherResolved) {
    status = "解決✓";
    statusColor = "bg-[#BDBDBD] text-black";
  }

  const otherName = isA ? thread.userBName : thread.userAName;
  return (
    <Link
      href={`/threads/${thread.id}`}
      className="bg-white rounded-[20px] shadow-sm p-4 flex flex-col"
      style={{
        width: 320,
        height: 110,
      }}
    >
      <div className="text-[16px] font-semibold">
        {thread.body}
      </div>

      <div className="text-[13px] text-gray-500 mt-1">
        {otherName}
      </div>

      {/* ステータス丸バッジ */}
      <div
        className={`mt-2 px-3 py-1 rounded-full text-[12px] font-semibold w-fit ${statusColor}`}
      >
        {status}
      </div>
    </Link>
  );
}