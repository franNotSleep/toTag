export interface TextareaProps {
  placeholder: string;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
}

export interface PreviewProps {
  html: string;
}

export interface ParamsIdProps {
  params: { id: string };
}
