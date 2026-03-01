//ここはホームの画面です
//下のホームとトークとプロフィールはとりあえず置いといて機能は時間があったらでいいからとりあえず遷移は書かなくていい
//招待コードを入力からは参加する/招待するの画面に飛べるようにする
//ずれからは間さんを選ぶに飛べるようにする

// app/home/page.tsx

// app/home/page.tsx

"use client";
import Image from "next/image";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function HomePage() {
  const router = useRouter();

  const Goselect = () => {
    router.push("/mediator/select");
  };

  const GoPair = () => {
    router.push("/pair");
  };

  const GoHome = () => {
    router.push("/home");
  };

  const GoThreads = () => {
    router.push("/threads/page");
  };

  const GoProfile = () => {
    router.push("/profile");
  };

  const Gozure = () => {
    router.push("/threads/new");
  };

  const GoTalk = () => {
    router.push("/threads");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#E5E3D6] bg-[url(/rectangle23.svg)] bg-contain bg-no-repeat bg-top ">
      {/* スマホ枠 */}

      {/* 背景画像 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Image
          src="/images/home.png"
          alt=""
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* ここから上に重ねるUI */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "18px 18px 110px",
          paddingTop: 30,
          height: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* ヘッダー（右固定） */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <button
            onClick={Goselect}
            aria-label="menu"
            style={{
              width: 55,
              height: 55,
              borderRadius: 14,
              border: "none",
              background: "#677A92",
              display: "grid",
              placeContent: "center",
              gap: 5,
              cursor: "pointer",
            }}
          >
            <span
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                display: "block",
                borderRadius: 999,
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                display: "block",
                borderRadius: 999,
              }}
            />
            <span
              style={{
                width: 22,
                height: 2,
                background: "#fff",
                display: "block",
                borderRadius: 999,
              }}
            />
          </button>
        </div>

        {/* 吹き出し */}
        <div
          style={{
            marginTop: 90,
            marginBottom: 50,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Image
            src="/83F54C52-9D94-4EF0-9E81-EAFED4E39E18 2.svg"
            alt="くま"
            width={78}
            height={78}
          />

          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.88)",
              borderRadius: 999,
              padding: "12px 16px",
              fontSize: 15,
              lineHeight: 1.25,
              color: "#5b4a3a",
            }}
          >
            どんなに小さなことでもふたりで
            <br />
            話し合ってみようくま！
          </div>
        </div>

        {/* メインカード + 招待 */}
        <div
          style={{
            marginTop: 22,
            display: "grid",
            gap: 14,
            justifyItems: "center",
          }}
        >
          <button
            onClick={Goselect}
            style={{
              width: 320,
              height: 150,
              borderRadius: 16,
              background: "#719267",
              boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
              display: "grid",
              placeContent: "center",
              gap: 10,
              marginBottom: 20,
            }}
          >
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                display: "grid",
                placeContent: "center",
                fontSize: 32,
                color: "#4d6a47",
                lineHeight: 1,
                textAlign: "center",
                placeItems: "center",
              }}
            >
              ＋
            </div>

            {/* 「ズレ」を半文字分右へ */}
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                textAlign: "center",
                placeItems: "center",
              }}
            >
              ズレ
            </div>
          </button>

          <button
            onClick={GoPair}
            style={{
              width: 320,
              height: 44,
              borderRadius: 999,
              background: "#719267",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            招待コードを入力
          </button>
        </div>

        {/* 通知 */}
        <img
          src="/images/Group 23.png"
          alt="通知"
          width={100}
          height={100}
          style={{ marginTop: 22 }}
        />

        {/* ✅ 下メニュー（背景は画像の半円 / 中身だけ重ねる） */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 9, // ← ここで半円上の位置を調整
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-end",
            padding: "0 24px",
            color: "#fff",
            fontWeight: 700,
            textShadow: "0 1px 2px rgba(0,0,0,0.25)",
            zIndex: 2,
          }}
        >
          <button onClick={GoHome} style={{ transform: "translateY(173px)" }}>
            <img
              src="/icons/ホームアイコン.png"
              width={65}
              height={65}
              alt="ホーム"
            />
          </button>
          <button onClick={GoTalk} style={{ transform: "translateY(177px)" }}>
            <img
              src="/icons/トークアイコン.png"
              width={54}
              height={54}
              alt="トーク"
            />
          </button>
          <button
            onClick={GoProfile}
            style={{ transform: "translateY(160px)" }}
          >
            <img
              src="/icons/plofile.png"
              width={82}
              height={82}
              alt="プロフィール"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
