import { CoursesList } from "@/features/courses-list/pub/courses-list";
import { CreateCourseForm } from "@/features/courses-list/pub/create-course-form";

export default async function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8">
      <h1>Courses</h1>
      <CreateCourseForm
        className="w-[600px] mb-5 mx-auto"
        revalidatePagePath="/"
      />
      <CoursesList className="w-[600px] mx-auto" revalidatePagePath="/" />
    </main>
  );
}
