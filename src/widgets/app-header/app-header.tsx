import { ToggleTheme } from "@/features/themes/toggle-theme";
import { Layout } from "./_ui/layout";
import { Logo } from "./_ui/logo";
import { MainNav } from "./_ui/main-nav";
import { Profile } from "./_ui/profile";

export function AppHeader({
  variant,
}: {
  variant: "auth" | "private" | "public";
}) {
  const showProfile = variant !== "auth";
  return (
    <Layout
      logo={<Logo />}
      nav={<MainNav />}
      profile={showProfile && <Profile />}
      actions={<ToggleTheme />}
    />
  );
}
