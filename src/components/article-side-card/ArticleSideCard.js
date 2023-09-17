import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './ArticleSideCard.css';
import ArticleSideCardContent from "../article-side-card-content/ArticleSideCardContent";

function ArticleSideCard(props) {
    let [initDataArray, setInitDataArray] = useState([]);
    let currentItems = initDataArray;
    let currentArticle = ['filler'];
    console.log(initDataArray);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://strapi-production-2ac8.up.railway.app/api/articles?populate=*')
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
                    let title = data.data[i].attributes.Title;
                    let dateString = data.data[i].attributes.Date.replaceAll("-","/");
                    dateString = dateString.slice(5) + "/" + dateString.slice(0,4);
                    let image = data.data[i].attributes.Media.data.attributes.formats.thumbnail.url;
                    let description = data.data[i].attributes.Description;
                    iArray.push([title, dateString, image, description]);
                }
                setInitDataArray(iArray.slice(0,8).reverse());
            })
            .catch(error => {console.log(error)});
        }
        fetchData();
    }, []);

    function items() {
        // Remove current article from array
        for (let i = 0; i < currentItems.length; i++) { 
            if (currentItems[i][0].replace(/\s+/g, '-').toLowerCase() === id) {
                currentArticle = currentItems[i];
                currentItems.splice(i, 1);
            }
        }
        return (
            <div id="div-articlesidecard-one-item">      
                {currentItems.reverse().map((article, i) => (
                    <div key={i}>
                        <ArticleSideCardContent
                            sub = {`/articles/${(currentItems[currentItems.length-(i+1)][0]).replace(/\s+/g, '-').toLowerCase()}`}
                            title = {currentItems[currentItems.length-(i+1)][0]}
                            image = {currentItems[currentItems.length-(i+1)][2]}
                        />
                    </div>
                ))}
            </div>
        );
    }

    function restoreCurrentArticle() {
        if (!currentItems.includes(currentArticle)) {
            if (currentArticle !== 'filler') {
                console.log('filler');
                currentItems.push(currentArticle);
            }
        }
    }

    return (
        <div id="div-articlesidecard-all-items">
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