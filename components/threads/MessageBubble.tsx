type Props = {
  variant: "incoming" | "outgoing";
  children: React.ReactNode;
};

export function MessageBubble({ children, variant }: Props) {
  const incoming =
    "bg-white rounded-[20px] max-w-[80%] px-4 py-3 mx-auto text-[#6B6B6B] shadow-md inline-block";

  const outgoing =
    "bg-[#719267] rounded-[20px] px-4 py-3 max-w-70  text-white inline-block";

  const className = variant === "incoming" ? `${incoming}` : `${outgoing}`;

  return <div className={className}>{children}</div>;
}
