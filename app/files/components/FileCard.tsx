import Toast from "@/components/Toast";
import CreateOrUpdateTitleModal from "@/components/CreateOrUpdateTitleModal";
import { FaDownload } from "react-icons/fa";
import Update from "@/lib/dbOperations/updateFile";
import CardMenu from "./CardMenu";
import Link from "next/link";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import { AiFillEye } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import useShowToast from "@/hooks/useShowToast";
import { HtmlFile } from "@/db.config";
import { setFileLocalStorage } from "@/lib/setFileLocalStorage";
import Delete from "@/lib/dbOperations/deleteFile";
import { IndexableType } from "dexie";

export default function FileCard({ file }: { file: HtmlFile }) {
  const { showToast, toast } =
    useShowToast(4);
  let buffer = Buffer.from(file.content);
  let content = buffer.toString();

  if (content.length > 200) {
    content = content.substring(0, 200) + "...";
  }

  function handleDownload() {
    const html = new Markdown().ToHtml(buffer.toString());
    const myFile = new File([html], `${file.title}.html`);
    downloadFile(myFile);
  }

  function downloadFile(file: Blob) {
    const link = document.createElement("a");

    link.style.display = "none";
    link.href = URL.createObjectURL(file);
    link.download = file.name;

    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    link.parentNode?.removeChild(link);
  }

  function handleOpenModal() {
    (
      document.getElementById(file.updatedAt.toString()) as HTMLDialogElement
    ).showModal();
  }

  async function updateTitle(input: string) {
    const [id, message] = await Update({ ...file, title: input });
    showToast(!!id, message);
    setFileLocalStorage({ ...file, content: Buffer.from(input) });
  }

  async function deleteFile() {
    const [id, message] = await Delete(file.id as IndexableType);
    showToast(!!id, message);
  }

  return (
    <div className="card lg:w-96 md:w-72 bg-primary shadow-xl relative">
      <div className="absolute top-0 left-0">
        <CardMenu id={file?.id ?? 0} handleDelete={deleteFile} file={file}/>
      </div>
      <div className="card-body flex flex-col justify-around items-center text-center">
        <h2 className="w-52 card-title text-underline-decoration p-4">
          {file.title}
          <span
            className="transition duration-150 cursor-pointer hover:text-secondary tooltip"
            data-tip="Change title"
            onClick={handleOpenModal}
          >
            <BiPencil />
          </span>
        </h2>
        <p className="text-neutral-300">{content}</p>
        <div className="card-actions justify-end mt-4">
          <button
            onClick={handleDownload}
            className="btn btn-secondary rounded-lg shadow-lg"
          >
            Download
            <FaDownload />
          </button>
          <Link href={`files/file-preview/${file.id}`}>
            <button className="btn btn-secondary rounded-lg shadow-lg">
              Preview
              <AiFillEye size="20" />
            </button>
          </Link>
        </div>
      </div>
      <CreateOrUpdateTitleModal
        modalId={file.updatedAt.toString()}
        handleSave={updateTitle}
        currentFile={file}
      />
      {toast.showSuccessToast && <Toast type="success" msg={toast.message} />}
      {toast.showFailToast && <Toast type="error" msg={toast.message} />}
    </div>
  );
}
