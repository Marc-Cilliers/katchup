import { IconProps } from "./types";

export const YoutubeIcon = ({
  height = 32,
  width = 32,
  className,
  testID,
}: IconProps & { isSelected?: boolean }) => {
  return (
    <svg
      id={testID}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        fill="#FF0000"
        d="M31.4,8.6c-0.2-1.6-1.6-3-3.3-3.1c-9.8-0.7-14.6-0.7-24.3,0C2.2,5.6,0.8,7,0.6,8.6c-0.8,5.9-0.8,8.9,0,14.8  c0.2,1.6,1.7,3,3.3,3.1C8.7,26.8,12.4,27,16,27s7.3-0.2,12.2-0.5c1.6-0.1,3-1.5,3.3-3.1C32.2,17.5,32.2,14.5,31.4,8.6z"
      />
      <path
        fill="#FFFFFF"
        className="st0"
        d="M21.1,17.7l-6,4C14.8,21.9,14.4,22,14,22c-0.3,0-0.7-0.1-0.9-0.2c-0.7-0.4-1.1-1-1.1-1.8V12  c0-0.8,0.4-1.4,1.1-1.8c0.7-0.4,1.4-0.3,2.1,0.1l6,4c0.6,0.4,0.9,1,0.9,1.7S21.7,17.3,21.1,17.7z"
      />
    </svg>
  );
};
