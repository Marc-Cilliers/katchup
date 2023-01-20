import { IconProps } from "./types";

export const ClockIcon = ({
  height = 24,
  width = 24,
  className,
  color = "#ffffff",
  testID,
}: IconProps & { isSelected?: boolean }) => {
  return (
    <svg
      id={testID}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 14L12 12V7M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z"
        strokeWidth={1}
        strokeLinejoin="round"
        strokeLinecap="round"
        stroke={color}
      />
    </svg>
  );
};
