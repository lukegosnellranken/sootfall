// This file creates the main articles listing page for the blog.
// It displays a list of all available articles, typically sorted by date.

// We're importing necessary components and functions here.
import { backendLink } from '../../config/api.ts';
import ArticlesComponent from '../../components/articles-component/ArticlesComponent.js';
import { getArticles } from '../../config/getArticles.ts';

// This is the main component for the articles page.
// It's an 'async' function because it needs to fetch data (the list of articles) from the backend.
async function Article() {
    // We construct the API endpoint URL to fetch all articles.
    // 'populate=*' ensures we get all related data for each article (like author, tags, images).
    // 'sort=date:desc' sorts the articles by their publication date in descending order (newest first).
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&sort=date:desc`;
    // We call our 'getArticles' utility function to fetch the articles from the constructed endpoint.
    const articles = await getArticles(fetchEndpoint);

    // We return the 'ArticlesComponent', passing the fetched 'articles' array to it.
    // This component will then take care of rendering each article in the list.
    return(
        <div id='div-articles-component'>
            <ArticlesComponent articles = { articles }/>
        </div>
    );
}

// We export the 'Article' component as the default export for this page.
export default Article;