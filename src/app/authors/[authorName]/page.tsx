import AuthorComponent from '../../../components/author-component/AuthorComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// Tell Next.js how often to revalidate this page (in seconds)
export const revalidate = 60; // regenerate every 60 seconds

// Pre-render author pages at build time
export async function generateStaticParams() {
  try {
    const res = await fetch(`${backendLink}/api/authors?populate=*`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    });
    const authors = await res.json();

    return authors.data.map((author: any) => ({
      authorName: encodeURIComponent(author.name.toLowerCase()),
    }));
  } catch (error) {
    console.error('Failed to fetch authors:', error);
    return [];
  }
}

// Fetch a single author
async function getAuthor(authorName: string) {
  const res = await fetch(
    `${backendLink}/api/authors?filters[name][$eqi]=${authorName}&populate=*`,
    {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 60 },
    }
  );
  const authors = await res.json();

  if (!authors.data || authors.data.length === 0) {
    return null;
  }

  return authors.data[0];
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ authorName: string }>;
}) {
  // ✅ Await params before using
  const { authorName } = await params;
  const decodedAuthorName = decodeURIComponent(authorName);

  const author = await getAuthor(decodedAuthorName);

  if (!author) {
    notFound();
  }

  const fetchEndpoint = `${backendLink}/api/articles?filters[author][name][$eqi]=${decodedAuthorName}&populate=*&sort=date:desc`;
  const articles = await getArticles(fetchEndpoint);

  return (
    <div id="div-author-component">
      <AuthorComponent author={author} articles={articles} />
    </div>
  );
}