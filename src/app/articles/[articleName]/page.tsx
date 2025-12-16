// This file creates a dynamic page for displaying individual articles on the blog.
// It's a key part of how Horseman shows your content to readers.

// We're importing necessary components and functions here.
import ArticleComponent from '../../../components/article-component/ArticleComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';

// This line tells Next.js how often it should check for updates to this page.
// 'revalidate = 60' for example, means Next.js will try to fetch new data for this page every 60 seconds.
// This ensures that if you update an article in Strapi, your website will show the changes relatively quickly.
export const revalidate = 60;

// This function is crucial for making your blog super fast and good for search engines (SEO).
// 'generateStaticParams' tells Next.js to figure out all the possible article pages
// that can exist *before* anyone even visits your site.
// It does this by fetching a list of all articles from your Strapi backend.
// By pre-rendering these pages at build time, users get a lightning-fast experience.
export async function generateStaticParams() {
  // We make a request to the backend to get all articles.
  // The 'populate=*' part means we want to fetch all related data for each article (like author, tags, images).
  const res = await fetch(`${backendLink}/api/articles?populate=*`, {
    // We include our 'token' here to authenticate our request with the backend.
    headers: { Authorization: `Bearer ${token}` },
    // We also tell Next.js to revalidate this list of articles every 'x' seconds.
    // This helps keep the list of pre-rendered pages up-to-date with your Strapi content.
    next: { revalidate: 60 },
  });
  // We convert the response from the backend into a format our code can understand (JSON).
  const articles = await res.json();

  // Finally, we go through each article and create a 'param' object for it.
  // 'articleName' here refers to the 'slug' of the article (a user-friendly, unique identifier for the article in the URL).
  // This list of 'articleName's is what Next.js uses to build all your individual article pages.
  return articles.data.map((article: any) => ({
    articleName: article.slug,
  }));
}

// This function is responsible for fetching the specific details of a single article.
// It takes the 'articleName' (slug) as input to find the correct article.
async function getArticle(articleName: string) {
  // We construct a URL to request a specific article from our backend.
  // The 'filters[slug][$eq]=${articleName}' part tells Strapi to find an article
  // where its 'slug' matches the 'articleName' we're looking for.
  // 'populate=*' again ensures we get all associated data for the article.
  const res = await fetch(
    `${backendLink}/api/articles?filters[slug][$eq]=${articleName}&populate=*`,
    {
      // We send our authorization token with the request.
      headers: { Authorization: `Bearer ${token}` },
      // And we tell Next.js to revalidate this specific article's data every 'x' seconds.
      next: { revalidate: 60 },
    }
  );
  // We parse the JSON response from the backend.
  const articles = await res.json();

  // This is a check to see if the article actually exists.
  // If the backend didn't return any data for the given 'articleName', it means the article wasn't found.
  if (!articles.data || articles.data.length === 0) {
    return null;
  }

  // If the article *was* found, we return its data.
  // Strapi usually returns an array, so we take the first item (since slugs should be unique).
  return articles.data[0];
}

// This is the main component for your article page.
// It's an 'async' function because it needs to wait for data (like the article content) to be fetched.
// 'params' contains information from the URL, specifically the 'articleName' (slug) of the article to display.
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ articleName: string }>;
}) {
  // We extract the 'articleName' (slug) from the URL parameters.
  const { articleName } = await params;
  // Then, we use our 'getArticle' function to fetch all the details for that specific article.
  const article = await getArticle(articleName);

  // If 'getArticle' returned null (meaning the article wasn't found),
  // we call the 'notFound()' function to display the 404 error page.
  if (!article) {
    notFound();
  }

  // If the article exists, we render the 'ArticleComponent'.
  // We pass the 'article' data to it, so 'ArticleComponent' knows what to display.
  return (
    <div id="div-article-component">
      <ArticleComponent article={article} />
    </div>
  );
}
