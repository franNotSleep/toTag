import { Data } from "./createFile";
import { htmlFilesTable, type HtmlFile } from "../../db.config";

export default function validatedData(data: Data) {
  if (!data.title) {
    throw new Error("You must provide a title.");
  }

  if (!data.content) {
    throw new Error("You must provide a content.");
  }

  return transformedData(data);
}

function transformedData(data: Data): HtmlFile {
  let bufferedContent = Buffer.from(data.content);

  const newData: HtmlFile = {
    ...data,

    updatedAt: Date.now(),
    createdAt: Date.now(),
    content: bufferedContent,
  };

  return newData;
}
