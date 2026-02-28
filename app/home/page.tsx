//ここはホームの画面です
//下のホームとトークとプロフィールはとりあえず置いといて機能は時間があったらでいいからとりあえず遷移は書かなくていい
//招待コードを入力からは参加する/招待するの画面に飛べるようにする
//ずれからは間さんを選ぶに飛べるようにする

// app/home/page.tsx

// app/home/page.tsx
import Image from "next/image";
import React from "react";
import Link from "next/link";


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
          <div style={{ marginTop: 22, display: "grid", gap: 14, justifyItems: "center"  }}>
            <Link href="/mediator/select" 
              style={{
                width: 320,
                height: 150,
                borderRadius: 16,
                background: "#6c8a66",
                boxShadow: "0 10px 18px rgba(0,0,0,0.18)",
                display: "grid",
                placeContent: "center",
                gap: 10,
              }}>
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
            
            
            </Link>
             

             

           <Link href="/pair"
              style={{
              width: 320,
              height: 44,
              borderRadius: 999,
              background: "#6c8a66",
              color: "#fff",
              fontWeight: 700,
              cursor: "pointer",
              display: "grid",
              placeItems: "center",
            }}
          >
            あいださんを選ぶ
          </Link>
          </div>

          {/* 通知 */}
          <img src="/images/Group 23.png" alt="通知" width={100} height={100} style={{ marginTop: 22 }} />
            
        

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
            <Link  href="/home"  style={{ transform: "translateY(24px)" }}><img src="/icons/ホームアイコン.png" width={65} height={65} alt="ホーム" /></Link>
            <Link href="/threads/new"style={{ transform: "translateY(27px)" }}><img src="/icons/トークアイコン.png" width={54} height={54} alt="トーク" /></Link>
            <Link href="/profile"style={{ transform: "translateY(10px)" }}><img src="/icons/plofile.png" width={82} height={82} alt="プロフィール" /></Link>
          </div>
        </div>
      </div>
    </div>
  );
}



