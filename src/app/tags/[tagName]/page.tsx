// This file creates a dynamic page for displaying articles associated with a specific tag.
// It's crucial for organizing content by topic and improving discoverability on the blog.

// We're importing necessary components and functions here.
import TagComponent from '../../../components/tag-component/TagComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// This line tells Next.js how often it should check for updates to this page.
// 'revalidate = 60' for example, means Next.js will try to fetch new data for this page every 60 seconds.
// This ensures that if you update articles or their tags, the tag pages will show the changes relatively quickly.
export const revalidate = 60;

// This function is essential for making your blog fast and good for search engines (SEO).
// 'generateStaticParams' tells Next.js to figure out all the possible tag pages
// that can exist *before* anyone even visits your site.
// It does this by fetching all articles from your Strapi backend and extracting all unique tags from them.
// By pre-rendering these pages at build time, users get a lightning-fast experience.
export async function generateStaticParams() {
  try {
    // We make a request to the backend to get all articles, but we only need their 'tags' field.
    const res = await fetch(`${backendLink}/api/articles?fields[0]=tags`, {
      // We include our 'token' here to authenticate our request with the backend.
      headers: { Authorization: `Bearer ${token}` },
      // We also tell Next.js to revalidate this list of tags every 'x' seconds.
      // This helps keep the list of pre-rendered tag pages up-to-date with your Strapi content.
      next: { revalidate: 60 },
    });
    // We convert the response from the backend into a format our code can understand (JSON).
    const articlesData = await res.json();

    // If there's no data, we return an empty array, meaning no tag pages will be generated.
    if (!articlesData.data) {
      return [];
    }

    // We use a 'Set' to store unique tags, as an article might have multiple tags
    // and we only want each tag to appear once.
    const uniqueTags = new Set<string>();

    // We loop through each article to extract its tags.
    articlesData.data.forEach((article: any) => {
      // Check if the article actually has tags.
      if (article.tags) {
        // Split the tags string into individual tags, trim whitespace, and convert to lowercase
        // for consistent handling (e.g., "Tag1, tag2" becomes ["tag1", "tag2"]).
        const tags = article.tags
          .split(',')
          .map((tag: string) => tag.trim().toLowerCase());
        // Add each processed tag to our set of unique tags.
        tags.forEach((tag: string) => uniqueTags.add(tag));
      }
    });

    // Finally, we convert our set of unique tags into an array of 'param' objects.
    // 'tagName' here is the URL-friendly version of the tag (e.g., spaces replaced with %20).
    // This list of 'tagName's is what Next.js uses to build all your individual tag pages.
    return Array.from(uniqueTags).map((tag) => ({
      tagName: encodeURIComponent(tag),
    }));
  } catch (error) {
    // If something goes wrong during fetching or processing, we log the error
    // and return an empty array to prevent the build from failing.
    console.error('Failed to fetch and process tags:', error);
    return [];
  }
}

// This is the main component for your tag page.
// It's an 'async' function because it needs to wait for data (like the articles for the tag) to be fetched.
// 'params' contains information from the URL, specifically the 'tagName' of the tag to display.
export default async function TagPage({
  params,
}: {
  params: Promise<{ tagName: string }>;
}) {
  // We 'await' the 'params' to make sure we have access to the tag name.
  const { tagName } = await params;
  // The tag name from the URL might be encoded (e.g., spaces replaced with %20).
  // We decode it so it's readable for our queries and display.
  const decodedTagName = decodeURIComponent(tagName);

  // We construct the API endpoint URL to fetch articles that contain the specific tag.
  // 'filters[tags][$contains]=${decodedTagName}' tells Strapi to find articles where
  // the 'tags' field contains the 'decodedTagName'.
  // 'populate=*' ensures we get all related data for each article.
  // 'sort=date:desc' sorts the articles by their publication date in descending order (newest first).
  const fetchEndpoint = `${backendLink}/api/articles?filters[tags][$contains]=${decodedTagName}&populate=*&sort=date:desc`;
  // We call our 'getArticles' utility function to fetch the articles for this tag.
  const articles = await getArticles(fetchEndpoint);

  // If no articles are returned for the given tag (or the array is empty),
  // it means the tag either doesn't exist or has no associated articles.
  // In this case, we call the 'notFound()' function to display the 404 error page.
  if (!articles || articles.length === 0) {
    notFound();
  }

  // If articles *are* found, we render the 'TagComponent'.
  // We pass the 'decodedTagName' and the fetched 'articles' array to this component
  // so it can display the tag title and the list of relevant articles.
  return (
    <div id="div-tag-component">
      <TagComponent tagName={decodedTagName} articles={articles} />
    </div>
  );
}