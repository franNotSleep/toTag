"use client";

import React, { useContext } from "react";
import Textarea from "./Textarea";
import Preview from "./Preview";
import { useState, useEffect } from "react";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import Toast from "./Toast";
import CreateFileModal from "./CreateFileModal";
import Create from "@/lib/dbOperations/createFile";
import { AiFillSave } from "react-icons/ai";
import { EditContext } from "@/contexts/EditContext";
import Update, { IndexableTypeOrNull } from "@/lib/dbOperations/updateFile";
import { HtmlFile } from "@/db.config";

const seconds = 4000;

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

  const [showToasts, setShowToasts] = useState([false, false]);
  const [toastMessage, setToastMessage] = useState("");

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
      return handleOpenModal;
    }
    const file = await updateFile();

    setToastMessage(file[1]);

    if (!file[0]) {
      setShowToasts([false, true]);
    }

    setShowToasts([true, false]);
    localStorage.setItem("lastFileCreated", input);
  }

  async function handleCreate(title: string) {
    const file = await Create({ title, content: input });

    setToastMessage(file[1]);

    if (!file[0]) {
      setShowToasts([false, true]);
    }

    setShowToasts([true, false]);
    localStorage.setItem("lastFileCreated", input);
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

  useEffect(() => {
    if (showToasts[0]) {
      setTimeout(() => {
        setShowToasts([false, false]);
      }, seconds);
    }

    if (showToasts[1]) {
      setTimeout(() => {
        setShowToasts([false, false]);
      }, seconds);
    }
  }, [showToasts]);

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
      <div className="absolute bottom-8 right-8">
        <button
          className="sidebar-btn tooltip tooltip-bottom"
          data-tip="Save"
          onClick={UpdateOrOpenModal}
        >
          <AiFillSave size="20" />
        </button>
      </div>
      <CreateFileModal handleSave={handleCreate} />
      {showToasts[0] && <Toast type="success" msg={toastMessage} />}
      {showToasts[1] && <Toast type="error" msg={toastMessage} />}
    </div>
  );
}
