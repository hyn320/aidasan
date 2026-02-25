//ずれのトーク画面
//まだ相手がいないときは上のテーマのところを待機中にする
//解決するボタン押したら解決確認のページへ

import Image from "next/image";

export default function ThreadPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F4F0E8] bg-[url(/rectangle23.svg)] bg-contain bg-no-repeat  bg-top">
      <div className="h-28 flex items-center px-4 justify-between">
        <Image src="/Vector.svg" width={18} height={14} alt="arrow" />
        <div className="text-black font-bold">家事の分担</div>
        <div className="rounded-[100px] border text-[#485D76] px-4 py-2 bg-[#EBF0E8] border-[#485D76] border-2">
          解決を確認
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-24">
        <div className="flex flex-col items-center">
          <Image
            src="/group16.svg"
            width={50}
            height={50}
            alt="くま"
            className="shadow"
          />
          <div className="bg-white rounded-[20px] max-w-[80%] px-4 py-3 mx-auto text-[#6B6B6B] shadow-md inline-block">
            ああああああああああああああ
          </div>
        </div>
        <div className="flex justify-end items-center gap-2">
          <div className="bg-[#719267] rounded-[20px] px-4 py-3 max-w-70  text-white inline-block">
            そうだったんだね、気づかなくてごめん
          </div>
          <Image src="/group10.svg" width={40} height={40} alt="かえる" />
        </div>
      </div>
      <div className="sticky bottom-0 h-20 flex items-center px-4 shadow-sm gap-3 w-full w-screen ">
        <input
          className="px-4 py-3 bg-[#ffffff] border border-[#E6DDD3] placeholder:text-[#B0A89E] rounded-[100px]  font-black flex-1 text-sm outline-none w-full"
          placeholder="気持ちを書いてみて…"
        />
        <button className="bg-[#719267] rounded-full w-10 h-10 flex items-center justify-center">
          <Image src="/→.svg" width={20} height={20} alt="arrow" />
        </button>
      </div>
    </div>
  );
}
