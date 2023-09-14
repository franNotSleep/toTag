import { htmlFilesTable } from "../../db.config";
import { IndexableType } from "dexie";
import validatedData from "./validatedData";

export type Data = {
  title: string;
  content: string;
};

type IndexableTypeOrNull = IndexableType | null;

export default async function Update(
  data: Data,
): Promise<[IndexableTypeOrNull, string]> {
  try {
    let validData = validatedData(data);
    const id = await htmlFilesTable.add(validData);
    return [id, `Updated file with id "${id}".`];
  } catch (e: any) {
    return [null, e.message];
  }
}
