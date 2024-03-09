import { AuthorizationError } from "@/shared/lib/errors";
import { profileAbility } from "../_domain/ability";
import { SessionEntity, Profile, UserId } from "../_domain/types";
import { profileRepository } from "../_repositoties/profile";

type UpdateProfile = {
  userId: UserId;
  data: Partial<Profile>;
  session: SessionEntity;
};

export class UpdateProfileUseCase {
  async exec({ userId, data, session }: UpdateProfile): Promise<Profile> {
    const checkAbility = profileAbility(session);
    if (!checkAbility.canUpdateProfile(userId)) {
      throw new AuthorizationError();
    }
    return await profileRepository.update(userId, data);
  }
}

export const updateProfileUseCase = new UpdateProfileUseCase();
