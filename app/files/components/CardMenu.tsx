import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillInfoCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
export default function CardMenu({ id }: { id: number}) {
  return (
    <div className="dropdown">
      <summary
        tabIndex={0}
        className="group-hover:bg-primary m-1 btn bg-transparent border-0 text-secondary text-2xl font-bold"
      >
        <BsThreeDotsVertical />
      </summary>
      <ul
        tabIndex={0}
        className="p-2 shadow  menu dropdown-content z-[1] bg-base-100 rounded-box"
      >
        <li>
          <Link href={`/files/edit-file/${id}`} className="text-lg">
            <AiFillEdit />
            Edit
          </Link>
        </li>
        <li>
          <a className="text-lg">
            <AiFillInfoCircle />
            Details
          </a>
        </li>
        <li>
          <a className="text-lg">
            <AiFillDelete />
            Delete
          </a>
        </li>
      </ul>
    </div>
  );
}
