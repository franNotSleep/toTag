"use client";

import { EditContext } from "@/contexts/EditContext";
import { HtmlFile } from "@/db.config";
import { useContext, useEffect, useState } from "react";

interface CreateFileModalProps {
  handleSave(title: string): void;
  currentFile?: HtmlFile;
  modalId?: string;
}

export default function CreateOrUpdateTitleModal({
  handleSave,
  currentFile,
  modalId = "my_modal_1"
}: CreateFileModalProps) {
  const editing = useContext(EditContext);
  const [input, setInput] = useState(currentFile?.title ?? "");

  const handleCancel = () => {
    setInput("");
  };

  const handleUpdateOrCreate = () => {
    handleSave(input);
  };

  return (
    <dialog id={modalId} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">
          {editing ? "Change title" : "Create new file"}
        </h3>
        <label className="label mt-2">
          <span className="label-text">Title</span>
        </label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Dog wants to Use a PC!"
          className="input input-bordered w-full max-w-xs rounded-lg"
        />

        <div className="modal-action">
          <form method="dialog">
            <div className="flex gap-8">
              <button
                className="rounded-lg btn btn-success"
                onClick={handleUpdateOrCreate}
              >
                Create
              </button>
              <button
                onClick={handleCancel}
                className="rounded-lg btn btn-error"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
