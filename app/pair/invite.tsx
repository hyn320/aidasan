"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/* 端末ユーザーID */
function getLocalUserId() {
  const key = "local_user_id";
  const stored = localStorage.getItem(key);
  if (stored) return stored;
  const newId = crypto.randomUUID();
  localStorage.setItem(key, newId);
  return newId;
}


const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";


function generateInviteCodeRaw() {
  let code = "";
  for (let i = 0; i < 3; i++) code += LETTERS[Math.floor(Math.random() * 26)];
  for (let i = 0; i < 3; i++) code += NUMBERS[Math.floor(Math.random() * 10)];
  return code;
}

// ABC123 -> ABC-123
function formatInviteDisplay(raw: string) {
  const s = raw.replace(/[^A-Z0-9]/g, "");
  if (s.length !== 6) return s;
  return `${s.slice(0, 3)}-${s.slice(3)}`;
}

export function InviteView() {



  async function ensureUserExists(userId: string) {
  const { data } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .maybeSingle();

  if (!data) {
    const { error } = await supabase.from("users").insert({
      id: userId,
      displayName: "ゲストユーザー",
      avatarKey: "default",
      bio: ""
    });

    if (error) {
      console.log("user insert error:", error);
      throw new Error("ユーザー作成失敗");
    }
  }
}

  const router = useRouter();


  const [inviteCode, setInviteCode] = useState(""); // DBは ABC123
  const [threadId, setThreadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const displayCode = useMemo(() => formatInviteDisplay(inviteCode), [inviteCode]);

  const createInvite = async () => {

    const currentUserId = getLocalUserId();

await ensureUserExists(currentUserId);
    setError(null);
    setLoading(true);

    

    // 重複したら作り直す
    for (let i = 0; i < 10; i++) {
      const code = generateInviteCodeRaw();

      // ① threads を先に作る（/threads/[threadId] 用）
      const { data: thread, error: threadErr } = await supabase
        .from("threads")
        .insert({
          body:"",
          mediatorType:"plant",
        })
        .select("id")
        .single();

      if (threadErr || !thread) {
        setLoading(false);
        setError(threadErr?.message ?? "threadsの作成に失敗しました");
        return;
      }

      // ② pairs に保存
      const { error: insErr } = await supabase.from("pairs").insert({
        inviteCode: code,
        userAId: currentUserId,
        userBId: null,
        
      });

      if (!insErr) {
        setInviteCode(code);
        setThreadId(thread.id);
        setLoading(false);
        return;
      }

      console.log("pairs insert error:", insErr);
    }

    setLoading(false);
    setError("招待コードの生成に失敗しました（再試行してください）");

    
  };

  // 画面表示時に自動発行
  useEffect(() => {
    void createInvite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  const goThread = () => {
    if (!threadId) {
      setError("トークルームがまだ作成されていません");
      return;
    }
    router.push(`/threads/${threadId}`);
  };

  return (
    <div className="mt-6 bg-white/80 rounded-3xl p-6 text-center relative">
      <p className="text-sm text-[#8A8278] mt-1">招待コード</p>

      <p className="text-3xl font-bold tracking-widest mt-5">
        {loading ? "..." : displayCode || "------"}
      </p>

    

      <button
        onClick={createInvite}
        disabled={loading}
        className="mt-3 text-[12px] text-[#8A8278] underline disabled:opacity-50"
      >
        招待コードを再発行
      </button>

      {error && <p className="mt-3 text-[#785151] text-[12px]">{error}</p>}

      <p className="absolute -bottom-9 w-4/5 left-1/2 -translate-x-1/2 text-[10px] text-[#8A8278]">
        LINEやメッセージで相手に共有しよう
      </p>

      <button
        onClick={goThread}
        className="absolute left-1/2 -bottom-24 -translate-x-1/2 w-4/5 rounded-full bg-[#719267] text-white py-4 text-[13px]"
      >
        トークルームをつくる
      </button>
    </div>
  );
}