import type { Metadata } from "next";
import "../styles/globals.scss";
import { ThemeProvider } from "@/providers/ThemeProvider";
import ConvexClientProvider from "@/providers/ConvexClientProvider";
import KinopoiskProvider from "@/providers/KinopoiskProvider";
import React from "react";
export const metadata: Metadata = {
  title: "latch",
  description: "created by lldan",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <ConvexClientProvider>
            <KinopoiskProvider>
              <div className="wrapper">{children}</div>
            </KinopoiskProvider>
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
