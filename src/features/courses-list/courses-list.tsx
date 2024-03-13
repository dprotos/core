import { cn } from "@/shared/ui/utils";
import { coursesRepository } from "../../entities/course/_repositories/course";
import { CourseItem } from "./_ui/course-item";
import { useMdxComponent } from "@/shared/lib/mdx";
import { compileMDX } from "@/shared/lib/mdx/server";

export async function CoursesList({ className }: { className: string }) {
  const coursesList = await coursesRepository.getCoursesList();

  const compiledCourses = await Promise.all(
    coursesList.map(async (course) => ({
      ...course,
      description: await compileMDX(course.description).then((r) => r.code),
    })),
  );

  return (
    <div className={cn(className, "flex flex-col gap-3")}>
      {compiledCourses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}
