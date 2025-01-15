"use client";

import type { ThemeProviderProps } from "next-themes";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemeProvider {...themeProps}>
        <SessionProvider>{children}</SessionProvider>
      </NextThemeProvider>
    </NextUIProvider>
  );
}
