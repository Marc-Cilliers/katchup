import { User } from "@prisma/client";
import Image from "next/image";
import { getIcon } from "./icons";

export type Badges = Record<string, string>[];

interface BadgeBuilderProps {
  badges: Badges;
  user: User;
}

export const BadgeBuilder = ({ badges, user }: BadgeBuilderProps) => {
  return (
    <div className="flex flex-row gap-1">
      {badges.map((badge) => {
        const [key, value] = Object.entries(badge)[0];
        const icon = getIcon[key]?.(value, user.badges);
        if (!icon) return null;

        return (
          <Image
            key={key}
            className="flex w-4 h-4"
            alt={key}
            src={icon}
            width={100}
            height={5}
          />
        );
      })}
    </div>
  );
};
