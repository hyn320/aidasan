"use client";

import Image from "next/image";
import { useState } from "react";

type Props = { onSend: (text: string) => void };

export function MessageComposer({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    const t = text.trim();
    if (!t) return;
    onSend(t);
    setText("");
  };

  return (
    <div className="sticky bottom-0 h-20 flex items-center px-4 shadow-sm gap-3 w-full w-screen ">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="px-4 py-3 bg-[#ffffff] border border-[#E6DDD3] placeholder:text-[#B0A89E] rounded-[100px]  font-black text-[#3A3A3A] flex-1 text-sm outline-none w-full"
        placeholder="気持ちを書いてみて…"
      />
      <button
        onClick={handleSend}
        className="bg-[#719267] rounded-full w-10 h-10 flex items-center justify-center"
      >
        <Image src="/→.svg" width={20} height={20} alt="arrow" />
      </button>
    </div>
  );
}
