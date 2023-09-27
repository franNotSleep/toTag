"use client";

import GetFile from "@/lib/dbOperations/getFile";
import { Markdown } from "@/lib/markdown-to-html/markdownParser";
import { useEffect, useState } from "react";
import Preview from "@/components/Preview";
import { ParamsIdProps } from "@/components/types";
import NotFound from "@/app/not-found";

export default async function PreviewFile({ params: { id } }: ParamsIdProps) {
  const [html, setHtml] = useState("");
  const [found, setFound] = useState(true);

  useEffect(() => {
    (async () => {
      const htmlString = await GetHtml(Number(id));
      if (htmlString) {
        setHtml(htmlString);
      } else {
        setFound(false);
      }
    })();
  }, []);

  if (!found) {
    return <NotFound />;
  }

  return <Preview html={html} />;
}

async function GetHtml(id: number): Promise<string | undefined> {
  const file = await GetFile(id);
  if (!file) {
    return undefined;
  }

  const markdown = Buffer.from(file.content).toString("utf8");

  const html = new Markdown().ToHtml(markdown);

  return html;
}
