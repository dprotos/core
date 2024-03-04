import { dbClient } from "@/shared/lib/db";
import { cache } from "react";
import {
  CourseListElementType,
  CreateCourseListElementCommand,
  DeleteCourseListElementCommand,
} from "./model/types";

class CoursesRepository {
  getCoursesList = cache(
    (): Promise<CourseListElementType[]> => dbClient.course.findMany(),
  );

  createCourseElement = (
    command: CreateCourseListElementCommand,
  ): Promise<CourseListElementType> => {
    return dbClient.course.create({
      data: command,
    });
  };

  deleteCourseElement = (command: DeleteCourseListElementCommand) => {
    return dbClient.course.delete({
      where: { id: command.id },
    });
  };
}

export const coursesRepository = new CoursesRepository();
