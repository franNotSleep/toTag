import { htmlFilesTable } from "../../db.config";
import { IndexableType } from "dexie";
import validatedData from "./validatedData";

export type Data = {
  title: string;
  content: string;
};

type IndexableTypeOrNull = IndexableType | null;

export default async function Create(
  data: Data,
): Promise<[IndexableTypeOrNull, string]> {
  try {
    let validData = validatedData(data);
    const id = await htmlFilesTable.add(validData);
    return [id, "New file added."];
  } catch (e: any) {
    return [null, e.message];
  }
}
