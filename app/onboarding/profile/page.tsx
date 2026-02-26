//ここはプロフィール設定画面です
//保存を押したらhomeの画面に飛ぶようにする

"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [selectedIcon, setSelectedIcon] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  const handleSave = () => {
    // UIフェーズなので保存処理なし
    router.push("/home");
  };

  return (
    <div className="min-h-screen bg-[#e6e4d7] flex flex-col items-center">
      {/* ヘッダー */}
      <div className="w-full max-w-md px-4 pt-6 pb-4">
        <div className="text-[#1a1a1a] flex items-center gap-2 mb-6">
          <button onClick={() => router.back()}>
          <Image
            src="/icons/backButton.png"
            alt="backButton"
            width={24}
            height={24}
          />
        </button>
          <h1 className="text-xl font-semibold">プロフィール設定</h1>
        </div>

        {/* アイコン */}
        <p className="text-sm text-[#B0A89E] mb-2">アイコン</p>

        <div className="flex justify-center gap-4 mb-4">
          {/* ひよこ */}
          <div 
            onClick={() => setSelectedIcon("hiyoko")}
            className={`w-20 h-20 rounded-2xl overflow-hidden bg-white flex items-center justify-center cursor-pointer
            ${
              selectedIcon === "hiyoko"
                ? "border-2 border-[#4A6741]"
                : "border-2 border-transparent"
            }`}
          >
            <Image
              src="/icons/hiyoko.png"
              alt="hiyoko"
              width={80}
              height={80}
            />
          </div>

          {/* かえる */}
          <div
            onClick={() => setSelectedIcon("kaeru")}
            className={`w-20 h-20 rounded-2xl overflow-hidden bg-white flex items-center justify-center cursor-pointer
            ${
              selectedIcon === "kaeru"
                ? "border-2 border-[#4A6741]"
                : "border-2 border-transparent"
            }`}
          >
            <Image
              src="/icons/kaeru.png"
              alt="kaeru"
              width={80}
              height={80}
            />
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button className="w-2/3 bg-white rounded-full py-3 text-[#719267] font-medium shadow">
            アルバムから選択
          </button>
        </div>

        {/* 名前 */}
        <div className="mb-16">
          <p className="text-sm text-[#B0A89E] mb- font-bold">名前</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={10}
            className="w-full rounded-xl bg-white p-4 outline-none"
          />
          <p className="text-xs text-[#B0A89E] mt-1">10文字以内</p>
        </div>

        {/* 自己紹介 */}
        <div className="mb-8">
          <p className="text-sm text-[#B0A89E] mb-1 font-bold">自己紹介</p>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={100}
            rows={4}
            className="w-full rounded-xl bg-white p-4 outline-none resize-none"
          />
          <p className="text-xs text-[#B0A89E] mt-1">10文字以内</p>
        </div>
      </div>

      {/* 保存ボタン */}
      <div className="w-full max-w-md px-4 pb-8 mt-auto">
        <button
          onClick={handleSave}
          className="w-full bg-[#719267] text-white py-4 rounded-full font-semibold shadow-lg"
        >
          保存
        </button>
      </div>
    </div>
  );
}