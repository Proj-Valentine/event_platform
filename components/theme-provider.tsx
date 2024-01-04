"use client"
import * as React from "react";
import { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => setMounted(true), []);

  // Prevent mismatch between server and client
  if (!mounted) return null;

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
