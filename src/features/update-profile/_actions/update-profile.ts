"use server";
import { z } from "zod";
import { getAppSessionServerStrict } from "@/entities/user/session.server";
import { updateProfileUseCase } from "@/entities/user/profile.server";
import { profileSchema } from "@/entities/user/profile";

const propsSchema = z.object({
  userId: z.string(),
  data: profileSchema.partial(),
});

const resultSchema = z.object({
  profile: profileSchema,
});

export const updateProfileAction = async (
  props: z.infer<typeof propsSchema>,
) => {
  const { userId, data } = propsSchema.parse(props);

  const session = await getAppSessionServerStrict();
  const profile = await updateProfileUseCase.exec({ userId, data, session });

  return resultSchema.parseAsync({ profile: profile });
};
