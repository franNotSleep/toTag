"use client";

import FileCard from "./components/FileCard";
import db from "@/db.config";
import { useLiveQuery } from "dexie-react-hooks";
import NoFiles from "./NoFiles";

export default function Files() {
  const files = useLiveQuery(() => db.htmlFiles.toArray());

  return (
    <div className="w-full p-2 mx-auto">
    {files?.length === 0 && <NoFiles />}
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {files?.map((file) => (
          <FileCard
            file={file}
            key={file.id}
          />
        ))}
      </div>
    </div>
  );
}
