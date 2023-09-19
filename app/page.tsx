"use client";
import EditFileForm from "@/components/EditFileForm";
import { defaultMarkdown } from "@/constants";
import { EditContext } from "@/contexts/EditContext";
import { getFileLocalStorage } from "@/lib/setFileLocalStorage";

export default function Home() {
  return (
    <main>
      <EditContext.Provider value={false}>
        <EditFileForm currentFile={null} initialMarkdown={defaultMarkdown} />
      </EditContext.Provider>
    </main>
  );
}
