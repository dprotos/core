"use server";
import { z } from "zod";
import { getUserUseCase } from "../_use-cases/get-user";
import { getAppSessionServerStrict } from "../session.server";
import { profileSchema } from "../_domain/schema";

const propsSchema = z.object({
  userId: z.string(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const getUserProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId } = propsSchema.parse(props);

  const session = await getAppSessionServerStrict();
  const user = await getUserUseCase.exec({ userId, session });

  return resultSchema.parseAsync({ profile: user });
};
