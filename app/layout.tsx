import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Users & Posts Dashboard",
  description: "Explore users and their posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}
