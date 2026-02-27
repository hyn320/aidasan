// components/resolve/MediatorDecoration.tsx
import Image from "next/image";
import { MediatorType } from "@/types/mediator-type";

export const MediatorDecoration = ({
  mediatorType,
}: {
  mediatorType: MediatorType;
}) => {
  const mediatorImg =
    mediatorType === "plush"
      ? "/bear.svg"
      : mediatorType === "plant"
      ? "/plant.svg"
      : "/ojisan.svg";

  return (
    <div className="flex justify-center mt-6">
      <img
        src={mediatorImg}
        alt=""
        className="w-[78px] h-[78px]"
      />
    </div>
  );
};