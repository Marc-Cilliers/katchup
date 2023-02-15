import { ClockIcon } from "./ClockIcon";
import { EmptyStateIcon } from "./EmptyStateIcon";
import { EyeIcon } from "./EyeIcon";
import { LogoutIcon } from "./LogoutIcon";
import { SentIcon } from "./SentIcon";
import { ThumbsDownIcon } from "./ThumbsDownIcon";
import { ThumbsUpIcon } from "./ThumbsUpIcon";
import { TwitchIcon } from "./TwitchIcon";
import { TwitchLogoIcon } from "./TwitchLogoIcon";
import { TwitterIcon } from "./TwitterIcon";
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
  | "eye"
  | "logout"
  | "sent"
  | "thumbsDown"
  | "thumbsUp"
  | "twitch"
  | "twitchLogo"
  | "twitterLogo"
  | "user"
  | "youtube";

export const Icons: Record<IconName, IconType> = {
  clock: ClockIcon,
  emptyState: EmptyStateIcon,
  eye: EyeIcon,
  logout: LogoutIcon,
  sent: SentIcon,
  thumbsDown: ThumbsDownIcon,
  thumbsUp: ThumbsUpIcon,
  twitch: TwitchIcon,
  twitchLogo: TwitchLogoIcon,
  twitterLogo: TwitterIcon,
  user: UserIcon,
  youtube: YoutubeIcon,
};
