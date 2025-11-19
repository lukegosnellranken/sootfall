import TagComponent from '../../../components/tag-component/TagComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// This function tells Next.js which tag pages to build at export time
export async function generateStaticParams() {
  try {
    // Fetch all articles to get the tags
    const res = await fetch(`${backendLink}/api/articles?fields[0]=tags`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const articlesData = await res.json();

    if (!articlesData.data) {
      return [];
    }

    // Use a Set to store unique tags
    const uniqueTags = new Set<string>();

    articlesData.data.forEach((article: any) => {
      if (article.tags) {
        const tags = article.tags.split(',').map((tag: string) => tag.trim().toLowerCase());
        tags.forEach((tag: string) => uniqueTags.add(tag));
      }
    });

    // Return an array of objects, where each object has a `tagName` property
    // This should match the name of your dynamic segment folder: [tagName]
    return Array.from(uniqueTags).map(tag => ({
      tagName: encodeURIComponent(tag),
    }));
  } catch (error) {
    console.error('Failed to fetch and process tags:', error);
    return [];
  }
}

type Props = {
    params: Promise<{ tagName: string }>;
};

async function Tag({ params }: Props) {
    const { tagName } = await params;

    // If articles exist, fetch them
    const fetchEndpoint = `${backendLink}/api/articles?filters[tags][$contains]=${tagName}&populate=*&sort=date:desc`;
    const articles = await getArticles(fetchEndpoint);

    // If no articles are found for the tag, render the 404 page
    if (!articles || articles.length === 0) {
        notFound();
    }

    return(
        <div id='div-tag-component'>
            {/* Pass the tag name and articles array to your component */}
            <TagComponent tagName={tagName} articles={articles} />
        </div>
    );
}

export default Tag;
