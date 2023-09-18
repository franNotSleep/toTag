"use client";

import EditFileForm from "@/components/EditFileForm";
import { ParamsIdProps } from "@/components/types";
import { EditContext } from "@/contexts/EditContext";
import { HtmlFile } from "@/db.config";
import GetFile from "@/lib/dbOperations/getFile";
import {  useEffect,useState } from "react";

export default function Page({ params }: ParamsIdProps) {
  const [currentFile, setCurrentFile] = useState<HtmlFile | null>(null);

  async function setMarkdownAsync() {
    const buffer = (await GetFile(Number(params.id)))?.content;
    if (buffer) {
      const markdown = Buffer.from(buffer).toString();
      return markdown;
    }
    return "";
  }

  useEffect(() => {
    (async () => {
      const file = await GetFile(Number(params.id));

      if (file) {
        setCurrentFile(file);
      }
    })();
  }, []);
  return (
    <main>
      <EditContext.Provider value={true}>
          <EditFileForm currentFile={currentFile} setInitialMarkdownAsync={setMarkdownAsync} />
      </EditContext.Provider>
    </main>
  );
}
