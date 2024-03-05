import { cn } from "@/shared/ui/utils";
import { coursesRepository } from "../courses-repository";
import { CourseItem } from "../ui/course-item";
import { revalidatePath } from "next/cache";

export async function CoursesList({
  className,
  revalidatePagePath,
}: {
  className: string;
  revalidatePagePath: string;
}) {
  const coursesList = await coursesRepository.getCoursesList();

  const handleDeleteAction = async (courseId: string) => {
    "use server";
    await coursesRepository.deleteCourseElement({ id: courseId });
    revalidatePath(revalidatePagePath);
  };

  return (
    <div className={cn(className, "flex flex-col gap-3")}>
      {coursesList.map((course) => (
        <CourseItem
          key={course.id}
          course={course}
          onDelete={handleDeleteAction.bind(null, course.id)}
        />
      ))}
    </div>
  );
}
