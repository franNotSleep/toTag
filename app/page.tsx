"use client";

import { useEffect, useState } from "react";
import Textarea from "@/components/Textarea";
import { Markdown } from "@/lib/markdownParser";
import { defaultMarkdown } from "@/constants";
import Output from "@/components/Output";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const [input, setInput] = useState(defaultMarkdown);
  const [outputHtml, setOuputHtml] = useState("");

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
    <main className="container">
        <div className="grow flex">
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
    </main>
  );
}
