// components/threads/NumberBox.tsx

"use client";

export default function NumberBox({
  count,
  color,
  icon,
  iconWidth,
  iconHeight,
}: {
  count: number;
  color: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}) {
  return (
    <div
      className="rounded-[20px] flex flex-col items-center justify-center"
      style={{
        width: "85px",
        height: "110px",
        backgroundColor: color,
      }}
    >
      {/* 上：アイコン */}
      <img
        src={`/threads/${icon}`}
        alt="icon"
        style={{
          width: `${iconWidth}px`,
          height: `${iconHeight}px`,
        }}
        className="mb-2"
      />

      {/* 下：数字 */}
      <span className="text-[20px] font-(--font-yusei) text-[#55392D]">
        {count}
      </span>
    </div>
  );
}