import TagComponent from '../../../components/tag-component/TagComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';

// This function tells Next.js which tag pages to build at export time
export async function generateStaticParams() {
  try {
    // Fetch the list of all tags from your API
    const res = await fetch(`${backendLink}/api/tags?populate=*`, {headers: {'Authorization': `Bearer ${token}`}});
    const tags = await res.json();
   
    // Return an array of objects, where each object has a `tagName` property
    // This should match the name of your dynamic segment folder: [tagName]
    return tags.data.map((tag: any) => ({
      tagName: tag.name.toLowerCase(),
    }));
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return [];
  }
}

// Fetches articles by tag name
async function getArticlesByTag(tagName: string) {
    // Fetch articles from your API using a filter on the tag name
    const res = await fetch(`${backendLink}/api/articles?filters[tags][$contains]=${tagName}&populate=*`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
    const articles = await res.json();

    // If no articles are found for the tag, return null
    if (!articles.data || articles.data.length === 0) {
        return null;
    }

    return articles.data;
}

type Props = {
    params: Promise<{ tagName: string }>;
};

async function Tag({ params }: Props) {
    const { tagName } = await params;
    console.log(tagName)
    const articles = await getArticlesByTag(tagName);

    // If no articles are found for the tag, render the 404 page
    if (!articles) {
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
