// This file creates the search results page for the blog.
// It allows users to search for articles based on various criteria like title, tags, author, and date.

// This line ensures that the page is always rendered dynamically on the server.
// 'force-dynamic' means that Next.js will not try to statically optimize or cache this page at build time.
// Instead, every request to this page will result in a fresh rendering, which is necessary for search results that change frequently.
export const dynamic = 'force-dynamic';

// We're importing necessary components and functions here.
import ArticlesComponent from '../../components/articles-component/ArticlesComponent.js';
import NoResults from '../no-results.tsx';
import { backendLink } from '../../config/api.ts';
import { getArticles } from '../../config/getArticles.ts';

// This is the main component for the search page.
// It's an 'async' function because it needs to fetch data (the search results) from the backend.
// 'searchParams' contains the query parameters from the URL, specifically the 'q' parameter which holds the search term.
async function Search({ searchParams }: { searchParams?: Promise<{ q: string }> }) {
    // We 'await' the 'searchParams' to make sure we have access to the search query.
    const params = await searchParams;
    // We extract the search value from the 'q' parameter. If it's not present, we default to an empty string.
    const searchValue = params?.q || "";
    // The search value from the URL might be encoded (e.g., spaces replaced with %20).
    // We decode it so it's readable for our search queries and display.
    const decodedSearchValue = decodeURIComponent(searchValue);

    // We construct the API endpoint URL to fetch articles.
    // This URL includes filters to search across multiple fields:
    // - 'title': Searches for the search value within the article's title.
    // - 'tags': Searches within the article's tags.
    // - 'author[name]': Searches within the author's name.
    // - 'date': Searches within the article's publication date.
    // The 'populate=*' part ensures we get all related data for each article (like author, tags, images).
    // The 'filters[$or]' means we are looking for articles that match *any* of the specified criteria.
    // The '[$containsi]' means the search is case-insensitive and looks for partial matches.
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&filters[$or][0][title][$containsi]=${decodedSearchValue}&filters[$or][1][tags][$containsi]=${decodedSearchValue}&filters[$or][2][author][name][$containsi]=${decodedSearchValue}&filters[$or][3][date][$containsi]=${decodedSearchValue}`;
    // We call our 'getArticles' utility function to fetch the articles from the constructed endpoint.
    const articles = await getArticles(fetchEndpoint);

    // If no articles are returned from the backend (or the array is empty),
    // it means no results were found for the given search value.
    // In this case, we render the 'NoResults' component, passing the decoded search term to it.
    if (!articles || articles.length === 0) {
        return (
            NoResults(decodedSearchValue)
        );
    }

    // If articles *are* found, we render the 'ArticlesComponent'.
    // We pass both the original 'searchValue' and the fetched 'articles' array to this component
    // so it can display the results.
    return(
        <div id='div-search-component'>
            {/* Pass the search value and articles array to your component */}
            <ArticlesComponent searchValue={searchValue} articles={articles} />
        </div>
    );
}

// We export the 'Search' component as the default export for this page.
export default Search;