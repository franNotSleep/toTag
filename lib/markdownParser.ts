import { IMarkdownDocument, IVisitable, IVisitor, TagType } from "./types";

class TagTypeToHtml {
  private readonly tagType = new Map<TagType, string>();

  constructor() {
    this.tagType.set(TagType.H1, "h1");
    this.tagType.set(TagType.H2, "h2");
    this.tagType.set(TagType.H3, "h3");
    this.tagType.set(TagType.H4, "h4");
    this.tagType.set(TagType.H5, "h5");
    this.tagType.set(TagType.H6, "h6");
    this.tagType.set(TagType.HR, "hr");
    this.tagType.set(TagType.B, "strong");
    this.tagType.set(TagType.I, "i");
    this.tagType.set(TagType.P, "p");
    this.tagType.set(TagType.Ul, "li");
  }

  public OpeningTag(tagType: TagType): string {
    return this.GetTag(tagType, "<");
  }

  public ClosingTag(tagType: TagType): string {
    return this.GetTag(tagType, "</");
  }

  private GetTag(tagType: TagType, openingTagPattern: string): string {
    let tag = this.tagType.get(tagType);

    if (tag !== null) {
      return `${openingTagPattern}${tag}>`;
    }
    return `${openingTagPattern}p>`;
  }
}

class MarkdownDocument implements IMarkdownDocument {
  private content = "";

  Add(...content: string[]): void {
    content.forEach((el) => {
      this.content += el;
    });
  }

  AddWithTag(tag: string, ...content: string[]): void {
    content.forEach((el) => {
      this.content += `<${tag}>${el}</${tag}>`;
    });
  }

  Get(): string {
    return this.content;
  }
}

class LineParser {
  public Parse(value: string, tag: string): [boolean, string] {
    let output: [boolean, string] = [false, ""];

    output[1] = value;

    if (!value) {
      return output;
    }

    let split = value.startsWith(`${tag}`);
    if (split) {
      output[0] = true;
      output[1] = value.substring(tag.length);
    }

    return output;
  }
}

class ParseElement {
  CurrentLine = "";
}

class Visitable implements IVisitable {
  Accept(
    visitor: IVisitor,
    token: ParseElement,
    markdownDocument: IMarkdownDocument,
  ): void {
    visitor.Visit(token, markdownDocument);
  }
}

abstract class VisitorBase implements IVisitor {
  constructor(
    private readonly tagType: TagType,
    private readonly TagTypeToHtml: TagTypeToHtml,
  ) {}

  Visit(token: ParseElement, markdownDocument: IMarkdownDocument): void {
    switch (this.tagType) {
      case TagType.I:
        markdownDocument.AddWithTag(
          "p",
          this.TagTypeToHtml.OpeningTag(this.tagType),
          token.CurrentLine,
          this.TagTypeToHtml.ClosingTag(this.tagType),
        );
        break;
      case TagType.B:
        markdownDocument.AddWithTag(
          "p",
          this.TagTypeToHtml.OpeningTag(this.tagType),
          token.CurrentLine,
          this.TagTypeToHtml.ClosingTag(this.tagType),
        );
        break;
      default:
        markdownDocument.Add(
          this.TagTypeToHtml.OpeningTag(this.tagType),
          token.CurrentLine,
          this.TagTypeToHtml.ClosingTag(this.tagType),
        );
    }
  }
}

abstract class Handler<T> {
  protected next: Handler<T> | null = null;
  public SetNext(next: Handler<T>): void {
    this.next = next;
  }

  public HandleRequest(request: T): void {
    if (!this.CanHandle(request)) {
      if (this.next != null) {
        this.next.HandleRequest(request);
      }
      return;
    }
  }

  protected abstract CanHandle(request: T): boolean;
}

class ParseChainHandler extends Handler<ParseElement> {
  private readonly visitable = new Visitable();

  protected CanHandle(request: ParseElement): boolean {
    let split = new LineParser().Parse(request.CurrentLine, this.tagType);
    if (split[0]) {
      request.CurrentLine = split[1];
      this.visitable.Accept(this.visitor, request, this.document);
    }

    return split[0];
  }

