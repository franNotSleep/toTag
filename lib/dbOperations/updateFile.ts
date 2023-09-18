import { HtmlFile, htmlFilesTable } from "../../db.config";
import { IndexableType } from "dexie";

export type IndexableTypeOrNull = IndexableType | null;

export default async function Update(
  data: HtmlFile,
): Promise<[IndexableTypeOrNull, string]> {
  try {
    const { content, id, title } = data;
    const updatedRowsCount = await htmlFilesTable.update(id, { content, title, updatedAt: Date.now()  });

    return [id as IndexableType, `${updatedRowsCount} updated rows.`];
  } catch (e: any) {
    return [null, e.message];
  }
}
