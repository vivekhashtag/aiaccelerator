import { buildSearchIndex } from "@/lib/search";

// Statically generated at build time → served as a static asset on Vercel.
// The browser fetches this once, on the first time search is opened.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}
