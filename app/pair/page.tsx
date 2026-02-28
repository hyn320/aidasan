//招待する側の画面です
//上の切り替えボタンで参加すると招待するを切り替えられるように
//参加するの画面は参加する押したらメッセージの画面に切り替わるように
//招待するの画面もボタン押したらメッセージの画面に行くように
"use client";

import { useState } from "react";
import { InviteView } from "./invite";
import { JoinView } from "./join";
import { useRouter } from "next/navigation";


export default function PairPage() {
  const [mode, setMode] = useState<"invite" | "join">("join");

  const router = useRouter();

    const Gohome = () => {
      router.push("/home");
    }

  return (

  
    <div className="min-h-screen bg-[url('/background3.png')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen px-6 pt-12">

        <button 
        onClick={Gohome}
        className="flex items-center gap-3 px-4 py-2 ">
            <img src="/Vector.png" alt="ホーム"  width={24}
  height={24}　className="w-6 h-6" />
        
        <span className="text-[17px] font-semibold">ペアになる</span>
    </button>


        {/* タブ切り替え */}
        <div className="mt-20 bg-white/70 rounded-2xl p-1 flex">
          <button
            onClick={() => setMode("invite")}
            className={`flex-1 py-2 rounded-xl text-[14px] ${
              mode === "invite"
                ? "bg-[#719267] text-white"
                : "text-gray-500"
            }`}
          >
            招待する
          </button>

          <button
            onClick={() => setMode("join")}
            className={`flex-1 py-2 rounded-xl text-[14px] ${
              mode === "join"
                ? "bg-[#719267] text-white"
                : "text-gray-500"
            }`}
          >
            参加する
          </button>
        </div>

         
        {mode === "invite" ? <InviteView /> : <JoinView />}

      </div>
    </div>
  );
}
