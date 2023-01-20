import { ClockIcon } from "./ClockIcon";
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

export type IconName = `clock` | "youtube";

export const Icons: Record<IconName, IconType> = {
  clock: ClockIcon,
  youtube: YoutubeIcon,
};
