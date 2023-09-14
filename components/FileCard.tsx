import { FaDownload } from "react-icons/fa";
import parseISO from "date-fns/parseISO";
import format from "date-fns/format";

export default function FileCard({
  title,
  bufferedContent,
  createdAt,
  updatedAt,
}: {
  title: string;
  bufferedContent: Buffer;
  updatedAt: Date;
  createdAt: Date;
}) {
  let buffer = Buffer.from(bufferedContent);
  let content = buffer.toString();
  const createdAtDate = parseISO(createdAt.toISOString());
  const updatedAtDate = parseISO(updatedAt.toISOString());

  if (content.length > 30) {
    content = content.substring(0, 200) + "...";
  }

  return (
    <div className="card w-96 bg-primary shadow-xl">
      <div className="card-body">
        <h2 className="card-title underline decoration-secondary decoration-4">{title}</h2>
        <p className="text-neutral-300">{content}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-secondary rounded-lg">
            Download
            <FaDownload />
          </button>
        </div>
      </div>
    </div>
  );
}
