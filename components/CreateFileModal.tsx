"use client";

import { useState } from "react";

interface CreateFileModalProps {
  handleSave(title: string): void;
}

export default function CreateFileModal({ handleSave }: CreateFileModalProps) {
  const [input, setInput] = useState("");
  const handleCancel = () => {
    setInput("");
  };

  const handleCreate = () => {
    handleSave(input);
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Create new file</h3>
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
                onClick={handleCreate}
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
