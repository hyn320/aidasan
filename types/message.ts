export type Message = {
  id: string;
  threadId: string; //どのずれか
  kind: "user" | "mediator"; //ユーザーが話しているのか間さんが仲介しているのか
  senderId: string | null; //誰が送ったか
  body: string; //表示するテキスト
  createdAt: string; //書かれた日時
};
