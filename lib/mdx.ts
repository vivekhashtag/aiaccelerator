import { compileMDX } from "next-mdx-remote/rsc";
import QuizBlock from "@/components/lesson/QuizBlock";
import TransistorSwitch from "@/components/interactives/TransistorSwitch";

const components = {
  QuizBlock,
  TransistorSwitch,
};

export async function renderMDX(source: string) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      parseFrontmatter: false,
    },
  });
  return content;
}
