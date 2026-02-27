
import { useRouter } from "next/navigation";


export function InviteView() {

  const router = useRouter();

  return (
    <div className="mt-6 bg-white/80 rounded-3xl p-6 text-center relative">
      <p className="text-sm text-[#8A8278] mt-1">招待コード</p>
      <p className="text-3xl font-bold tracking-widest mt-5">MA-4729</p>
    
      <button className="mt-6 px-5 py-1 bg-white rounded-full shadow">
        コピーする
      </button>

    <p className="absolute -bottom-9 w-4/5 left-1/2 -translate-x-1/2 text-[10px] text-[#8A8278] mt-6">LINEやメッセージで相手に共有しよう</p>
      <button onClick={() => router.push("/threads/page")} className="absolute left-1/2 -bottom-25 -translate-x-1/2 w-5/5 rounded-full bg-[#719267] text-white py-4 text-[13px]">
        トークルームをつくる
      </button>
    </div>
  );
}