"use client";

import React, { useContext } from "react";
import Textarea from "./Textarea";
import Preview from "./Preview";
import Tab from "./Tab";
import { useState, useEffect } from "react";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import Toast from "./Toast";
import CreateOrUpdateTitleModal from "./CreateOrUpdateTitleModal";
import Create from "@/lib/dbOperations/createFile";
import { AiFillSave } from "react-icons/ai";
import { EditContext } from "@/contexts/EditContext";
import Update, { IndexableTypeOrNull } from "@/lib/dbOperations/updateFile";
import { HtmlFile } from "@/db.config";
import { setFileLocalStorage } from "@/lib/setFileLocalStorage";
import useShowToast from "@/hooks/useShowToast";
import Status from "./Status";

interface EditFileFormProps {
  initialMarkdown?: string;
  currentFile: HtmlFile | null;
}

export default function EditFileForm({
  initialMarkdown = "hola",
  currentFile,
}: EditFileFormProps) {
  const [input, setInput] = useState(initialMarkdown);
  const [outputHtml, setOuputHtml] = useState("");
  const [currentView, setCurrentView] = useState(0);
  const { showToast, toast } = useShowToast(4);

  const editing = useContext(EditContext);

  function handleOpenModal() {
    (document.getElementById("my_modal_1") as HTMLDialogElement).showModal();
  }

  async function updateFile() {
    let file!: [IndexableTypeOrNull, string];
    if (currentFile)
      file = await Update({ ...currentFile, content: Buffer.from(input) });
    return file;
  }

  async function UpdateOrOpenModal() {
    if (!editing) {
      return handleOpenModal();
    }
    const [id, message] = await updateFile();
    showToast(!!id, message);

    if (currentFile)
      setFileLocalStorage({ ...currentFile, content: Buffer.from(input) });
  }

  async function handleCreate(title: string) {
    const [id, message] = await Create({ title, content: input });
    showToast(!!id, message);

    if (currentFile)
      setFileLocalStorage({ ...currentFile, content: Buffer.from(input) });
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  useEffect(() => {
    if (currentFile) {
      setInput(Buffer.from(currentFile.content).toString());
    }
  }, [currentFile]);

  useEffect(() => {
    const markdown = new Markdown();
    let html = "";
    if (input) {
      html = markdown.ToHtml(input);
    }
    setOuputHtml(html);
  }, [input]);

  return (
    <div className="flex flex-col h-screen">
      <Status text={editing ? "edit file": "create file"} status={editing ? "edit" : "create"} />
      <div className="h-24">
        <Tab
          setCurrentTab={(currentTab) => {
            setCurrentView(currentTab);
          }}
          initialTab={currentView}
        >
          <a className="tab tab-lifted">Markdown</a>
          <a className="tab tab-lifted max-sm:hidden">Both</a>
          <a className="tab tab-lifted">HTML</a>
        </Tab>
      </div>

      <div className="mx-auto container flex-grow overflow-y-auto p-4">
        <div className="flex-grow flex h-full w-full">
          {(currentView === 0 || currentView === 1) && (
            <Textarea
              placeholder="# Hello bro"
              handleChange={handleChange}
              value={input}
            />
          )}

          {(currentView === 2 || currentView === 1) && (
            <Preview html={outputHtml} />
          )}
          <div className="fixed bottom-8 right-8">
            <button
              className="sidebar-btn tooltip tooltip-top"
              data-tip="Save"
              onClick={UpdateOrOpenModal}
            >
              <AiFillSave size="20" />
            </button>
          </div>
          <CreateOrUpdateTitleModal handleSave={handleCreate} />
          {toast.showSuccessToast && (
            <Toast type="success" msg={toast.message} />
          )}
          {toast.showFailToast && <Toast type="error" msg={toast.message} />}
        </div>
      </div>
    </div>
  );
}
