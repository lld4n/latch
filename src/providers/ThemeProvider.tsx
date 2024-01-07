"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React from "react";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      storageKey="latch-theme"
    >
      {children}
    </NextThemesProvider>
  );
}
