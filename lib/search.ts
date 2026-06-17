import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllModules } from "./content";

/* A single searchable lesson record. Kept small + serialisable so the whole
   index ships as one static JSON the browser fetches once (on first search). */
export interface SearchRecord {
  module: string;       // "01" … "10"  (route param)
  moduleTitle: string;
  lesson: string;       // "1.1"
  slug: string;
  lessonPath: string;   // filename without .mdx → second route segment
  title: string;
  summary: string;
  headings: string[];   // ## / ### section headings
  text: string;         // stripped prose, capped for index size
}

/* Turn MDX into plain searchable prose: drop code fences, JSX components,
   import/export lines, and markdown markup; capture section headings first. */
function toPlainText(mdx: string): { text: string; headings: string[] } {
  // 1. strip fenced code blocks (not useful for concept search, and noisy)
  let body = mdx.replace(/```[\s\S]*?```/g, " ");

  // 2. capture headings BEFORE we strip markdown punctuation
  const headings: string[] = [];
  for (const m of body.matchAll(/^#{2,4}\s+(.+?)\s*$/gm)) {
    headings.push(m[1].replace(/[#*`_]/g, "").trim());
  }

  // 3. remove MDX import/export lines and any JSX tags
  body = body.replace(/^\s*(import|export)\s.*$/gm, " ");
  body = body.replace(/<[^>]+>/g, " ");

  // 4. markdown → text: images out, links keep their label, drop the rest
  body = body.replace(/!\[[^\]]*\]\([^)]*\)/g, " ");
  body = body.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1");
  body = body.replace(/&[a-z]+;/gi, " ");          // entities (&lt;, &#123; …)
  body = body.replace(/[#>*_`~|]/g, " ");
  body = body.replace(/\s+/g, " ").trim();

  return { text: body, headings };
}

/* Build the full index by reading every lesson's MDX. Runs at build time
   (the consuming route handler is force-static), so fs access is fine. */
export function buildSearchIndex(): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const mod of getAllModules()) {
    for (const lesson of mod.lessons) {
      const filePath = path.join(
        process.cwd(),
        "content",
        lesson.modulePath,
        `${lesson.lessonPath}.mdx`
      );
      const { content } = matter(fs.readFileSync(filePath, "utf8"));
      const { text, headings } = toPlainText(content);

      records.push({
        module: lesson.meta.module,
        moduleTitle: lesson.meta.moduleTitle,
        lesson: lesson.meta.lesson,
        slug: lesson.meta.slug,
        lessonPath: lesson.lessonPath,
        title: lesson.meta.title,
        summary: lesson.meta.summary,
        headings,
        text: text.slice(0, 2500),   // cap per-lesson body to bound index size
      });
    }
  }

  return records;
}
