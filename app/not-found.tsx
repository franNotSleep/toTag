import Image from "next/image";
import Link from "next/link";

import { AiFillHome } from "react-icons/ai";

export default function NotFound() {
  return (
    <div className="fixed-center flex flex-col items-center">
      <Image className="animate-pulse" src={"/totag-404.png"} alt="404 image" width={300} height={300} />
      <div className="mx-auto text-center">
        <p className="text-4xl">404 - Not Found</p>
        <Link href={"/"}>
          <button className="btn btn-primary mt-8">
            <AiFillHome />
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}
