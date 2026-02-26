import Image from "next/image";

export function MessageComposer() {
  return (
    <div className="sticky bottom-0 h-20 flex items-center px-4 shadow-sm gap-3 w-full w-screen ">
      <input
        className="px-4 py-3 bg-[#ffffff] border border-[#E6DDD3] placeholder:text-[#B0A89E] rounded-[100px]  font-black flex-1 text-sm outline-none w-full"
        placeholder="気持ちを書いてみて…"
      />
      <button className="bg-[#719267] rounded-full w-10 h-10 flex items-center justify-center">
        <Image src="/→.svg" width={20} height={20} alt="arrow" />
      </button>
    </div>
  );
}
