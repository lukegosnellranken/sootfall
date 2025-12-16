// This file creates a dynamic page for displaying information about a single author on your blog.
// It's essential for Horseman showing readers who wrote the articles and providing details about them.

// We're importing necessary components and functions here.
import AuthorComponent from '../../../components/author-component/AuthorComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// This line tells Next.js how often it should check for updates to this page.
// 'revalidate = 60' for example, means Next.js will try to fetch new data for this page every 60 seconds.
// This ensures that if you update an author's details or add new articles by them in Strapi,
// your website will show the changes relatively quickly.
export const revalidate = 60;

// This function is crucial for making your blog super fast and good for search engines (SEO).
// 'generateStaticParams' tells Next.js to figure out all the possible author pages
// that can exist *before* anyone even visits your site.
// It does this by fetching a list of all authors from your Strapi backend.
// By pre-rendering these pages at build time, users get a lightning-fast experience.
export async function generateStaticParams() {
  try {
    // We make a request to the backend to get all authors.
    // The 'populate=*' part means we want to fetch all related data for each author (like their articles).
    const res = await fetch(`${backendLink}/api/authors?populate=*`, {
      // We include our 'token' here to authenticate our request with the backend.
      headers: { Authorization: `Bearer ${token}` },
      // We also tell Next.js to revalidate this list of authors every 'x' seconds.
      // This helps keep the list of pre-rendered pages up-to-date with your Strapi content.
      next: { revalidate: 60 },
    });
    // We convert the response from the backend into a format our code can understand (JSON).
    const authors = await res.json();

    // Finally, we go through each author and create a 'param' object for them.
    // 'authorName' here refers to the author's name, which will be part of the URL.
    // 'encodeURIComponent(author.name.toLowerCase())' makes sure the author's name is URL-friendly
    // (e.g., spaces become %20, and all letters are lowercase).
    // This list of 'authorName's is what Next.js uses to build all your individual author pages.
    return authors.data.map((author: any) => ({
      authorName: encodeURIComponent(author.name.toLowerCase()),
    }));
  } catch (error) {
    // If something goes wrong while fetching authors, we log the error.
    // This is important for debugging issues in production.
    console.error('Failed to fetch authors:', error);
    // In case of an error, we return an empty array, so Next.js doesn't try to build non-existent pages.
    return [];
  }
}

// This function is responsible for fetching the specific details of a single author.
// It takes the 'authorName' (the URL-friendly version of their name) as input to find the correct author.
async function getAuthor(authorName: string) {
  // We construct a URL to request a specific author from our backend.
  // The 'filters[name][$eqi]=${authorName}' part tells Strapi to find an author
  // where their 'name' matches the 'authorName' we're looking for, ignoring case ($eqi).
  // 'populate=*' again ensures we get all associated data for the author.
  const res = await fetch(
    `${backendLink}/api/authors?filters[name][$eqi]=${authorName}&populate=*`,
    {
      // We send our authorization token with the request.
      headers: { Authorization: `Bearer ${token}` },
      // And we tell Next.js to revalidate this specific author's data every 60 seconds.
      next: { revalidate: 60 },
    }
  );
  // We parse the JSON response from the backend.
  const authors = await res.json();

  // This is a check to see if the author actually exists.
  // If the backend didn't return any data for the given 'authorName', it means the author wasn't found.
  if (!authors.data || authors.data.length === 0) {
    return null;
  }

  // If the author *was* found, we return their data.
  // Strapi usually returns an array, so we take the first item (since names should be unique for slugs).
  return authors.data[0];
}

// This is the main component for your author page.
// It's an 'async' function because it needs to wait for data (like the author's profile and their articles) to be fetched.
// 'params' contains information from the URL, specifically the 'authorName' of the author to display.
export default async function AuthorPage({
  params,
}: {
  params: Promise<{ authorName: string }>;
}) {
  // We extract the 'authorName' from the URL parameters.
  const { authorName } = await params;
  // We decode the 'authorName' from the URL to get the original name (e.g., "%20" becomes a space).
  const decodedAuthorName = decodeURIComponent(authorName);

  // Then, we use our 'getAuthor' function to fetch all the details for that specific author.
  const author = await getAuthor(decodedAuthorName);

  // If 'getAuthor' returned null (meaning the author wasn't found),
  // we call the 'notFound()' function to display the 404 error page.
  if (!author) {
    notFound();
  }

  // We construct the API endpoint to fetch all articles written by this specific author.
  // We filter by author name, populate all related data, and sort by date in descending order (newest first).
  const fetchEndpoint = `${backendLink}/api/articles?filters[author][name][$eqi]=${decodedAuthorName}&populate=*&sort=date:desc`;
  // We use the 'getArticles' helper function to fetch these articles.
  const articles = await getArticles(fetchEndpoint);

  // If the author exists and we have their articles, we render the 'AuthorComponent'.
  // We pass both the 'author' data and the 'articles' written by them to the component
  // so 'AuthorComponent' knows what to display.
  return (
    <div id="div-author-component">
      <AuthorComponent author={author} articles={articles} />
    </div>
  );
}