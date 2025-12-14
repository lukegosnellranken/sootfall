import ArticleComponent from '../../../components/article-component/ArticleComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';

// Tell Next.js how often to revalidate this page (in seconds)
export const revalidate = 60; // regenerate every 60 seconds

// This function tells Next.js which article pages to pre-render at build time
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

// Fetches a single article by its slug
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

interface Props {
  params: { articleName: string };
}

export default async function Article({ params }: Props) {
  // params is a plain object, no await
  const article = await getArticle(params.articleName);

  if (!article) {
    notFound();
  }

  return (
    <div id="div-article-component">
      <ArticleComponent article={article} />
    </div>
  );
}