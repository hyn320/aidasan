"use client";

type Props = {
  onClick: () => void;
};

export function SelectFooter({ onClick }: Props) {
  return (
    <div className="w-full flex justify-center pb-10">
      <button
        onClick={onClick}
        className="
          w-[342px]
          h-[57px]
          rounded-[100px]
          bg-[#719267]
          text-white
          text-[16px]
          font-semibold
          shadow-md
        "
      >
        この子にする
      </button>
    </div>
  );
}