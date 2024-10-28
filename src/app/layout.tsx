import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VexeExpress",
  description: "Bus Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-rounded">{children}</body>
    </html>
  );
}
