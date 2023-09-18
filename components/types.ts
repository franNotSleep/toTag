export interface TextareaProps {
  placeholder: string;
  textareaStyles: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}

export interface PreviewProps {
  html: string;
  outputStyles: string;
}

export interface ParamsIdProps {
  params: { id: string };
}
