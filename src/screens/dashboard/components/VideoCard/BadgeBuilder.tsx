import { Badges } from "@/utils/hooks/useVideos";
import Image from "next/image";

const ICONS: Record<string, string> = {
  broadcaster:
    "https://static-cdn.jtvnw.net/badges/v1/5527c58c-fb7d-422d-b71b-f309dcb85cc1/3",
  premium:
    "https://static-cdn.jtvnw.net/badges/v1/bbbe0db0-a598-423e-86d0-f9fb98ca1933/3",
  turbo:
    "https://static-cdn.jtvnw.net/badges/v1/bd444ec6-8f34-4bf9-91f4-af1e3428d80f/3",
  parter:
    "https://static-cdn.jtvnw.net/badges/v1/d12a2e27-16f6-41d0-ab77-b780518f00a3/3",
  "bits-leader-2":
    "https://static-cdn.jtvnw.net/badges/v1/f04baac7-9141-4456-a0e7-6301bcc34138/3",
};

interface BadgeBuilderProps {
  badges: Badges;
}

export const BadgeBuilder = ({ badges }: BadgeBuilderProps) => {
  return (
    <div className="flex flex-row gap-1">
      {Object.keys(badges).map((badge) => {
        if (badge === "bits-leader") {
          return <BitsLeaderBadge key={badge} value={badges[badge]} />;
        }

        if (!ICONS[badge]) return;
        return (
          <Image
            key={badge}
            className="flex w-4 h-4"
            alt={badge}
            src={ICONS[badge]}
            width={100}
            height={5}
          />
        );
      })}
    </div>
  );
};

interface BitsLeaderBadgeProps {
  value: string;
}

const BitsLeaderBadge = ({ value }: BitsLeaderBadgeProps) => {
  const badge = ICONS[`bits-leader-${value}`];

  return (
    <Image
      key={badge}
      className="flex w-4 h-4"
      alt={badge}
      src={ICONS[badge]}
      width={100}
      height={5}
    />
  );
};
