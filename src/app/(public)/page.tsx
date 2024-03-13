import { CoursesList } from "@/features/courses-list/courses-list";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <main className="container flex flex-col h-auto p-8">
      <h1 className="text-3xl font-semibold">Courses</h1>
      <CoursesList className="w-[600px] mx-auto" />
    </main>
  );
}
