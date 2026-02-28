//ここはログインか新規登録画面を選ぶ画面作ってください
//ログインボタンは置いとくだけおといて今回は実装しない
//新規登録はuiつくってから飛べるようにする
// app/auth/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex flex-col justify-end items-center pb-20"
      style={{
        backgroundImage: "url('/loginorshinki.svg')", // ← 修正ポイント
      }}
    >
      <button
        onClick={() => router.push("/auth/signup")}
        className="w-64 py-3 mb-4 rounded-full text-white text-lg shadow-lg"
        style={{ backgroundColor: "#6F8C63" }}
      >
        新規登録
      </button>

      <button
        className="w-64 py-3 rounded-full text-white text-lg shadow-lg"
        style={{ backgroundColor: "#6F8C63" }}
      >
        ログイン
      </button>
    </div>
  );
}