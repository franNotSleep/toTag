import { OutputProps } from './types';

export default function Output({ html, outputStyles }: OutputProps) {
  return (
    <div
      className={`w-full prose lg:prose-xl overflow-wrap whitespace-pre-wrap overflow-y-auto ${outputStyles}`}
      dangerouslySetInnerHTML={{ __html: html ?? `<h1>Hola</h1>` }}
    ></div>
  );
}
