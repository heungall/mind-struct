import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mind Struct | 생각 구조화 변환기",
  description:
    "파편화된 생각들을 정제된 구조로 변환하세요. 비즈니스 로직과 자기 성찰 사이의 균형을 제공합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="light h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-body selection:bg-primary-container">
        {children}
      </body>
    </html>
  );
}
