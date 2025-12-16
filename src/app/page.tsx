// This file defines the main `Page` component for the application's home route.
// It fetches article data from the backend API and passes it into `HomeComponent`
// so the homepage can display the latest articles.

import { backendLink } from '../config/api.ts';
import HomeComponent from '../components/home-component/HomeComponent.js';
import { getArticles } from '../config/getArticles.ts';

// The `Page` component is asynchronous because it fetches data before rendering.
// This ensures the homepage always loads with fresh article content.
async function Page() {
    // Construct the API endpoint for fetching articles.
    // `populate=*` includes related data (like images or authors).
    // `sort=date:desc` ensures the newest articles appear first.
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&sort=date:desc`;

    // Fetch articles from the backend using the helper function.
    const articles = await getArticles(fetchEndpoint);

    // Render the homepage component, passing in the fetched articles.
    return <HomeComponent articles={articles} />;
}

// Export the `Page` component as the default export.
// Next.js uses this as the entry point for the home route.
export default Page;