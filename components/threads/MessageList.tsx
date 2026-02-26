import Image from "next/image";
import { MessageBubble } from "./MessageBubble";
import { mockMessages } from "@/mock/message";

type Props = {threadId: string}

export function MessageList({ threadId }: Props) {
    const messages = mockMessages.filter((m) => m.threadId === threadId).sort((a, b) =>
        new Date(a.createdAt).getTime() - 
        new Date(b.createdAt).getTime()
    )
  return (
    <div className="flex-1 overflow-y-auto px-4 space-y-4 pb-24">
      <div className="flex flex-col items-center">
        <Image
          src="/group16.svg"
          width={50}
          height={50}
          alt="くま"
          className="shadow"
        />
        <MessageBubble variant="incoming">ああああ</MessageBubble>
        {/* <div className="bg-white rounded-[20px] max-w-[80%] px-4 py-3 mx-auto text-[#6B6B6B] shadow-md inline-block">
          ああああああああああああああ
        </div> */}
      </div>
      <div className="flex justify-end items-center gap-2">
        <MessageBubble variant="outgoing">
          そうだったんだね、気づかなくてごめん
        </MessageBubble>
        {/* <div className="bg-[#719267] rounded-[20px] px-4 py-3 max-w-70  text-white inline-block">
          そうだったんだね、気づかなくてごめん
        </div> */}
        <Image src="/group10.svg" width={40} height={40} alt="かえる" />
      </div>
    </div>
  );
}
