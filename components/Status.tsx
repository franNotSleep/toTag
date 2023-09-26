import { BiAddToQueue, BiPencil } from "react-icons/bi";

export default function Status({
  status,
  text,
}: {
  status: "create" | "edit";
  text: string;
}) {
  return (
    <div className="absolute left-0 top-0 p-4">
      <div className="p-4 badge badge-success gap-2 text-lg">
        {status === "create" ? <BiAddToQueue /> : <BiPencil />}
        <p className="text-lg max-sm:hidden">{text}</p>
      </div>
    </div>
  );
}
