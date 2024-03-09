import { ROLES, SessionEntity, UserId } from "./types";

export const userAbility = (session: SessionEntity) => ({
  canGetUser: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});

export const profileAbility = (session: SessionEntity) => ({
  canUpdateProfile: (userId: UserId) =>
    session.user.id === userId || session.user.role === ROLES.ADMIN,
});
