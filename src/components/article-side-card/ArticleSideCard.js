// This line marks the component as a Client Component in Next.js.
// This is crucial because this component fetches data on the client-side and manages its own state.
"use client";

// We're bringing in essential tools from React for building the component.
import React from "react";
// 'useState' lets us hold and manage the component's data (state).
// 'useEffect' lets us perform side effects, like fetching data, after the component has rendered.
import { useState, useEffect } from "react";
// We import the specific styles for this side card.
import './ArticleSideCard.scss';
// This is the child component that will be used to display each individual article in the side card.
import ArticleSideCardContent from "../article-side-card-content/ArticleSideCardContent";

// This is the 'ArticleSideCard' component. Its job is to display a list of recent articles
// on the side of the main article. It receives the title of the current article as a 'prop'
// so it can exclude it from the list.
function ArticleSideCard({ currentArticleTitle }) {
    // 'useState' is used here to create a state variable called 'articles'.
    // It will hold the list of articles fetched from the backend. It starts as an empty array.
    const [articles, setArticles] = useState([]);
    
    // This section reads environment variables from a .env file to get the correct API URL and token.
    // This allows the application to use different settings for local development and a live 'cloud' environment.
    const env = process.env.NEXT_PUBLIC_ENV;
    let API_URL;
    let token;
    if (env === 'local') {
        // If the environment is 'local', use the local backend URL and token.
        API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
        token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL;
    }
    else if (env === 'cloud') {
        // If the environment is 'cloud', use the live backend URL and token.
        API_URL = process.env.NEXT_PUBLIC_API_URL_CLOUD;
        token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD;
    }

    // The 'useEffect' hook is used to fetch data when the component first loads.
    // The code inside will run once after the initial render.
    useEffect(() => {
        // We define an 'async' function to handle the data fetching process.
        const fetchData = async () => {
            // We 'fetch' the 8 most recent articles from the backend API.
            // 'populate=*' gets all related data (like images and authors).
            // 'sort=date:desc' sorts them from newest to oldest.
            // 'pagination[limit]=8' limits the result to 8 articles.
            // The 'Authorization' header is required to get permission to access the data.
            await fetch(`${API_URL}/api/articles?populate=*&sort=date:desc&pagination[limit]=8`, {headers: {'Authorization': `Bearer ${token}`}})
            // After fetching, we check if the response was successful.
            .then(res => res.ok ? res.json() : Promise.reject('Articles res error'))
            // If successful, we process the returned 'data'.
            .then(data => {
                // The raw data is mapped into a cleaner, more usable format.
                const formattedArticles = data.data.map(item => {
                    let title = item.title;
                    let author = item.author.name;
                    let image;
                    // We construct the correct image URL based on the environment.
                    if (env === 'local') {
                        // For local development, the API URL needs to be added to the image path.
                        image = API_URL + item.image.formats.medium.url;
                    } else {
                        // In the cloud, the image URL is already a full, absolute path.
                        image = item.image.formats.medium.url;
                    }
                    // We create a 'slug' for the URL, which is a URL-friendly version of the title.
                    return {
                        title: title,
                        author: author,
                        image: image,
                        slug: title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, "")
                    };
                });
                // We update the component's state with the newly formatted articles.
                setArticles(formattedArticles);
            })
            // If there was an error during fetching or processing, we log it to the console.
            .catch(error => {console.log(error)});
        }
        // We call the fetchData function to start the process.
        fetchData();
        // The dependency array '[API_URL, token, env]' tells React to re-run this effect if any of these values change.
    }, [API_URL, token, env]);

    // Here, we filter the list of fetched articles to exclude the one that is currently being viewed.
    // This prevents showing a link to the current page in the "recent articles" list.
    const otherArticles = articles.filter(article => article.title !== currentArticleTitle);

    // This is the JSX that defines what the component looks like.
    return (
        <div id="div-articlesidecard-card">
            <div id="div-articlesidecard-stitch">
                <div id="div-articlesidecard-content">
                    <div id="div-articlesidecard-one-item">      
                        {/* We map over the 'otherArticles' array. For each article, we render
                            an 'ArticleSideCardContent' component. */}
                        {otherArticles.map((article, i) => (
                            // The 'key' is a unique identifier React needs for lists of items.
                            <div key={i}>
                                <ArticleSideCardContent
                                    // We pass the data for each article as props to the child component.
                                    sub={`/articles/${article.slug}`} // The URL for the link.
                                    title={article.title}
                                    author={article.author}
                                    image={article.image}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// We export the component so it can be used in other files.
export default ArticleSideCard;
