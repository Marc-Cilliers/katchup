import { Icon } from "@/icons/Icon";
import { IconName } from "@/icons/types";

interface MenuItemProps {
  title: string;
  href?: string;
  icon: IconName;
  disabled?: boolean;
  onClick?: () => void;
}

export const MenuItem = ({
  title,
  icon,
  disabled,
  onClick = () => {},
}: MenuItemProps) => {
  return (
    <li>
      <button
        className="disabled:hover:bg-transparent disabled:text-gray-400 flex items-center justify-start p-2 text-white gap-3 hover:bg-slate-700 rounded-lg w-full h-15 min-h-full max-h-14"
        onClick={() => onClick()}
        disabled={disabled}
      >
        <div className="w-1/4">
          <Icon name={icon} />
        </div>
        <div className="">{title}</div>
      </button>
    </li>
  );
};
