import { IconProps } from "./types";

export const TwitchLogoIcon = ({
  height = 30,
  width = 30,
  className,
  color = "#9146FF",
  testID,
}: IconProps & { isSelected?: boolean }) => {
  return (
    <svg
      id={testID}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <path d="M13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z" stroke={color} />

      <g fill={color}>
        <path d="M4.5 1L2 3.5v9h3V15l2.5-2.5h2L14 8V1H4.5zM13 7.5l-2 2H9l-1.75 1.75V9.5H5V2h8v5.5z" />
        <path d="M11.5 3.75h-1v3h1v-3zM8.75 3.75h-1v3h1v-3z" />
      </g>
    </svg>
  );
};
