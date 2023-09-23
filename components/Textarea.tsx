import { TextareaProps } from "./types";

export default function Textarea({
  placeholder,
  handleChange,
  value,
}: TextareaProps) {
  return (
    <textarea
      onChange={handleChange}
      className={`w-full custom-textarea textarea-placeholder`}
      placeholder={placeholder}
      value={value}
    ></textarea>
  );
}
