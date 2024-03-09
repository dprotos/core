"use client";
import { ClientSafeProvider } from "next-auth/react";
import { useOauthSignIn } from "../_vm/use-oauth-sign-in";
import { Github } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Spinner } from "@/shared/ui/spinner";

export function ProviderButton({ provider }: { provider: ClientSafeProvider }) {
  const oauthSignIn = useOauthSignIn(provider);

  const getIcon = (provider: ClientSafeProvider) => {
    switch (provider.id) {
      case "github":
        return <Github className="mr-2 h-4 w-4" />;
      default:
        null;
    }
  };

  return (
    <Button
      variant="outline"
      type="button"
      disabled={oauthSignIn.isPending}
      onClick={() => oauthSignIn.signIn()}
    >
      {oauthSignIn.isPending ? (
        <Spinner className="mr-2 h-4 w-4" aria-label="Обработка входа" />
      ) : (
        getIcon(provider)
      )}
      {provider.name}
    </Button>
  );
}
