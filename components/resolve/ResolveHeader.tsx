// components/resolve/ResolveHeader.tsx
"use client";

export const ResolveHeader = ({ title }: { title: string }) => {
  return (
    <div className="px-6 pt-6 flex items-center gap-3">
      <button onClick={() => history.back()}>
        <img src="/yajirusi.svg" alt="戻る" className="w-3 h-3" />
      </button>
      <h1 className="font-bold">{title}</h1>
    </div>
  );
};