import Image from "next/image";
import Link from "next/link";
import {
  AiFillFolder,
  AiFillHome,
  AiFillInfoCircle,
} from "react-icons/ai";

export default function Sidebar() {
  return (
    <div className="fixed-btn">
      <div className="dropdown dropdown-top">
        <button className="sidebar-btn">
          <Image height={100} width={100} alt="home button" src="/tag.svg" />
        </button>

        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li className="flex gap-4">
            <Link href={"/"}>
              <AiFillHome />
              Home
            </Link>
          </li>
          <li className="flex gap-4">
            <Link href={"/files"}>
              <AiFillFolder />
              Files
            </Link>
          </li>
          <li className="flex gap-4">
            <Link href={"/how-to-use"}>
              <AiFillInfoCircle />
              How to use
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
