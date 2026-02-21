import { MediatorType } from "./mediator-type";

export type Thread = {
  id: string;
  body: string; //議題
  pairId: string | null; //pair.idと同じ
  mediatorType: MediatorType; //えらぶ間さんの型
  createdBy: string;
  resolvedA: boolean; //Aさんは解決したか
  resolvedB: boolean;
  archived: boolean; //どっちも解決したか
  createdAt: string; //作られた日時
};
