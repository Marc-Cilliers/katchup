import { IconProps } from "./types";

export const SentIcon = ({
  height = 24,
  width = 24,
  className = "",
  color = "#ffffff",
  testID,
}: IconProps & { isSelected?: boolean }) => {
  return (
    <svg
      id={testID}
      className={`leading-10 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 -10 42 42"
      fill="none"
    >
      <g>
        <polygon
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          points="19 31 13 19 1 13 31 1 19 31"
        ></polygon>
        <line
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          x1="13"
          x2="25"
          y1="19"
          y2="7"
        ></line>
      </g>
    </svg>
  );
};
