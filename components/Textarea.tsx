import { TextareaProps } from "./types";

export default function Textarea({
  placeholder,
  textareaStyles,
  handleChange,
  value,
}: TextareaProps) {
  return (
    <textarea
      onChange={handleChange}
      className={`custom-textarea ${textareaStyles}`}
      placeholder={placeholder}
      value={value}
    ></textarea>
  );
}
