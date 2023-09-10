export interface TextareaProps {
  placeholder: string;
  textareaStyles: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}

export interface OutputProps {
  html: string;
  outputStyles: string;
}
