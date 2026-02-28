import Image from "next/image";
import { MessageBubble } from "./MessageBubble";
import { mockUsers } from "@/mock/user";
import { Message } from "@/types/message";
import { MediatorType } from "@/types/mediator-type";

const avatarSrcMap: Record<string, string> = {
  kaeru: "/group10.svg",
  hiyoko: "/group14.svg",
};

const aidasanSrcMap: Record<string, string> = {
  plush: "/group16.svg",
  plant: "/fram14.svg",
  ojisan: "/group19.svg",
};

type Props = {
  threadId: string;
  mediatorType: MediatorType;
  currentUserId: string;
  messages: Message[];
};

export function MessageList({
  threadId,
  mediatorType,
  currentUserId,
  messages,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-24 pt-[50px]">
      {messages.map((m) => {
        if (m.kind === "mediator") {
          const quoted = messages.find((x) => x.id === m.quotedMessageId);

          // 引用元が無いなら出さない（DBがまだ整ってないデータは無視）
          if (!quoted) return null;

          // 引用元が user じゃないなら出さない（変な連鎖を防ぐ）
          if (quoted.kind !== "user") return null;

          // ✅ 自分が送った user を引用してる間さんは、自分には見せない
          if (quoted.senderId === currentUserId) return null;

          // 引用元の人（A/B）
          const quotedUser = mockUsers.find((u) => u.id === quoted.senderId);
          const name = quotedUser?.displayName ?? "相手";
          return (
            <div key={m.id} className="flex flex-col items-center">
              <Image
                src={aidasanSrcMap[mediatorType]}
                width={50}
                height={50}
                alt="くま"
                className="shadow"
              />
              <MessageBubble variant="incoming">
                <div className="text-sm text-[#6B6B6B]">{name}から聞いたよ</div>

                <div className="mt-2 border-l-4 border-[#E6DDD3] pl-3 text-[#6B6B6B]">
                  「{quoted.body}」
                </div>

                <div className="mt-2 text-sm text-[#6B6B6B]">
                  あなたはどう思う？
                </div>
              </MessageBubble>
            </div>
          );
        }
        if (m.kind == "user") {
          if (m.senderId !== currentUserId) return null;
          const sender = mockUsers.find((u) => u.id === m.senderId);
          const iconSrc =
            avatarSrcMap[sender?.avatarKey ?? ""] ?? "/group10.svg";
          return (
            <div key={m.id} className="flex justify-end items-center gap-2">
              <MessageBubble variant="outgoing">{m.body}</MessageBubble>
              <Image src={iconSrc} width={40} height={40} alt="かえる" />
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
