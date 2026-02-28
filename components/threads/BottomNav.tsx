//components/threads/BottomNav.tsx

"use client";

import { useRouter } from "next/navigation";

export default function BottomNav() {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 w-full h-[160px] pointer-events-none">
      
      {/* ホーム */}
      <button
        onClick={() => router.push("/home")}
        className="absolute left-[14%] bottom-[5px] w-[80px] h-[80px]  rounded-full pointer-events-auto"
      />

      {/* トーク */}
      <button
        onClick={() => router.push("/threads")}
        className="absolute left-1/2 -translate-x-1/2 bottom-[5px] w-[80px] h-[80px]  rounded-full pointer-events-auto"
      />

      {/* プロフィール */}
      <button
        onClick={() => router.push("/profile")}
        className="absolute right-[14%] bottom-[5px] w-[80px] h-[80px]  rounded-full pointer-events-auto"
      />
    </div>
  );
}