import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillInfoCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";
export default function CardMenu() {
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
          <a className="text-lg">
            <AiFillEdit />
            Edit
          </a>
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
