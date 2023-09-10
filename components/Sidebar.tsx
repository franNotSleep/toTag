import { IconType } from "react-icons";
import { AiFillTag, AiFillSave, AiFillFolder, AiFillInfoCircle } from "react-icons/ai";

export default function Sidebar() {
  return (
    <div className="flex flex-col bg-primary text-white  shadow-lg left-0 top-0 h-screen w-16 m-0">
      <SidebarIcon Icon={AiFillTag} size="28" tooltip="home" />
      <div className="divider mt-0"></div>
      <div className="flex flex-col gap-4">
        <SidebarIcon Icon={AiFillSave} tooltip="save" size="20" />
        <SidebarIcon Icon={AiFillFolder} tooltip="saved" size="20" />
        <SidebarIcon Icon={AiFillInfoCircle} size="20" tooltip="how to use" />
      </div>
    </div>
  );
}

function SidebarIcon({
  Icon,
  size,
  tooltip,
}: {
  Icon: IconType;
  size: string;
  tooltip?: string;
}) {
  return (
    <button className={`sidebar-icon btn btn-circle flex tooltip tooltip-right`} data-tip={tooltip}>
      <Icon size={size} />
    </button>
  );
}
