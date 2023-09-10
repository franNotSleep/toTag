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
      className={`textarea w-full focus:outline-0 ${textareaStyles}`}
      placeholder={placeholder}
      value={value}
    ></textarea>
  );
}
