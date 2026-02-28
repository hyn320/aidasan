"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-[#4B4B4B]">
      {/* 中央のスマホ幅コンテナ */}
      <div className="mx-auto w-full max-w-[430px] min-h-screen bg-[#E9E6DE] flex flex-col">
        {/* 上部デザイン */}
        <div className="relative h-[200px]">
          {/* 飾り線 */}
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full border-[14px] border-[#DAA691] opacity-70" />
          <div className="absolute -left-6 -top-16 h-52 w-52 rounded-full border-[14px] border-[#849E87] opacity-70" />

          {/* ロゴ */}
          <div className="flex items-center justify-center h-full pt-30 mb-20">
            <Image src="/aidasan.svg" width={431} height={287} alt="aidasan" />
          </div>
        </div>

        {/* 下の白いカード（ここが縦いっぱいに伸びる） */}
        <div className="flex-1 bg-white rounded-t-[32px] px-7 pt-8 pb-10 shadow-sm mt-10">
          <form className="space-y-10">
            <div>
              <label className="text-sm text-[#9E9E9E] font-bold">
                Email adress
              </label>
              <input
                type="email"
                className="w-full h-12 mt-2 rounded-xl bg-[#EDEDED] px-4 outline-none mt-5 mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm text-[#9E9E9E] font-bold">
                Password
              </label>
              <input
                type="password"
                className="w-full h-12 mt-2 rounded-xl bg-[#EDEDED] px-4 outline-none mt-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-[#6F8F78] text-white font-semibold shadow-md mt-10"
            >
              新規登録
            </button>

            <div className="text-center text-xs text-[#8E8E8E] leading-relaxed">
              すでにアカウントをお持ちの方はこちら
              <br />
              <Link href="/auth/login" className="text-[#6F8F78] font-semibold">
                ログイン
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
