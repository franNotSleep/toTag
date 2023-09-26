import { Markdown } from "../lib/markdown-to-html/markdownParser";
const markdown = new Markdown();

const cheatSheet = [
  {
    element: "Heading 1",
    syntax: "# totag",
    preview: markdown.ToHtml("# totag"),
  },
  {
    element: "Heading 2",
    syntax: "## totag",
    preview: markdown.ToHtml("## totag"),
  },
  {
    element: "Heading 3",
    syntax: "### totag",
    preview: markdown.ToHtml("### totag"),
  },
  {
    element: "Heading 4",
    syntax: "#### totag",
    preview: markdown.ToHtml("#### totag"),
  },
  {
    element: "Heading 5",
    syntax: "##### totag",
    preview: markdown.ToHtml("##### totag"),
  },
  {
    element: "Heading 6",
    syntax: "##### totag",
    preview: markdown.ToHtml("###### totag"),
  },
  {
    element: "List",
    syntax: "- totag",
    preview: markdown.ToHtml("- totag"),
  },
  {
    element: "Bold",
    syntax: "** totag",
    preview: markdown.ToHtml("** totag"),
  },
  {
    element: "Italic",
    syntax: "* totag",
    preview: markdown.ToHtml("* totag"),
  },
];

export default cheatSheet;
