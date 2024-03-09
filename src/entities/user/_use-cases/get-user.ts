import { AuthorizationError } from "@/shared/lib/errors";
import { SessionEntity, UserEntity, UserId } from "../_domain/types";
import { userAbility } from "../_domain/ability";
import { userRepository } from "../_repositoties/user";
export type GetUser = {
  userId: UserId;
  session: SessionEntity;
};
export class GetUserUseCase {
  async exec({ userId, session }: GetUser): Promise<UserEntity> {
    const checkAbility = userAbility(session);
    if (!checkAbility.canGetUser(userId)) {
      throw new AuthorizationError();
    }
    return await userRepository.getUserById(userId);
  }
}

export const getUserUseCase = new GetUserUseCase();
