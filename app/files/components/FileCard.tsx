import { FaDownload } from "react-icons/fa";
import CardMenu from "./CardMenu";
import Link from "next/link";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import { AiFillEye } from "react-icons/ai";

export default function FileCard({
  title,
  bufferedContent,
  id,
}: {
  title: string;
  bufferedContent: Buffer;
  id: number;
}) {
  let buffer = Buffer.from(bufferedContent);
  let content = buffer.toString();

  if (content.length > 30) {
    content = content.substring(0, 200) + "...";
  }

  function handleDownload() {
    const html = new Markdown().ToHtml(buffer.toString());
    const myFile = new File([html], `${title}.html`);
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

  return (
    <div className="card lg:w-96 md:w-72 bg-primary shadow-xl relative">
      <div className="absolute top-0 left-0">
        <CardMenu id={id} />
      </div>
      <div className="card-body flex flex-col justify-around items-center text-center">
        <h2 className="w-52 card-title underline decoration-secondary  decoration-4 p-4">
          {title}
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
          <Link href={`files/file-preview/${id}`}>
            <button className="btn btn-secondary rounded-lg shadow-lg">
              Preview
              <AiFillEye size="20" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
