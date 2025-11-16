import ArticleComponent from '../../../components/article-component/ArticleComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink, token } from '../../../config/api.ts';

// This function tells Next.js which article pages to build at export time
export async function generateStaticParams() {
  // Fetch the list of all articles from your API
  const res = await fetch(`${backendLink}/api/articles?populate=*`, {headers: {'Authorization': `Bearer ${token}`}});
  const articles = await res.json();
 
  // Return an array of objects, where each object has an `articleName` property
  // This should match the name of your dynamic segment folder: [articleName]
  return articles.data.map((article: any) => ({
    articleName: article.slug,
  }));
}

// Fetches a single article by its slug
async function getArticle(articleName: string) {
    // Fetch the specific article from your API using a filter on the slug
    const res = await fetch(`${backendLink}/api/articles?filters[slug][$eq]=${articleName}&populate=*`, {
        headers: {'Authorization': `Bearer ${token}`}
    });
    const articles = await res.json();

    // If no article is found, return null
    if (!articles.data || articles.data.length === 0) {
        return null;
    }

    return articles.data[0];
}


type Props = {
    params: Promise<{ articleName: string }>;
};

async function Article({ params }: Props) {
    const { articleName } = await params;
    const article = await getArticle(articleName);


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
