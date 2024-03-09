import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/shared/ui/utils";
import { AppProvider } from "./_providers/app_provider";

const fontSans = FontSans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: `OpenUI (${process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT})`,
  description: "Open UI project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
