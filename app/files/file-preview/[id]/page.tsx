"use client";

import GetFile from "@/lib/dbOperations/getFile";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import { ParamsIdProps } from "@/components/types";


export default function PreviewFile({ params: { id } }: ParamsIdProps) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    (async () => {
      const htmlString = await GetHtml(Number(id));
      if (!htmlString) {
        return <div>File with id {id} was not found.</div>;
      }
      setHtml(htmlString);
    })();
  }, []);

  return <Preview  html={html} outputStyles="p-4 mx-auto"/>;
}

async function GetHtml(id: number): Promise<string | undefined> {
  const file = await GetFile(id);
  if (!file) return undefined;

  const markdown = Buffer.from(file.content).toString("utf8");

  const html = new Markdown().ToHtml(markdown);

  return html;
}
