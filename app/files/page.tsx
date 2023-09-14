"use client";

import FileCard from "@/components/FileCard";
import db from "@/db.config";
import { useLiveQuery } from "dexie-react-hooks";

export default function Files() {
  const files = useLiveQuery(() => db.htmlFiles.toArray());

  return (
    <div className="w-full p-2">
    <p className="text-8xl text-center mb-4">Your Files</p>
      <div className="flex flex-wrap gap-4">
        {files?.map((file) => (
          <FileCard
            updatedAt={new Date(file.updatedAt)}
            createdAt={new Date(file.createdAt)}
            title={file.title}
            key={file.id}
            bufferedContent={file.content}
          />
        ))}
      </div>
    </div>
  );
}
