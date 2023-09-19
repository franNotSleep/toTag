"use client";

import React, { useContext } from "react";
import Textarea from "./Textarea";
import Preview from "./Preview";
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

interface EditFileFormProps {
  initialMarkdown?: string;
  setInitialMarkdownAsync?(): Promise<string | undefined>;
  currentFile: HtmlFile | null;
}

export default function EditFileForm({
  initialMarkdown = "hola",
  setInitialMarkdownAsync,
  currentFile,
}: EditFileFormProps) {
  const [input, setInput] = useState(initialMarkdown);
  const [outputHtml, setOuputHtml] = useState("");
  const { showSuccessToast, showFailToast, setToastMessage, toast } =
    useShowToast(4);

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
    const file = await updateFile();
    setToastMessage(file[1]);

    if (!file[0]) {
      await showFailToast();
    } else {
      await showSuccessToast();
    }

    if (currentFile)
      setFileLocalStorage({ ...currentFile, content: Buffer.from(input) });
  }

  async function handleCreate(title: string) {
    const file = await Create({ title, content: input });

    setToastMessage(file[1]);

    if (!file[0]) {
      showFailToast();
    } else {
      showSuccessToast();
    }

    if (currentFile)
      setFileLocalStorage({ ...currentFile, content: Buffer.from(input) });
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value);
  }

  useEffect(() => {
    (async () => {
      if (setInitialMarkdownAsync) {
        const markdown = await setInitialMarkdownAsync();
        if (markdown) setInput(markdown);
      }
    })();
  }, []);

  useEffect(() => {
    const markdown = new Markdown();
    let html = "";
    if (input) {
      html = markdown.ToHtml(input);
    }
    setOuputHtml(html);
  }, [input]);

  return (
    <div className="flex w-screen">
      <Textarea
        placeholder="# Hello bro"
        textareaStyles="placeholder:italic placeholder:text-slace-400 placeholder:text-md"
        handleChange={handleChange}
        value={input}
      />

      <div className="divider divider-horizontal">TO</div>

      <Preview
        outputStyles="h-screen placeholder:italic placeholder:text-slace-400 placeholder:text-2xl"
        html={outputHtml}
      />
      <div className="fixed bottom-8 right-8">
        <button
          className="sidebar-btn tooltip tooltip-bottom"
          data-tip="Save"
          onClick={UpdateOrOpenModal}
        >
          <AiFillSave size="20" />
        </button>
      </div>
      <CreateOrUpdateTitleModal handleSave={handleCreate} />
      {toast.showSuccessToast && <Toast type="success" msg={toast.message} />}
      {toast.showFailToast && <Toast type="error" msg={toast.message} />}
    </div>
  );
}
