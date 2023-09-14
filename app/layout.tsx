import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "ToTag",
  description: "Convert markdown to html and save it.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="h-screen flex w-screen">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
