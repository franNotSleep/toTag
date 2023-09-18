import Link from "next/link";
import { IconType } from "react-icons";

interface CustomIconButtonProps {
 Icon: IconType;
  size: string;
  tooltip?: string;
  href?: string;
  handleClick?(): void;
  styles?: string;
}

export default function CustomIconButton({
  Icon,
  size,
  tooltip,
  href = "#",
  handleClick = undefined,
  styles,
}: CustomIconButtonProps) {
  return (
    <Link href={href}>
      <button
        onClick={handleClick}
        className={`sidebar-btn ${styles}`}
        data-tip={tooltip}
      >
        <Icon size={size} />
      </button>
    </Link>
  );
}
