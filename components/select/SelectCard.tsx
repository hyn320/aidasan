"use client";

import Image from "next/image";
import type { MediatorType } from "@/types/mediator-type";

type Props = {
  id: MediatorType;
  title: string;
  description: string;
  image: string;
  selected: boolean;
  onClick: () => void;
};

export function SelectCard({
  title,
  description,
  image,
  selected,
  onClick,
}: Props) {
  return (
    <div
      onClick={onClick}
      className={`
        flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition
        ${
          selected
            ? "border-2 border-[#5E7D57] bg-[#EEF4EA]"
            : "bg-white border border-gray-200"
        }
      `}
    >
      <div className="w-14 h-14 relative">
        <Image src={image} alt={title} fill className="object-contain" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      {selected && (
        <div className="w-6 h-6 bg-[#5E7D57] rounded-full flex items-center justify-center text-white text-sm">
          ✓
        </div>
      )}
    </div>
  );
}