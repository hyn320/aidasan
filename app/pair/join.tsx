import { useMemo, useState } from "react";
import { mockPairs } from "@/mock/pairs";
import type { Pair } from "@/types/pair";

export function JoinView() {//参加する側の画面

  const [pairs, setPairs] = useState<Pair[]>(mockPairs);//ペアのデータを書き換える
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const currentUserId = "uB";
  const normalizedCode = useMemo(() => code.trim().toUpperCase(), [code]);
//入力を大文字化するのと空白を作らせないようにするためのコードらしい
  //.trim()は文字列の両端から空白を削除するメソッドで、toUpperCase()は文字列をすべて大文字に変換するメソッド
  //useMemoは、特定の値が変更(この場合.trimや.toUpper)されたときにのみ関数を再評価（記憶）するため

  const onJoin = () => {//参加ボタンを押したときの処理
    setError(null);//参加ボタンを押したときに前のエラー表示を消す


    if (!normalizedCode) {
      setError("招待コードを入力してください");
      return;
    }

    const target = pairs.find((p) => p.inviteCode === normalizedCode);
    //ペアのリストの中から招待コードが一致するペアを探し，taregtに代入するコード
    //taget.userAIdは招待コードを作った人のユーザID

    if (!target) {
      setError("招待コードが見つかりません");
      return;
    }

    if (target.userBId !== null) {
      setError("すでにペアになっているルームです");
      return;//userBIdがnullでない場合はすでにペアが成立している
    }

    if (target.userAId === currentUserId) {
      setError("自分の招待コードには参加できません");
      return;
    }

    setPairs((prev) =>//prevは更新前のペアのリスト．mapでペア配列をひとつずつ作り直す
      prev.map((p) =>
        p.id === target.id ? { ...p, userBId: currentUserId } : p
      )
    );//ｐはペアの一つ一つを表す変数．
  };

  return (
    <div className="mt-7">
      <p className="text-[13px] text-[#8A8278] mb-6 text-center">
        相手から受け取った招待コードを入力してください。
      </p>

      <p className="text-[12px] text-[#8A8278] mb-3">認証コード</p>

      <input
      //ユーザーが招待コードを入力
        value={code}
        onChange={(e) => setCode(e.target.value)}//ユーザーが1文字入力するたびに、code を更新するユーザーが「M」を打つe.target.value が "M" になるsetCode("M")state更新画面再描画入力欄に "M" が表示
        placeholder="MA-0000"//ヒント
        className="w-full rounded-2xl bg-white/80 px-4 py-4 text-center text-lg tracking-widest"
      />

      {error && <p className="text-[#785151] mt-2">{error}</p>}

      <button
        onClick={onJoin}
        className="mt-6 w-full rounded-full bg-[#719267] text-white py-4 text-[13px]"
      >
        参加する
      </button>
    </div>
  );
}