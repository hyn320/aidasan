import Image from "next/image";
import Link from "next/link";

type Props = {
  threadId: string;
  title?: string;
};

export function ThreadHeader({ threadId, title }: Props) {
  console.log("ThreadHeader threadId =", threadId);
  return (
    <div className=" h-28 flex items-center px-4 justify-between">
      <Link href="/home">
        <Image src="/Vector.svg" width={18} height={14} alt="arrow" />
      </Link>
      <div className="text-black font-bold">家事の分担</div>
      <Link
        href={`/threads/${threadId}/resolve`}
        className="rounded-[100px] border text-[#485D76] px-4 py-2 bg-[#EBF0E8] border-[#485D76] border-2"
      >
        解決を確認
      </Link>
    </div>
  );
}
