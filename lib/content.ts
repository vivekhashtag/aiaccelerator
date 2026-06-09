import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface LessonMeta {
  title: string;
  module: string;
  moduleTitle: string;
  lesson: string;
  slug: string;
  summary: string;
  prerequisites: string[];
}

export interface LessonEntry {
  meta: LessonMeta;
  modulePath: string;
  lessonPath: string;
}

export interface ModuleEntry {
  module: string;
  moduleTitle: string;
  lessons: LessonEntry[];
}

function readMeta(filePath: string): LessonMeta {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    title: data.title ?? "Untitled",
    module: data.module ?? "00",
    moduleTitle: data.moduleTitle ?? "Module",
    lesson: data.lesson ?? "00",
    slug: data.slug ?? "lesson",
    summary: data.summary ?? "",
    prerequisites: data.prerequisites ?? [],
  };
}

export function getAllModules(): ModuleEntry[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const moduleDirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  return moduleDirs.map((moduleDir) => {
    const modulePath = path.join(CONTENT_DIR, moduleDir);
    const files = fs
      .readdirSync(modulePath)
      .filter((f) => f.endsWith(".mdx"))
      .sort();

    const lessons: LessonEntry[] = files.map((file) => {
      const filePath = path.join(modulePath, file);
      const meta = readMeta(filePath);
      return {
        meta,
        modulePath: moduleDir,
        lessonPath: file.replace(/\.mdx$/, ""),
      };
    });

    const firstMeta = lessons[0]?.meta;
    return {
      module: firstMeta?.module ?? moduleDir.replace("module-", ""),
      moduleTitle: firstMeta?.moduleTitle ?? moduleDir,
      lessons,
    };
  });
}

export function getLessonList(moduleParam: string): LessonEntry[] {
  const moduleDir = `module-${moduleParam}`;
  const modulePath = path.join(CONTENT_DIR, moduleDir);
  if (!fs.existsSync(modulePath)) return [];

  return fs
    .readdirSync(modulePath)
    .filter((f) => f.endsWith(".mdx"))
    .sort()
    .map((file) => {
      const filePath = path.join(modulePath, file);
      const meta = readMeta(filePath);
      return {
        meta,
        modulePath: moduleDir,
        lessonPath: file.replace(/\.mdx$/, ""),
      };
    });
}

export function getLesson(
  moduleParam: string,
  lessonParam: string
): { meta: LessonMeta; rawContent: string } | null {
  const moduleDir = `module-${moduleParam}`;
  const modulePath = path.join(CONTENT_DIR, moduleDir);
  if (!fs.existsSync(modulePath)) return null;

  const files = fs.readdirSync(modulePath).filter((f) => f.endsWith(".mdx"));
  const file = files.find((f) => f.replace(/\.mdx$/, "") === lessonParam);
  if (!file) return null;

  const filePath = path.join(modulePath, file);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      title: data.title ?? "Untitled",
      module: data.module ?? moduleParam,
      moduleTitle: data.moduleTitle ?? "Module",
      lesson: data.lesson ?? "00",
      slug: data.slug ?? lessonParam,
      summary: data.summary ?? "",
      prerequisites: data.prerequisites ?? [],
    },
    rawContent: content,
  };
}
