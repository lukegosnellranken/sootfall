import { backendLink } from '../config/api.ts';
import HomeComponent from '../components/home-component/HomeComponent.js';
import { getArticles } from '../config/getArticles.ts';

async function Page() {
    // Fetch all articles
    const fetchEndpoint = `${backendLink}/api/articles?populate=*&sort=date:desc`;
    const articles = await getArticles(fetchEndpoint);

    return <HomeComponent articles = { articles }/>;
}

export default Page;