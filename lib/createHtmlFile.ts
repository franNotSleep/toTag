import fs from "fs/promises";
import path from "path";

export default async function createHtmlFile(content: string, title: string) {
  const currentDirectory = path.join(process.cwd(), 'lib/tmp/');
  const filePath = `${currentDirectory}${title}.html`;
  fs.writeFile(filePath, content);

  return filePath;
}
