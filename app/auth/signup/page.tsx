"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding/profile");
  };

  return (
    <div className="min-h-screen bg-[#4B4B4B] flex justify-center">
      {/* スマホ幅 */}
      <div
        className="w-full max-w-[430px] min-h-screen flex flex-col"
        style={{
          backgroundImage: "url('/new.png')",
          backgroundSize: "contain", // ← ここ重要
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#E9E6DE", // 余白の色
        }}
      >
        {/* 上のロゴ部分を見せるための余白 */}
        <div className="h-[260px]" />

        {/* 白カード */}
        <div className="flex-1 bg-white rounded-t-[34px] px-7 pt-10 pb-10 shadow-[0_-8px_30px_rgba(0,0,0,0.08)]">
          <form onSubmit={onSubmit} className="space-y-8">
            <div>
              <label className="text-sm font-semibold text-[#B5B5B5]">
                Email adress
              </label>
              <input
                type="email"
                className="w-full h-12 mt-2 rounded-xl bg-[#EDEDED] px-4 outline-none text-black"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-[#B5B5B5]">
                Password
              </label>
              <input
                type="password"
                className="w-full h-12 mt-2 rounded-xl bg-[#EDEDED] px-4 outline-none text-black"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-full bg-[#6F8F78] text-white font-semibold shadow-[0_10px_24px_rgba(111,143,120,0.35)]"
            >
              新規登録
            </button>

            <div className="text-center text-xs text-[#777]">
              すでにアカウントをお持ちの方はこちら
              <br />
              <button
                type="button"
                onClick={() => router.push("/auth/login")}
                className="text-[#6F8F78] font-semibold"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
