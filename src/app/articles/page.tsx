import { backendLink } from '../../config/api.ts';
import ArticlesComponent from '../../components/articles-component/ArticlesComponent.js';
import { getArticles } from '../../config/getArticles.ts';

async function Article() {
    // Fetch all articles
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&sort=date:desc`;
    const articles = await getArticles(fetchEndpoint);

    return(
        <div id='div-articles-component'>
            <ArticlesComponent articles = { articles }/>
        </div>
    );
}

export default Article;