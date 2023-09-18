"use client";
import EditFileForm from "@/components/EditFileForm";
import { defaultMarkdown } from "@/constants";
import { EditContext } from "@/contexts/EditContext";

export default function Home() {
  const initialMarkdow =
    localStorage.getItem("lastFileCreated") || defaultMarkdown;

  return (
    <main>
      <EditContext.Provider value={false}>
        <EditFileForm currentFile={null} initialMarkdown={initialMarkdow} />
      </EditContext.Provider>
    </main>
  );
}
