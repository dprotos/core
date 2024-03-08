import { Profile } from "../_domain/types";

export function getProfileUserName(profile: Profile) {
  return profile.name ? profile.name : profile.email;
}
