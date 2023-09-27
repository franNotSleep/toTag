import DetailsModal from "./DetailsModal";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillInfoCircle, AiFillEdit, AiFillDelete } from "react-icons/ai";
import Link from "next/link";
import { HtmlFile } from "@/db.config";

interface CardMenuProps {
  handleDelete(): Promise<void>;
  id: number;
  file: HtmlFile;
}

export default function CardMenu({ id, file, handleDelete }: CardMenuProps) {
  function handleOpenModal() {
    (
      document.getElementById(file.id?.toString() ?? "") as HTMLDialogElement
    ).showModal();
  }

  return (
    <div className="dropdown">
      <summary
        tabIndex={0}
        className="group-hover:bg-primary m-1 btn bg-transparent border-0 text-black text-2xl font-bold"
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
          <a className="text-lg" onClick={handleOpenModal}>
            <AiFillInfoCircle />
            Details
          </a>
        </li>
        <li>
          <a className="text-lg" onClick={handleDelete}>
            <AiFillDelete />
            Delete
          </a>
        </li>
      </ul>
      <DetailsModal file={file} modalId={file.id?.toString() ?? ""} />
    </div>
  );
}
