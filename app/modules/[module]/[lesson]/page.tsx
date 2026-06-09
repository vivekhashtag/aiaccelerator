import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllModules, getLessonList, getLesson } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import LessonLayout from "@/components/lesson/LessonLayout";

interface PageProps {
  params: Promise<{ module: string; lesson: string }>;
}

export async function generateStaticParams() {
  const modules = getAllModules();
  const params: { module: string; lesson: string }[] = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      params.push({ module: mod.module, lesson: lesson.lessonPath });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { module, lesson } = await params;
  const data = getLesson(module, lesson);
  if (!data) return { title: "Lesson Not Found" };
  return {
    title: `${data.meta.title} — AI Inference Course`,
    description: data.meta.summary,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { module, lesson } = await params;

  const data = getLesson(module, lesson);
  if (!data) notFound();

  const allModules = getAllModules();
  const lessonList = getLessonList(module);
  const currentIndex = lessonList.findIndex((l) => l.lessonPath === lesson);

  const prev = currentIndex > 0 ? lessonList[currentIndex - 1] : null;
  const next = currentIndex < lessonList.length - 1 ? lessonList[currentIndex + 1] : null;

  const content = await renderMDX(data.rawContent);

  return (
    <LessonLayout
      meta={data.meta}
      modules={allModules}
      prev={prev}
      next={next}
    >
      {content}
    </LessonLayout>
  );
}
