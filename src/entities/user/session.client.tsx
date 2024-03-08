"use client";

import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";

export const useAppSession = useSession;

export function useRole() {
  const session = useAppSession();
  return session?.data?.user?.role;
}

export function AppSessionProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  return <NextSessionProvider>{children}</NextSessionProvider>;
}
