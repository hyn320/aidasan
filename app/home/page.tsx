//ここはホームの画面です
//下のホームとトークとプロフィールはとりあえず置いといて機能は時間があったらでいいからとりあえず遷移は書かなくていい
//招待コードを入力からは参加する/招待するの画面に飛べるようにする
//ずれからは間さんを選ぶに飛べるようにする

// app/home/page.tsx

// app/home/page.tsx
import Image from "next/image";
import React from "react";

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        display: "grid",
        placeItems: "center",
        padding: 24,
      }}
    >
      {/* スマホ枠 */}
      <div
        style={{
          position: "relative",
          width: 390,
          height: 844,
          overflow: "hidden",
          borderRadius: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          background: "#e7e3d8",
          fontFamily: "sans-serif",
        }}
      >
        {/* 背景画像 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
          }}
        >
          <Image src="/images/home.png" alt="" fill priority style={{ objectFit: "cover" }} />
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
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-start" }}>
            <button
              aria-label="menu"
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                border: "none",
                background: "#5f738f",
                display: "grid",
                placeContent: "center",
                gap: 5,
                cursor: "pointer",
              }}
            >
              <span style={{ width: 22, height: 2, background: "#fff", display: "block", borderRadius: 999 }} />
              <span style={{ width: 22, height: 2, background: "#fff", display: "block", borderRadius: 999 }} />
              <span style={{ width: 22, height: 2, background: "#fff", display: "block", borderRadius: 999 }} />
            </button>
          </div>

          {/* 吹き出し */}
          <div style={{ marginTop: 90, display: "flex", alignItems: "center", gap: 12 }}>
            <div
  style={{
    width: 56,
    height: 56,
    borderRadius: "50%",
    overflow: "hidden", 
    background: "#fff",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    overflow: "hidden",          // ← 丸く切り抜く
    display: "grid",
    placeItems: "center",
  }}
>
  <Image
    src="/images/kuma.png"
    alt="くま"
    width={56}
    height={56}
    style={{
      objectFit: "contain",
      transform: "scale(3.3) translateY(-3px)translateX(-1px)",
    }}
  />
</div>
            <div
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.88)",
                borderRadius: 999,
                padding: "12px 16px",
                fontSize: 13,
                lineHeight: 1.25,
                color: "#5b4a3a",
              }}
            >
              どんなに小さなことでもふたりで
              <br />
              話し合ってみよう！
            </div>
          </div>

          {/* メインカード + 招待 */}
          <div style={{ marginTop: 22, display: "grid", gap: 14, justifyItems: "center" }}>
            <button
              style={{
                width: 320,
                height: 150,
                borderRadius: 16,
                background: "#6c8a66",
                boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
                display: "grid",
                placeContent: "center",
                gap: 10,
              }}
            >
              <button
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
                }}
              >
                ＋
              </button>

              {/* 「ズレ」を半文字分右へ */}
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                ズレ
              </div>
            </button>

            <button
              style={{
                width: 320,
                height: 44,
                borderRadius: 999,
                border: "none",
                background: "#6c8a66",
                color: "#fff",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              招待コードを入力
            </button>
          </div>

          {/* 通知 */}
          <div style={{ marginTop: 32, color: "rgba(0,0,0,0.6)", fontWeight: 700 }}>
            通知 <span style={{ opacity: 0.7 }}>🔔</span>
          </div>

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
            <NavItem label="ホーム" icon={<HomeIcon />} />
            <NavItem label="トーク" icon={<ChatIcon />} />
            <NavItem label="プロフィール" icon={<UserIcon />} />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div
      style={{
        width: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap:0, // アイコンと文字の距離
      }}
    >
      <div style={{ height: 54, display: "grid", placeItems: "center" }}>{icon}</div>
      <div
        style={{
          fontSize: 14,
          lineHeight: 1,
          transform: "translateY(4px)", // 文字だけちょい下げ
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path d="M10 30 L32 12 L54 30" stroke="white" strokeWidth="4" strokeLinejoin="round" />
      <path d="M18 28 V52 H46 V28" stroke="white" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <path
        d="M18 18 H46 C52 18 56 22 56 28 V36 C56 42 52 46 46 46 H30 L22 52 V46 H18 C12 46 8 42 8 36 V28 C8 22 12 18 18 18 Z"
        stroke="white"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="54" height="54" viewBox="0 0 64 64" fill="none" aria-hidden="true">
      <circle cx="32" cy="22" r="10" stroke="white" strokeWidth="4" />
      <path d="M14 54 C16 42 48 42 50 54" stroke="white" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}