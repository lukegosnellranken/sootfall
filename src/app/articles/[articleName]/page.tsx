import ArticleComponent from '../../../components/article-component/ArticleComponent';
import './article.scss';
import { notFound } from 'next/navigation';

// Centralized API configuration
const env = process.env.NEXT_PUBLIC_ENV;
let backendLink: string;
let token: string;

if (env === 'local') {
    backendLink = process.env.NEXT_PUBLIC_API_URL_LOCAL || '';
    token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL || '';
} else if (env === 'cloud') {
    backendLink = process.env.NEXT_PUBLIC_API_URL_CLOUD || '';
    token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD || '';
} else {
    throw new Error("NEXT_PUBLIC_ENV is not set or invalid. Check your .env file.");
}

if (!backendLink || !token) {
    throw new Error("API URL or Token is not configured. Check your .env file.");
}

// This function tells Next.js which article pages to build at export time
export async function generateStaticParams() {
  // Fetch the list of all articles from your API
  const res = await fetch(`${backendLink}/api/articles?populate=*`, {headers: {'Authorization': `Bearer ${token}`}});
  const articles = await res.json();
 
  // Return an array of objects, where each object has an `articleName` property
  // This should match the name of your dynamic segment folder: [articleName]
  return articles.data.map((article: any) => ({
    articleName: article.title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, ""),
  }));
}

// Fetches a single article by its slug
async function getArticle(articleName: string) {
    // Convert the URL slug back into a title format for querying (e.g., "lorem-ipsum" -> "lorem ipsum")
    const titleFromSlug = articleName.replace(/-/g, ' ');

    // Fetch the specific article from your API using a case-insensitive filter on the title
    const res = await fetch(`${backendLink}/api/articles?filters[title][$eqi]=${titleFromSlug}&populate=*`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
    const articles = await res.json();

    // If no article is found, return null
    if (!articles.data || articles.data.length === 0) {
        return null;
    }

    return articles.data[0];
}

async function Article({ params }: { params: { articleName: string } }) {
    const article = await getArticle(params.articleName);

    // If no article is found, render the 404 page
    if (!article) {
        notFound();
    }

    return(
        <div id='div-article-component'>
            {/* Pass the full article object to your component */}
            <ArticleComponent article={article} />
        </div>
    );
}

export default Article;
