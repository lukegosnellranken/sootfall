"use client";

import React from "react";
import { useState, useEffect } from "react";
import './ArticleSideCard.scss';
import ArticleSideCardContent from "../article-side-card-content/ArticleSideCardContent";

function ArticleSideCard({ currentArticleTitle }) {
    const [articles, setArticles] = useState([]);
    
    // Get data from ~/.env, set API_URL and token
    const env = process.env.NEXT_PUBLIC_ENV;
    let API_URL;
    let token;
    if (env === 'local') {
        API_URL = process.env.NEXT_PUBLIC_API_URL_LOCAL;
        token = process.env.NEXT_PUBLIC_API_TOKEN_LOCAL;
    }
    else if (env === 'cloud') {
        API_URL = process.env.NEXT_PUBLIC_API_URL_CLOUD;
        token = process.env.NEXT_PUBLIC_API_TOKEN_CLOUD;
    }

    useEffect(() => {
        const fetchData = async () => {
            // Fetch the 8 most recent articles
            await fetch(`${API_URL}/api/articles?populate=*&sort=date:desc&pagination[limit]=8`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => res.ok ? res.json() : Promise.reject('Articles res error'))
            .then(data => {
                const formattedArticles = data.data.map(item => {
                    // const attributes = item.attributes;
                    let title = item.title;
                    let author = item.author.name;
                    let image;
                    if (env === 'local') {
                        // Does not contain the API URL, need to concatenate
                        image = API_URL + item.image.formats.medium.url;
                    } else {
                        // Already contains the API URL, no concatenation necessary
                        image = item.image.formats.medium.url;
                    }
                    return {
                        title: title,
                        author: author,
                        image: image,
                        slug: title.replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, "")
                    };
                });
                setArticles(formattedArticles);
            })
            .catch(error => {console.log(error)});
        }
        fetchData();
    }, [API_URL, token, env]);

    // Filter out the current article from the list
    const otherArticles = articles.filter(article => article.title !== currentArticleTitle);
    console.log(otherArticles);

    return (
        <div id="div-articlesidecard-card">
            <div id="div-articlesidecard-stitch">
                <div id="div-articlesidecard-content">
                    <div id="div-articlesidecard-one-item">      
                        {otherArticles.map((article, i) => (
                            <div key={i}>
                                <ArticleSideCardContent
                                    sub={`/articles/${article.slug}`}
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

export default ArticleSideCard;
