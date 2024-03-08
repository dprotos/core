import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Profile } from "../_domain/types";
import { getProfileLetters } from "../_vm/get-profile-letters";

export function ProfileAvatar({
  profile,
  className,
}: {
  profile: Profile;
  className: string;
}) {
  if (!profile) return null;
  const profileLetters = getProfileLetters(profile);
  return (
    <Avatar className={className}>
      <AvatarImage src={profile.image ?? undefined} />
      <AvatarFallback>{profileLetters}</AvatarFallback>
    </Avatar>
  );
}
