import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './ArticleSideCard.scss';
import ArticleSideCardContent from "../article-side-card-content/ArticleSideCardContent";

function ArticleSideCard(props) {
    let [initDataArray, setInitDataArray] = useState([]);
    let currentItems = initDataArray;
    let currentArticle = ['filler'];
    let { id } = useParams();
    id = id.replace(/[^a-zA-Z0-9-_]/g, "");
    
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
            await fetch(`${API_URL}/api/articles?populate=*`, {headers: {'Authorization': `Bearer ${token}`}})
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    console.log('Articles res error');
                }
            })
            .then(data => {
                let iArray = [];
                for (let i = 0; i < data.data.length; i++) {
                    let title = data.data[i].title;
                    let author = data.data[i].author.name;
                    let dateString = data.data[i].date.replaceAll("-","/");
                    dateString = dateString.slice(5) + "/" + dateString.slice(0,4);
                    let image;
                    if (env === 'local') {
                        // Does not contain the API URL, need to concatenate
                        image = API_URL + data.data[i].image.formats.medium.url;
                    }
                    else if (env === 'cloud') {
                        // Already contains the API URL, no concatenation necessary
                        image = data.data[i].image.formats.medium.url;
                    }
                    iArray.push([title, author, dateString, image]);
                }
                setInitDataArray(iArray.slice(0,8).reverse());
            })
            .catch(error => {console.log(error)});
        }
        fetchData();
    }, [API_URL, token, env]);

    function items() {
        // Remove current article from array
        for (let i = 0; i < currentItems.length; i++) { 
            if (currentItems[i][0].replace(/\s+/g, '-').toLowerCase().replace(/[^a-zA-Z0-9-_]/g, "") === id) {
                currentArticle = currentItems[i];
                currentItems.splice(i, 1);
            }
        }
        return (
            <div id="div-articlesidecard-one-item">      
                {currentItems.slice().reverse().map((article, i) => (
                    <div key={i}>
                        <ArticleSideCardContent
                            sub={`/articles/${article[0].replace(/\s+/g, '-').toLowerCase()}`}
                            title={article[0]}
                            author={article[1]}
                            image={article[3]}
                        />
                    </div>
                ))}
            </div>
        );
    }

    function restoreCurrentArticle() {
        if (!currentItems.includes(currentArticle)) {
            if (currentArticle !== 'filler') {
                currentItems.push(currentArticle);
            }
        }
    }

    return (
        <div id="div-articlesidecard-card">
            <div id="div-articlesidecard-stitch">
                <div id="div-articlesidecard-content">
                    {items()}
                    {restoreCurrentArticle()}
                </div>
            </div>
        </div>
    )
}

export default ArticleSideCard;