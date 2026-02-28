// components/threads/ThreadsNavTabs.tsx

// components/threads/ThreadsNavTabs.tsx

import NumberBox from "./NumberBox";
import ThreadTabItem from "./ThreadTabItem";

type Props = {
  activeTab: "all" | "ongoing" | "resolved";
  onChange: (tab: "all" | "ongoing" | "resolved") => void;
  counts: { all: number; ongoing: number; resolved: number };
};

export default function ThreadsNavTabs({
  activeTab,
  onChange,
  counts,
}: Props) {
  return (
    <div className="w-full flex flex-col items-center">
      
      {/* 上：数字枠 */}
<div className="flex gap-[28px] justify-center w-full">
  <NumberBox
    count={counts.all}
    color="#F2C4B0"
    icon="All.svg"
    iconWidth={26}
    iconHeight={28}
  />

  <NumberBox
    count={counts.ongoing}
    color="#B0A89E"
    icon="Ongoing.svg"
    iconWidth={47}
    iconHeight={26}
  />

  <NumberBox
    count={counts.resolved}
    color="#FFF3E5"
    icon="Resolved.svg"
    iconWidth={46}
    iconHeight={26}
  />
</div>

      {/* 下：日本語タブ */}
      <div className="flex gap-[13px] mt-8 w-full justify-start pl-7">
        <ThreadTabItem
          label="すべて"
          active={activeTab === "all"}
          onClick={() => onChange("all")}
        />
        <ThreadTabItem
          label="進行中"
          active={activeTab === "ongoing"}
          onClick={() => onChange("ongoing")}
        />
        <ThreadTabItem
          label="解決済"
          active={activeTab === "resolved"}
          onClick={() => onChange("resolved")}
        />
      </div>
    </div>
  );
}