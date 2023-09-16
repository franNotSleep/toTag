import db, { HtmlFile } from "../../db.config";

export default async function GetFile(
  id: number,
): Promise<HtmlFile | undefined> {

  const file = await db.htmlFiles.get(id);
  return file
}
