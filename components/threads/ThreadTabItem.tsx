// components/threads/ThreadTabItem.tsx

type Props = {
  label: string; 
  active: boolean;
  onClick: () => void;
};

export default function ThreadTabItem({
  label,
  active,
  onClick,
}: Props) {
  return (
    <button 
      onClick={onClick} 
      className="flex flex-col items-center relative"
    >
      <div className="relative flex justify-center items-center w-[54px] h-[18px]">
        {active && (
          <div
            className="absolute bg-[#4A6741] rounded-full"
            style={{ width: 54, height: 18 }}
          />
        )}

        <span
          className="relative text-[11px] font-bold"
          style={{ color: active ? "#E5E3D6" : "#918A81" }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}