import { useAppSession } from "./use-app-session";

export function useRole() {
  const session = useAppSession();
  return session?.data?.user?.role;
}
