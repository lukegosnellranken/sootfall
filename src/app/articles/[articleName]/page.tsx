import ArticleComponent from '../../../components/article-component/ArticleComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';

// Tell Next.js how often to revalidate this page (in seconds)
export const revalidate = 60; // regenerate every 60 seconds

// Pre-render article pages at build time
export async function generateStaticParams() {
  const res = await fetch(`${backendLink}/api/articles?populate=*`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  });
  const articles = await res.json();

  return articles.data.map((article: any) => ({
    articleName: article.slug,
  }));
}

// Fetch a single article by its slug
async function getArticle(articleName: string) {
  const res = await fetch(
    `${backendLink}/api/articles?filters[slug][$eq]=${articleName}&populate=*`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    }
  );
  const articles = await res.json();

  if (!articles.data || articles.data.length === 0) {
    return null;
  }

  return articles.data[0];
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleName: string }>;
}) {
  // Await params before using
  const { articleName } = await params;
  const article = await getArticle(articleName);

  if (!article) {
    notFound();
  }

  return (
    <div id="div-article-component">
      <ArticleComponent article={article} />
    </div>
  );
}