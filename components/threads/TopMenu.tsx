// components/threads/TopMenu.tsx

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopMenu() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/menu")}
      className="absolute top-[40px] right-[20px]"
    >
      <Image src="/threads/menuicon.svg" alt="menu" width={58} height={58} />
    </button>
  );
}