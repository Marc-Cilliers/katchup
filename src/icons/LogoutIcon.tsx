import { IconProps } from "./types";

export const LogoutIcon = ({
  height = 20,
  width = 20,
  className,
  color = "#FFFFFF",
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
      fill={color}
    >
      <path d="M7.707,8.707,5.414,11H17a1,1,0,0,1,0,2H5.414l2.293,2.293a1,1,0,1,1-1.414,1.414l-4-4a1,1,0,0,1,0-1.414l4-4A1,1,0,1,1,7.707,8.707ZM21,1H13a1,1,0,0,0,0,2h7V21H13a1,1,0,0,0,0,2h8a1,1,0,0,0,1-1V2A1,1,0,0,0,21,1Z" />
    </svg>
  );
};
