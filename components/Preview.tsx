import { PreviewProps } from './types';

export default function Preview({ html }: PreviewProps) {
  return (
    <div
      className={`prose-xl overflow-wrap whitespace-pre-wrap overflow-y-auto p-4 w-full`}
      dangerouslySetInnerHTML={{ __html: html ?? `<h1>Hola</h1>` }}
    ></div>
  );
}
