//ここはあいださん選択画面です
//選んだらデザインの画面になる感じで選ぶ前はチェックマークと緑の枠線は出ないように
//この子にするを押したらどんなずれに行くようにパス設定する
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SelectCard } from "@/components/select/SelectCard";
import { SelectFooter } from "@/components/select/SelectFooter";
import type { MediatorType } from "@/types/mediator-type";

export default function SelectPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<MediatorType>("plush");

  return (
    <div
      className="min-h-screen flex flex-col items-center"
      style={{
        backgroundImage: "url('/select/background.svg')",
        backgroundSize: "cover",
        backgroundPosition: "top center",
      }}
    >
      {/* Header */}
      <div className="w-full max-w-md px-6 pt-16 pb-4">
        <button
          onClick={() => router.push("/home")}
          className="flex items-center gap-3"
        >
            <Image
  src="/select/yajirusi.svg"
  alt="戻る"
  width={18}
  height={14}
/>
          <span className="text-lg font-semibold">
            あいださんを選ぶ
          </span>
        </button>
      </div>

      {/* Cards */}
      <div className="w-full max-w-md px-6 space-y-4 mt-15">
        <SelectCard
          id="plush"
          title="ぬいぐるみ"
          description="ふわっとやさしく、でもちゃんと届ける"
          image="/select/plush.svg"
          selected={selected === "plush"}
          onClick={() => setSelected("plush")}
        />

        <SelectCard
          id="plant"
          title="植物"
          description="静かに、でも根っこからちゃんと伝える"
          image="/select/plant.svg"
          selected={selected === "plant"}
          onClick={() => setSelected("plant")}
        />

        <SelectCard
          id="ojisan"
          title="おじさん"
          description="ほのぼの人生経験で、ゆるく仲介"
          image="/select/ojisan.svg"
          selected={selected === "ojisan"}
          onClick={() => setSelected("ojisan")}
        />
      </div>

      <p className="text-sm text-gray-600 mt-10 px-10 text-center">
        ふたりの間に立って、やさしく伝えてくれる子を選んでください。
      </p>

      <div className="flex-1" />

      <SelectFooter onClick={() => router.push("/threads/new")} />
    </div>
  );
}