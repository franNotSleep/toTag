import { HtmlFile } from "@/db.config";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface CurrentFileContextType {
  setCurrentFile: Dispatch<SetStateAction<HtmlFile | null>>;
  currentFile: HtmlFile | null;
}

export const CurrentFileContext = createContext<CurrentFileContextType | null>(
  null,
);

export default function CurrentFileContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentFile, setCurrentFile] = useState<HtmlFile | null>(null);
  console.log(currentFile);

  return (
    <CurrentFileContext.Provider value={{ currentFile, setCurrentFile }}>
      {children}
    </CurrentFileContext.Provider>
  );
}
