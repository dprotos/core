import { useMutation } from "@tanstack/react-query";
import { ClientSafeProvider, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export function useOauthSignIn(provider: ClientSafeProvider) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const emailSignInMutation = useMutation({
    mutationFn: () =>
      signIn(provider.id, { callbackUrl: callbackUrl ?? undefined }),
  });

  return {
    signIn: emailSignInMutation.mutate,
    isPending: emailSignInMutation.isPending,
  };
}
