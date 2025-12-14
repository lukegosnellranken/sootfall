import TagComponent from '../../../components/tag-component/TagComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// Tell Next.js how often to revalidate this page (in seconds)
export const revalidate = 60; // regenerate every 60 seconds

// Pre-render tag pages at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${backendLink}/api/articles?fields[0]=tags`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    const articlesData = await res.json();

    if (!articlesData.data) {
      return [];
    }

    const uniqueTags = new Set<string>();

    articlesData.data.forEach((article: any) => {
      if (article.tags) {
        const tags = article.tags
          .split(',')
          .map((tag: string) => tag.trim().toLowerCase());
        tags.forEach((tag: string) => uniqueTags.add(tag));
      }
    });

    return Array.from(uniqueTags).map((tag) => ({
      tagName: encodeURIComponent(tag),
    }));
  } catch (error) {
    console.error('Failed to fetch and process tags:', error);
    return [];
  }
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tagName: string }>;
}) {
  // Await params before using
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);

  const fetchEndpoint = `${backendLink}/api/articles?filters[tags][$contains]=${decodedTagName}&populate=*&sort=date:desc`;
  const articles = await getArticles(fetchEndpoint);

  if (!articles || articles.length === 0) {
    notFound();
  }

  return (
    <div id="div-tag-component">
      <TagComponent tagName={decodedTagName} articles={articles} />
    </div>
  );
}