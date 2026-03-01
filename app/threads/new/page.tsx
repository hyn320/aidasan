//ここはどんなずれかを書く画面です
//ペアを招待する押したら参加/招待する画面に行くように

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import type { Thread } from "@/types/thread";
import { MediatorDecoration } from "@/components/resolve/MediatorDecoration";
import { Yusei_Magic } from "next/font/google";

const yusei = Yusei_Magic({
  weight: "400",
  subsets: ["latin"],
});

export default function NewThreadPage() {
  const router = useRouter();
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const dummy: Thread = {
      id: "temp",
      body: text,
      pairId: null,
      mediatorType: "bear" as any,
      createdBy: "dummy",
      resolvedA: false,
      resolvedB: false,
      archived: false,
      createdAt: new Date().toISOString(),
      userAName: "A",
      userBName: "B",
    };

    console.log(dummy);
    router.push("/pair");
  };

  return (
    <div className="min-h-screen bg-[#e6e4d7] flex flex-col items-center">
      {/* header + wave */}
      <div className="w-full max-w-md relative">
        {/* wave */}
        <Image
          src="/icons/wave.svg"
          alt="wave"
          width={500}
          height={200}
          className="absolute top-[-45px] left-0 w-full"
        />

        {/* header */}
        <div className="absolute top-6 left-4 flex items-center gap-2">
          <button onClick={() => router.back()}>
            <Image
              src="/icons/backButton.png"
              alt="back"
              width={24}
              height={24}
            />
          </button>
          <h1 className="text-xl font-semibold">テーマをつくる</h1>
        </div>
      </div>

      {/* body */}
      <div className="w-full max-w-md px-6 flex flex-col items-center relative pt-32">
        {/* キャラ */}
        <div className="-mt-10 mb-6 w-24 h-24 rounded-full bg-white relative overflow-hidden flex items-center justify-center">
          <div className="flex items-center justify-center w-[80%] h-[80%] -translate-y-[5%]">
            <MediatorDecoration mediatorType="plush" />
          </div>
        </div>

        {/* title */}
        <h1 className={`${yusei.className} text-2xl text-center mt-2`}>
          どんなズレを
          <br />
          話したい？
        </h1>

        <p className="text-sm text-[#6b6b6b] mb-7 text-center mt-7">
          感じていることをそのまま書いてみて。
        </p>

        {/* textarea */}
        <div className="w-full relative">
          <textarea
            value={text}
            onChange={(e) =>
              e.target.value.length <= 100 && setText(e.target.value)
            }
            className="w-full h-40 rounded-2xl bg-white p-5 resize-none outline-none"
          />

          {text === "" && (
            <div className="absolute top-5 left-5 text-[#B0A89E] text-sm leading-7 pointer-events-none">
              例：家事の分担について
              <br />
              例：休日の過ごし方が違う
            </div>
          )}

          <p className="text-right text-xs text-[#B0A89E] mt-1">
            {text.length}/100
          </p>
        </div>
      </div>

      {/* button */}
      <div className="w-full max-w-md px-6 mt-auto pb-10">
        <button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="w-full bg-[#719267] text-white py-4 rounded-full font-semibold
          disabled:bg-[#d9d9d9]"
        >
          ペアを招待する
        </button>
      </div>
    </div>
  );
}
