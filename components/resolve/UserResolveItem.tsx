// components/resolve/UserResolveItem.tsx
"use client";

import Image from "next/image";

type Props = {
  icon: string;
  name: string;
  status: "pending" | "done";
  onClick?: () => void; // ← useState用
  isMe?: boolean;       // ← 自分判定
};

export const UserResolveItem = ({
  icon,
  name,
  status,
  onClick,
  isMe,
}: Props) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">
      
      {/* 左側（アイコン + 名前） */}
      <div className="flex items-center gap-3">
        <Image src={icon} width={40} height={40} alt="" />
        <span className="font-bold">{name}</span>
      </div>

      {/* 右側（ボタン / 表示） */}
      {isMe ? (
        // 🔥 自分の場合は常にbutton（押し直し可能）
        <button
          onClick={onClick}
          className={`px-4 py-2 rounded-full text-sm border transition-all duration-200
            ${
              status === "done"
                ? "bg-[#4A6741] text-white border-[#4A6741]"
                : "bg-white text-black border-gray-300"
            }`}
        >
          解決した{" "}
          {/* ✅ 常に✓分のスペース確保 */}
          <span className="inline-block w-4 text-center">
            {status === "done" ? "✓" : ""}
          </span>
        </button>
      ) : status === "done" ? (
        // 相手が解決済み
        <span className="px-4 py-2 bg-[#4A6741] text-white rounded-full text-sm border border-[#4A6741]">
          解決した{" "}
          <span className="inline-block w-4 text-center">✓</span>
        </span>
      ) : (
        // 相手がまだ
        <span className="px-4 py-2 text-gray-400 text-sm border border-transparent rounded-full">
          まだ考え中…
        </span>
      )}
    </div>
  );
};
/*"use client";

import Image from "next/image";

type Props = {
  icon: string;
  name: string;
  status: "pending" | "done";
  actionHref?: string;
  disabled?: boolean;
};

export const UserResolveItem = ({
  icon,
  name,
  status,
  actionHref,
  disabled,
}: Props) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow">
      <div className="flex items-center gap-3">
        <Image src={icon} width={40} height={40} alt="" />
        <span className="font-bold">{name}</span>
      </div>

      {status === "done" ? (
        <span className="px-4 py-2 bg-[#4A6741] text-white rounded-full text-sm">
          解決した ✓
        </span>
      ) : disabled ? (
        <span className="text-gray-400 text-sm">まだ考え中…</span>
      ) : (
        <a
          href={actionHref}
          className="px-4 py-2 bg-white border border-gray-300 rounded-full text-sm"
        >
          解決した
        </a>
      )}
    </div>
  );
};*/