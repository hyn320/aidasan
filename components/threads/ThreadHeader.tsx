import Image from "next/image";

export function ThreadHeader() {
  return (
    <div className="h-28 flex items-center px-4 justify-between">
      <Image src="/Vector.svg" width={18} height={14} alt="arrow" />
      <div className="text-black font-bold">家事の分担</div>
      <div className="rounded-[100px] border text-[#485D76] px-4 py-2 bg-[#EBF0E8] border-[#485D76] border-2">
        解決を確認
      </div>
    </div>
  );
}
