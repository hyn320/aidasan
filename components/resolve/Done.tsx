// components/Done.tsx

import Image from "next/image";
import Link from "next/link";

export default function Done() {
  return (
    <div className="mt-8 mx-6 p-6 bg-white rounded-2xl shadow text-center">
      <Image
        src="/kurakka-.png"
        width={40}
        height={40}
        alt="お祝い"
        className="mx-auto mb-3"
      />

      <p className="font-bold mb-2 text-base">
        ふたりの「解決」が揃ったよ
      </p>

      <p className="text-xs text-gray-500 mb-6 leading-relaxed">
        お疲れさまでした。
        <br />
        このやり取りはアーカイブに保存されます。
      </p>

      <Link
        href="/home"
        className="block bg-[#719267] text-white text-center py-3 rounded-full transition hover:opacity-90"
      >
        ホームに戻る
      </Link>
    </div>
  );
}