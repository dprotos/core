"use client";
import { CourseEntity } from "@/entities/course/course";
import { useMdxComponent } from "@/shared/lib/mdx";
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";

import { useTransition } from "react";

export function CourseItem({ course }: { course: CourseEntity }) {
  const [isLoadingDelete, startDeleteTransition] = useTransition();
  const Description = useMdxComponent(course.description);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <Description size="sm" />
      </CardHeader>
    </Card>
  );
}
