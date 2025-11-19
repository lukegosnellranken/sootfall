import ArticlesComponent from '../../../components/articles-component/ArticlesComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

type Props = {
    params: Promise<{ searchValue: string }>;
};

async function Search({ params }: Props) {
    const { searchValue } = await params;
    const decodedSearchValue = decodeURIComponent(searchValue);

    // If articles exist, fetch them
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&filters[$or][0][title][$containsi]=${decodedSearchValue}&filters[$or][1][tags][$containsi]=${decodedSearchValue}&filters[$or][2][author][name][$containsi]=${decodedSearchValue}&filters[$or][3][date][$containsi]=${decodedSearchValue}`;
    const articles = await getArticles(fetchEndpoint);

    // If no articles are found for the search value, render the 404 page
    if (!articles || articles.length === 0) {
        notFound();
    }

    return(
        <div id='div-search-component'>
            {/* Pass the search value and articles array to your component */}
            <ArticlesComponent searchValue={searchValue} articles={articles} />
        </div>
    );
}

export default Search;
