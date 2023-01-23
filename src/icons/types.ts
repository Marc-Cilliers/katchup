import { ClockIcon } from "./ClockIcon";
import { EmptyStateIcon } from "./EmptyStateIcon";
import { SentIcon } from "./SentIcon";
import { ThumbsDownIcon } from "./ThumbsDownIcon";
import { ThumbsUpIcon } from "./ThumbsUpIcon";
import { TwitchIcon } from "./TwitchIcon";
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

export type IconName =
  | "clock"
  | "emptyState"
  | "thumbsDown"
  | "thumbsUp"
  | "twitch"
  | "sent"
  | "user"
  | "youtube";

export const Icons: Record<IconName, IconType> = {
  clock: ClockIcon,
  emptyState: EmptyStateIcon,
  thumbsDown: ThumbsDownIcon,
  thumbsUp: ThumbsUpIcon,
  twitch: TwitchIcon,
  sent: SentIcon,
  user: UserIcon,
  youtube: YoutubeIcon,
};
