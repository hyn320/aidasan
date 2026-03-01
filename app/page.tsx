"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Yomogi } from "next/font/google";

const yomogi = Yomogi({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex justify-center w-full min-h-screen bg-[#d9deca]">
      <div className="relative w-full max-w-[390px] h-screen overflow-hidden bg-[#d9deca]">
        {/* 背景 */}
        <Image
          src="/bgForStart.svg"
          alt="background"
          fill
          className="object-cover"
          priority
        />

        {/* ロゴ */}
        <Image
          src="/aidasanForStart.svg"
          alt="logo"
          width={360}
          height={120}
          className="absolute left-1/2 -translate-x-1/2"
          priority
        />

        {/* 文章 */}
        <div
          className={`${yomogi.className} absolute top-[135px] left-1/2 -translate-x-1/2 text-center text-[11px] text-[#123823] leading-relaxed`}
        >
          <p>ふたりのあいだに、やさしい言葉を。</p>
          <p>すれ違うあいだを、やさしくほどく。</p>
        </div>

        {/* スマホ */}
        <div className="relative w-[450px] h-[350px]">
          <Image
            src="/phoneForStart.svg"
            alt="phone"
            width={450}
            height={350}
            className="absolute top-[70px] left-[-30px]"
          />
        </div>

        {/* キャラクター3体を個別配置 */}
        <Image
          src="/bearForStart.svg"
          alt="bear"
          width={350}
          height={350}
          className="absolute bottom-[380px]"
        />

        <Image
          src="/ojisanForStart.svg"
          alt="ojisan"
          width={320}
          height={320}
          className="absolute bottom-[90px]"
        />

        <Image
          src="/plantForStart.svg"
          alt="plant"
          width={290}
          height={290}
          className="absolute bottom-[170px] left-[105px]"
        />

        {/* はじめるボタン */}
        <button
          onClick={() => router.push("/auth")}
          className="absolute bottom-[105px] left-1/2 -translate-x-1/2 z-10 w-[260px] rounded-full bg-[#719167] py-4 text-white text-lg shadow-md active:scale-95 transition"
        >
          はじめる
        </button>

        {/* 緑の楕円 */}
        <div className="absolute bottom-[74px] left-[65px] w-[40px] h-[18px] bg-[#719167] rounded-full" />
        <div className="absolute bottom-[50px] left-[52px] w-[25px] h-[14px] bg-[#719167] rounded-full" />
      </div>
    </div>
  );
}
