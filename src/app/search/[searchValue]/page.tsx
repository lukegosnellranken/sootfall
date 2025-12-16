// This file creates a dynamic page to display search results on your blog.
// When a user searches for something, this Horseman fetches and presents relevant articles.

// We're importing necessary components and functions here.
import ArticlesComponent from '../../../components/articles-component/ArticlesComponent.js';
import { notFound } from 'next/navigation.js';
import { backendLink } from '../../../config/api.ts';
import { getArticles } from '../../../config/getArticles.ts';

// This defines the expected structure for the parameters that this page will receive.
// Specifically, it expects a 'searchValue' which will be a string representing the user's search query.
type Props = {
    params: Promise<{ searchValue: string }>;
};

// This is the main asynchronous function that generates the search results page.
// It takes 'params' as an argument, which contains the 'searchValue' from the URL.
async function Search({ params }: Props) {
    // We extract the 'searchValue' from the URL parameters.
    const { searchValue } = await params;
    // The search value from the URL might be encoded (e.g., spaces become %20), so we decode it
    // to get the original search query that the user typed.
    const decodedSearchValue = decodeURIComponent(searchValue);

    // This is where we construct the API endpoint to fetch articles that match the search query.
    // We're looking for articles where the search value appears in the title, tags, author's name, or date.
    // `$containsi` means "contains, case-insensitive", allowing for flexible searching.
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&filters[$or][0][title][$containsi]=${decodedSearchValue}&filters[$or][1][tags][$containsi]=${decodedSearchValue}&filters[$or][2][author][name][$containsi]=${decodedSearchValue}&filters[$or][3][date][$containsi]=${decodedSearchValue}`;
    // We use the 'getArticles' helper function to send this request and retrieve the matching articles.
    const articles = await getArticles(fetchEndpoint);

    // If no articles are found for the given search value, we display a "page not found" error.
    // This ensures a clear user experience when a search yields no results.
    if (!articles || articles.length === 0) {
        notFound();
    }

    // If articles are found, we render the 'ArticlesComponent'.
    // We pass both the original 'searchValue' and the fetched 'articles' to this component
    // so it can display the results appropriately.
    return(
        <div id='div-search-component'>
            {/* Pass the search value and articles array to your component */}
            <ArticlesComponent searchValue={searchValue} articles={articles} />
        </div>
    );
}

// We export the 'Search' component as the default export for this page.
export default Search;