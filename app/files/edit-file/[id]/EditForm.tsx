"use client";

import { HtmlFile } from "@/db.config";
import { EditContext } from "@/contexts/EditContext";
import EditFileForm from "@/components/EditFileForm";

export default function EditForm({ file }: { file: HtmlFile }) {
  return (
    <main>
      <EditContext.Provider value={true}>
        <EditFileForm currentFile={file} />
      </EditContext.Provider>
    </main>
  );
}
