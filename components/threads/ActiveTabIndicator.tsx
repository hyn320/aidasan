type Props = {
  label: string;
};

export default function ActiveTabIndicator({ label }: Props) {
  return (
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[61px] h-[21px] bg-[#0FA958] rounded-full flex items-center justify-center text-white text-[12px] font-[400]">
      {label}
    </div>
  );
}