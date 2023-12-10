"use client";
import React from "react";
import type { kinopoiskType } from "@/types/KinopoiskType";
export const KinopoiskContext = React.createContext<{
  value: kinopoiskType | null;
  setValue: React.Dispatch<React.SetStateAction<kinopoiskType | null>>;
} | null>(null);
export default function KinopoiskProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [value, setValue] = React.useState<kinopoiskType | null>(null);
  return (
    <KinopoiskContext.Provider
      value={{
        value,
        setValue,
      }}
    >
      {children}
    </KinopoiskContext.Provider>
  );
}
