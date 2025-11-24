export const dynamic = 'force-dynamic';

import ArticlesComponent from '../../components/articles-component/ArticlesComponent.js';
import NoResults from '../no-results.tsx';
import { backendLink } from '../../config/api.ts';
import { getArticles } from '../../config/getArticles.ts';

async function Search({ searchParams }: { searchParams?: Promise<{ q: string }> }) {
    // Await searchParams before using it
    const params = await searchParams;
    const searchValue = params?.q || "";
    const decodedSearchValue = decodeURIComponent(searchValue);

    // If articles exist, fetch them
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&filters[$or][0][title][$containsi]=${decodedSearchValue}&filters[$or][1][tags][$containsi]=${decodedSearchValue}&filters[$or][2][author][name][$containsi]=${decodedSearchValue}&filters[$or][3][date][$containsi]=${decodedSearchValue}`;
    const articles = await getArticles(fetchEndpoint);

    // If no articles are found for the search value, render the NoResults page
    if (!articles || articles.length === 0) {
        return (
            NoResults(decodedSearchValue)
        );
    }

    return(
        <div id='div-search-component'>
            {/* Pass the search value and articles array to your component */}
            <ArticlesComponent searchValue={searchValue} articles={articles} />
        </div>
    );
}

export default Search;