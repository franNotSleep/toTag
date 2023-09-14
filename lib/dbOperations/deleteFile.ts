import { htmlFilesTable } from "../../db.config";
import { IndexableType } from "dexie";

export type Data = {
  title: string;
  content: string;
};

type IndexableTypeOrNull = IndexableType | null;

export default async function Delete(
  id: IndexableType,
): Promise<[IndexableTypeOrNull, string]> {
  try {
    await htmlFilesTable.delete(id);
    return [id, `Deleted file file with id "${id}".`];
  } catch (e: any) {
    return [null, e.message];
  }
}
