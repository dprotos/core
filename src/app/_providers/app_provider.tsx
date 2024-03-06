"use client";
import { ThemeProvider } from "@/features/themes/theme-provider";
import { ComposeChildren } from "@/shared/lib/react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ComposeChildren>
      <ThemeProvider />
      {children}
    </ComposeChildren>
  );
}
