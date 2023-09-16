"use client";

import GetFile from "@/lib/dbOperations/getFile";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import { useEffect, useState } from "react";
import Output from "@/components/Output";

interface PreviewProps {
  params: { id: string };
}

export default function Preview({ params: { id } }: PreviewProps) {
  const [html, setHtml] = useState("");
  console.log(id);

  useEffect(() => {
    (async () => {
      const htmlString = await GetHtml(Number(id));
      if (!htmlString) {
        return <div>File with id {id} was not found.</div>;
      }
      setHtml(htmlString);
    })();
  }, []);

  return <Output  html={html} outputStyles="p-4 mx-auto"/>;
}

async function GetHtml(id: number): Promise<string | undefined> {
  const file = await GetFile(id);
  if (!file) return undefined;

  const markdown = Buffer.from(file.content).toString("utf8");

  const html = new Markdown().ToHtml(markdown);

  return html;
}
