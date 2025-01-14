"use client";

import type { ThemeProviderProps } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemeProvider {...themeProps}>{children}</NextThemeProvider>
    </NextUIProvider>
  );
}
