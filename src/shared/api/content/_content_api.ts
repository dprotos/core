import { CacheStrategy } from "./_lib/cache-strategy";
import { ContentParser } from "./_lib/content-parser";
import { FileFetcher } from "./_lib/file-fetcher";
import { Course } from "./_schemas/course.schema";
import { Lesson } from "./_schemas/lesson.schema";
import { Manifest } from "./_schemas/manifest.schema";
import manifestSchema from "./_schemas/manifest.schema.json";
import courseSchema from "./_schemas/course.schema.json";
import lessonSchema from "./_schemas/lesson.schema.json";
import { join } from "path";
import { loggedMethod } from "@/shared/lib/logger";

interface Dependencies {
  cacheStrategy: CacheStrategy;
  contentParser: ContentParser;
  fileFetcher: FileFetcher;
}
type Slug = string;

export class ContentApi {
  constructor(
    private baseUrl: string,
    private d: Dependencies,
  ) {}

  async fetchManifest() {
    return this.d.cacheStrategy.fetch(["manifest"], () =>
      this.fetchManifestQuery(),
    );
  }

  private async fetchManifestQuery() {
    const text: string = await this.d.fileFetcher.fetchText(
      this.getManifestUrl(),
    );
    return await this.d.contentParser.parse<Manifest>(text, manifestSchema);
  }

  async fetchCourse(courseSlug: Slug) {
    const fetchData = async () => {
      const text: string = await this.d.fileFetcher.fetchText(
        this.getCourseUrl(courseSlug),
      );
      return await this.d.contentParser.parse<Course>(text, courseSchema);
    };
    return this.d.cacheStrategy.fetch(["course", courseSlug], fetchData);
  }

  async fetchLesson(courseSlug: Slug, lessonSlug: Slug) {
    const fetchData = async () => {
      const text: string = await this.d.fileFetcher.fetchText(
        this.getLessontUrl(courseSlug, lessonSlug),
      );
      return await this.d.contentParser.parse<Lesson>(text, lessonSchema);
    };
    return this.d.cacheStrategy.fetch(
      ["lesson", courseSlug, lessonSlug],
      fetchData,
    );
  }

  private getManifestUrl() {
    return join(this.baseUrl, "manifest.yaml");
  }

  private getCourseUrl(courseSlug: Slug) {
    return join(this.baseUrl, "courses", courseSlug, "course.yaml");
  }

  private getLessontUrl(courseSlug: Slug, lessonSlug: Slug) {
    return join(
      this.baseUrl,
      "courses",
      courseSlug,
      "lessons",
      lessonSlug,
      "lesson.yaml",
    );
  }
}
