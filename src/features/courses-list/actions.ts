"use server";

import { revalidatePath } from "next/cache";
import { coursesRepository } from "../../entities/course/_repositories/course";
import { CreateCourseListElementCommand } from "../../entities/course/_domain/types";

export const createCourseAction = async (
  command: CreateCourseListElementCommand,
  revalidatePagePath: string,
) => {
  await coursesRepository.createCourseElement(command);
  revalidatePath(revalidatePagePath);
};
