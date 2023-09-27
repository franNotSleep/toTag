"use client";

import NotFound from "@/app/not-found";
import EditFileForm from "@/components/EditFileForm";
import { ParamsIdProps } from "@/components/types";
import { EditContext } from "@/contexts/EditContext";
import { HtmlFile } from "@/db.config";
import GetFile from "@/lib/dbOperations/getFile";
import {  useEffect,useState } from "react";

export default function Page({ params }: ParamsIdProps) {
  const [currentFile, setCurrentFile] = useState<HtmlFile | null>(null);
  const [found, setFound] = useState(true);
  
  useEffect(() => {
    (async () => {
      const file = await GetFile(Number(params.id));

      if (file) {
        setCurrentFile(file);
      } else {
        setFound(false);
      }
    })();
  }, []);

  if (!found) {
    return <NotFound />
  }
  return (
    <main>
      <EditContext.Provider value={true}>
          <EditFileForm currentFile={currentFile} />
      </EditContext.Provider>
    </main>
  );
}
