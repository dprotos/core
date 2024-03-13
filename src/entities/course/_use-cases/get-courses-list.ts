import { coursesRepository } from "../_repositories/course";

type GetCoursesList = {};

export class GetCoursesListUseCase {
  async exec(data: GetCoursesList) {
    return coursesRepository.getCoursesList();
  }
}

export const _getCoursesListUseCase = new GetCoursesListUseCase();
