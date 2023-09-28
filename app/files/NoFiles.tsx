import Link from "next/link";
import { AiFillHome } from "react-icons/ai";

export default function NoFiles() {
  return (
    <div className="hero g-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">No files</h1>
          <p className="py-6">
            To create or save a file go to the home and start editing a file,
            once you finish editing, click the save button in the lower left
            corner.
          </p>
          <Link href="/">
            <button className="btn btn-primary">
              <AiFillHome />
              Go Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
