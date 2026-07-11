import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { workEntries, getWork } from "@content/work";
import { siteUrl } from "@content/site-url";
import { WorkView } from "@/components/WorkView";

export function generateStaticParams() {
  return workEntries.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) return { title: "Work" };

  const kind = work.kind === "role" ? "Role" : "Project";
  const title = `${work.title} — ${kind}`;
  const url = `${siteUrl}/work/${work.slug}`;
  const image = work.preview.startsWith("http")
    ? work.preview
    : `${siteUrl}${work.preview}`;

  return {
    title,
    description: work.tagline,
    alternates: {
      canonical: `/work/${work.slug}`,
    },
    openGraph: {
      title,
      description: work.tagline,
      url,
      type: "article",
      images: [
        {
          url: work.preview,
          alt: `${work.title} preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: work.tagline,
      images: [image],
      creator: "@shahawi_",
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();
  return <WorkView work={work} />;
}
