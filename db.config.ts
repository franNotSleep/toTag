import Dexie, { Table } from "dexie";

export interface HtmlFile {
  id?: number;
  title: string;
  content: Buffer;
  createdAt: number;
  updatedAt: number;
}

class DB extends Dexie {
  htmlFiles!: Table<HtmlFile>;

  constructor() {
    super("toTag");

    this.version(1).stores({
      htmlFiles: "++id, content, createdAt, updatedAt",
    });
  }
}

const db = new DB();

export const htmlFilesTable = db.table("htmlFiles");

export default db;
