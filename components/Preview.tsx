import { PreviewProps } from './types';

export default function Preview({ html, outputStyles }: PreviewProps) {
  return (
    <div
      className={`prose-xl overflow-wrap whitespace-pre-wrap overflow-y-auto ${outputStyles} p-4`}
      dangerouslySetInnerHTML={{ __html: html ?? `<h1>Hola</h1>` }}
    ></div>
  );
}
