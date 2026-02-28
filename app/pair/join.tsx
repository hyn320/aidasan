"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/* ===== 端末ユーザーID（inviteと同じ実装）===== */
function getLocalUserId() {
  const key = "local_user_id";
  const stored = localStorage.getItem(key);
  if (stored) return stored;
  const newId = crypto.randomUUID();
  localStorage.setItem(key, newId);
  return newId;
}

/* ===== 入力正規化・表示整形 ===== */
// ABC-123 / abc123 / a b c - 1 2 3 → ABC123
function normalizeInviteInput(raw: string) {
  return raw.replace(/\s/g, "").toUpperCase().replace(/[^A-Z0-9]/g, "");
}



export function JoinView() {
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

  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const normalized = useMemo(() => normalizeInviteInput(code), [code]); // ABC123
  

  const onJoin = async () => {

    const currentUserId = getLocalUserId();
await ensureUserExists(currentUserId);

    setError(null);

  
    if (!normalized) {
      setError("招待コードを入力してください");
      return;
    }

    if (!/^[A-Z]{3}\d{3}$/.test(normalized)) {
      setError("招待コードは「ABC123」の形式です");
      return;
    }

    // ① pairs から探す
    const { data: pair, error: findErr } = await supabase
      .from("pairs")
      .select("id, inviteCode, userAId, userBId, threadId")
      .eq("inviteCode", normalized)
      .single();

    if (findErr || !pair) {
      setError("招待コードが見つかりません");
      return;
    }

    if (pair.userBId !== null) {
      setError("すでにペアになっているルームです");
      return;
    }

    if (pair.userAId === currentUserId) {
      setError("自分の招待コードには参加できません");
      return;
    }

    // ② 参加者を登録
    const { error: updErr } = await supabase
      .from("pairs")
      .update({ userBId: currentUserId })
      .eq("id", pair.id);

    if (updErr) {
      setError(updErr.message);
      return;
    }

    // ③ スレッドへ
    if (pair.threadId) {
      router.push(`/threads/${pair.threadId}`);
      return;
    }

    setError("トークルーム情報がありません");
  };

  return (
    <div className="mt-7">
      <p className="text-[13px] text-[#8A8278] mb-6 text-center">
        相手から受け取った招待コードを入力してください。
      </p>

      <p className="text-[12px] text-[#8A8278] mb-3">認証コード</p>

      <input
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="ABC123"
        className="w-full rounded-2xl bg-white/80 px-4 py-4 text-center text-lg tracking-widest"
        autoCapitalize="characters"
        autoCorrect="off"
        spellCheck={false}
      />

      {error && <p className="text-[#785151] mt-2">{error}</p>}

      <button
        onClick={onJoin}
        className="mt-6 w-full rounded-full bg-[#719267] text-white py-4 text-[16px] font-semibold"
      >
        参加する
      </button>
    </div>
  );
}