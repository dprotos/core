"use server";

import { revalidatePath } from "next/cache";
import { coursesRepository } from "./courses-repository";
import { CreateCourseListElementCommand } from "./model/types";

export const createCourseAction = async (
  command: CreateCourseListElementCommand,
  revalidatePagePath: string,
) => {
  await coursesRepository.createCourseElement(command);
  revalidatePath(revalidatePagePath);
};
