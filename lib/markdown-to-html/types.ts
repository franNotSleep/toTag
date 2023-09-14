export enum TagType {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  B,
  I,
  Ol,
  Ul,
  HR,
  A,
  Img,
  P,
}

export interface IMarkdownDocument {
  Add(...content: string[]): void;
  AddWithTag(tag: string, ...content: string[]): void;
  Get(): string;
}

interface ParseElement {
  CurrentLine: string;
}

export interface IVisitor {
  Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void;
}

export interface IVisitable {
  Accept(
    visitor: IVisitor,
    token: ParseElement,
    markdownDocument: IMarkdownDocument,
  ): void;
}
