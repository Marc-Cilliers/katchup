import { ClockIcon } from "./ClockIcon";
import { EmptyStateIcon } from "./EmptyStateIcon";
import { SentIcon } from "./SentIcon";
import { UserIcon } from "./UserIcon";
import { YoutubeIcon } from "./YoutubeIcon";

export type IconType = (props: IconProps) => JSX.Element;

export type IconProps = {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
  pathFill?: string;
  viewBox?: string;
  testID?: string;
};

export type IconName = "clock" | "emptyState" | "sent" | "user" | "youtube";

export const Icons: Record<IconName, IconType> = {
  clock: ClockIcon,
  emptyState: EmptyStateIcon,
  sent: SentIcon,
  user: UserIcon,
  youtube: YoutubeIcon,
};
