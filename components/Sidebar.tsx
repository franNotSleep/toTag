"use client";

import Image from "next/image";
import Link from "next/link";
import { IconType } from "react-icons";
import { AiFillSave, AiFillFolder, AiFillInfoCircle } from "react-icons/ai";
import { BsSunFill, BsFillMoonFill } from "react-icons/bs";

export default function Sidebar() {
  const handleOpenModal = () => {
    (document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
  };

  return (
    <div className="flex flex-col text-white bg-primary shadow-xl left-0 top-0 h-screen w-24 m-0">
      <Link href={"/"} className="mx-auto">
        <button
          className="scale-transition btn p-1 mt-2 btn-circle mx-auto tooltip tooltip-right z-50"
          data-tip="Home"
        >
          <Image height={100} width={100} alt="home button" src="/tag.svg" />
        </button>
      </Link>
      <div className="divider"></div>
      <div className="flex flex-col gap-4">
        <SidebarIcon
          Icon={AiFillSave}
          tooltip="save"
          size="20"
          handleClick={handleOpenModal}
        />
        <SidebarIcon
          Icon={AiFillFolder}
          tooltip="files"
          href="/files"
          size="20"
        />
        <SidebarIcon Icon={AiFillInfoCircle} size="20" tooltip="how to use" />
      </div>
    </div>
  );
}

function SidebarIcon({
  Icon,
  size,
  tooltip,
  href = "#",
  handleClick = undefined,
}: {
  Icon: IconType;
  size: string;
  tooltip?: string;
  href?: string;
  handleClick?(): void;
}) {
  return (
    <Link href={href}>
      <button
        onClick={handleClick}
        className={`scale-transition sidebar-icon btn btn-circle flex tooltip tooltip-right z-50`}
        data-tip={tooltip}
      >
        <Icon size={size} />
      </button>
    </Link>
  );
}
