import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "江戸川乱歩生誕地ミュージアム",
  description: "明治27年、名張。130年続く記憶の継承の場所。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="h-full">
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