  constructor(
    private readonly document: IMarkdownDocument,
    private readonly tagType: string,
    private readonly visitor: IVisitor,
  ) {
    super();
  }
}

class H1Visitor extends VisitorBase {
  constructor() {
    super(TagType.H1, new TagTypeToHtml());
  }
}

class H2Visitor extends VisitorBase {
  constructor() {
    super(TagType.H2, new TagTypeToHtml());
  }
}
class H3Visitor extends VisitorBase {
  constructor() {
    super(TagType.H4, new TagTypeToHtml());
  }
}

class H4Visitor extends VisitorBase {
  constructor() {
    super(TagType.H4, new TagTypeToHtml());
  }
}

class H5Visitor extends VisitorBase {
  constructor() {
    super(TagType.H5, new TagTypeToHtml());
  }
}
class H6Visitor extends VisitorBase {
  constructor() {
    super(TagType.H6, new TagTypeToHtml());
  }
}

class HRVisitor extends VisitorBase {
  constructor() {
    super(TagType.HR, new TagTypeToHtml());
  }
}

class BoldVisitor extends VisitorBase {
  constructor() {
    super(TagType.B, new TagTypeToHtml());
  }
}

class ItalicVisitor extends VisitorBase {
  constructor() {
    super(TagType.I, new TagTypeToHtml());
  }
}

class UlVisitor extends VisitorBase {
  constructor() {
    super(TagType.Ul, new TagTypeToHtml());
  }
}

class ParagraphVisitor extends VisitorBase {
  constructor() {
    super(TagType.P, new TagTypeToHtml());
  }
}

class H1ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "# ", new H1Visitor());
  }
}

class H2ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "## ", new H2Visitor());
  }
}

class H3ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "### ", new H3Visitor());
  }
}
class H4ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "#### ", new H4Visitor());
  }
}

class H5ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "##### ", new H5Visitor());
  }
}

class H6ChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "###### ", new H6Visitor());
  }
}

class UlChainHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "- ", new UlVisitor());
  }
}

class HRHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "---", new HRVisitor());
  }
}

class BoldHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "** ", new BoldVisitor());
  }
}

class ItalicHandler extends ParseChainHandler {
  constructor(document: IMarkdownDocument) {
    super(document, "* ", new ItalicVisitor());
  }
}

class ParagraphHandler extends Handler<ParseElement> {
  private readonly visitable: IVisitable = new Visitable();
  private readonly visitor: IVisitor = new ParagraphVisitor();
  protected CanHandle(request: ParseElement): boolean {
    this.visitable.Accept(this.visitor, request, this.document);
    return true;
  }
  constructor(private readonly document: IMarkdownDocument) {
    super();
  }
}

class ChainOfResponsibilityFactory {
  Build(document: IMarkdownDocument): ParseChainHandler {
    let header1 = new H1ChainHandler(document);
    let header2 = new H2ChainHandler(document);
    let header3 = new H3ChainHandler(document);
    let header4 = new H4ChainHandler(document);
    let header5 = new H5ChainHandler(document);
    let header6 = new H6ChainHandler(document);
    let italic = new ItalicHandler(document);
    let bold = new BoldHandler(document);
    let unorderedList = new UlChainHandler(document);
    let horizontalRule = new HRHandler(document);
    let paragraph = new ParagraphHandler(document);

    header1.SetNext(header2);
    header2.SetNext(header3);
    header3.SetNext(header4);
    header4.SetNext(header5);
    header5.SetNext(header6);
    header6.SetNext(italic);
    italic.SetNext(bold);
    bold.SetNext(horizontalRule);
    horizontalRule.SetNext(unorderedList);
    unorderedList.SetNext(paragraph)

    return header1;
  }
}

export class Markdown {
  public ToHtml(text: string): string {
    let document: IMarkdownDocument = new MarkdownDocument();
    let header1 = new ChainOfResponsibilityFactory().Build(document);

    let lines: string[] = text.split(`\n`);
    for (let index = 0; index < lines.length; index++) {
      let parseElement: ParseElement = new ParseElement();
      parseElement.CurrentLine = lines[index];
      header1.HandleRequest(parseElement);
    }
    return document.Get();
  }
}
