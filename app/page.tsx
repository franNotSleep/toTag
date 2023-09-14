"use client";

import CreateFileModal from "@/components/CreateFileModal";
import { useEffect, useState } from "react";
import Textarea from "@/components/Textarea";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import { defaultMarkdown } from "@/constants";
import Output from "@/components/Output";
import Create from "@/lib/dbOperations/createFile";
import Toast from "@/components/Toast";

const seconds = 4000;

export default function Home() {
  const [input, setInput] = useState(defaultMarkdown);
  const [outputHtml, setOuputHtml] = useState("");

  const [showToasts, setShowToasts] = useState([false, false]);
  const [toastMessage, setToastMessage] = useState("hola mis amigos");

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

  const handleSave = async (title: string) => {
    const [id, msg] = await Create({ title, content: input });

    setToastMessage(msg);

    if (!id) {
      setShowToasts([false, true]);
    }

    setShowToasts([true, false]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  useEffect(() => {
    const markdown = new Markdown();
    let html = "";
    if (input) {
      html = markdown.ToHtml(input);
    }
    setOuputHtml(html);
  }, [input]);

  return (
    <main className="container ">
      <div className="grow flex ">
        <Textarea
          placeholder="# Hello bro"
          textareaStyles="placeholder:italic placeholder:text-slace-400 placeholder:text-md"
          handleChange={handleChange}
          value={input}
        />
        <div className="divider divider-horizontal">TO</div>
        <Output
          outputStyles="h-screen placeholder:italic placeholder:text-slace-400 placeholder:text-2xl"
          html={outputHtml}
        />
      </div>
      <CreateFileModal handleSave={handleSave} />
      {showToasts[0] && <Toast type="success" msg={toastMessage} />}
      {showToasts[1] && <Toast type="error" msg={toastMessage} />}
    </main>
  );
}
