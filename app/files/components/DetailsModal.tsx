import { HtmlFile } from "../../../db.config";
import { format } from "timeago.js";

export default function DetailsModal({
  modalId,
  file,
}: {
  modalId: string;
  file: HtmlFile;
}) {
  const updatedAt = new Date(file.updatedAt);
  const createdAt = new Date(file.createdAt);
  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <div className="card bg-base-100">
          <div className="card-body">
            <h2 className="card-title flex gap-2 items-center">File Details</h2>
            <h2 className="flex gap-2 items-center">
              <span className="text-underline-decoration">Title</span>
              <span className="badge badge-primary">{file.title}</span>
            </h2>
            <p className="flex gap-2 items-center">
              <span className="text-underline-decoration">Last Modified</span>
              <span className="badge badge-primary">{format(updatedAt)}</span>
            </p>

            <p className="flex gap-2 items-center">
              <span className="text-underline-decoration">Created At </span>
              <span className="badge badge-primary ">{format(createdAt)}</span>
            </p>
          </div>
        </div>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}
