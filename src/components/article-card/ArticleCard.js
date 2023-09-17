import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import './ArticleCard.css';

function ArticleCard() {
    let [initDataArray, setInitDataArray] = useState([]);
    // Set filler items in array so that the return does not cause an error on the initial render
    let [articleDataArray, setArticleDataArray] = useState([["Loading...", "Loading...", "Loading...", "Loading..."]]);
    console.log(articleDataArray);
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
                    let content = data.data[i].attributes.Content;
                    iArray.push([title, dateString, image, content]);
                }
                setInitDataArray(iArray.reverse());
            })
            .catch(error => {console.log(error)});
        }
        fetchData();
    }, []);

    console.log("test " + id);
    useEffect(() => {
        let iArray = [];
        for (let i = 0; i < initDataArray.length; i++) {
            if (initDataArray[i][0].replace(/\s+/g, '-').toLowerCase() === id) {
                console.log('yes!');
                let title = initDataArray[i][0];
                let dateString = initDataArray[i][1];
                let image = initDataArray[i][2];
                let content = initDataArray[i][3];
                iArray.push([title, dateString, image, content]);
            }
        }
        // Only set articleDataArray if iArray is populated so that it is not set to an empty array, causing an unnecessary
        // re-render and an error in the return, which would call a non-existent object in articleDataArray
        if (iArray.length > 0) {
            setArticleDataArray(iArray);
        }
    }, [initDataArray, id]);

    return (
        <div id="div-articlecard-full-article-card">
            <div id="div-articlecard-stitch">
                <div id="div-articlecard-back-link">
                    <p id="p-articlecard-back-link"><a href="http://gingernook.com/">Back to Home</a></p>
                </div>
                <div id="div-articlecard-image-title-date">
                    <div id="div-articlecard-image">
                        <img src={articleDataArray[0][2]} alt="" id="p-articlecard-image" />
                    </div>
                    <div id="div-articlecard-title-date">
                        <div id="div-articlecard-title">
                            <p id="p-articlecard-title">{articleDataArray[0][0]}</p>
                        </div>
                        <div id="div-articlecard-date">
                            <p id="p-articlecard-date">{articleDataArray[0][1]}</p>
                        </div>
                    </div>
                </div>
                <div className="separator"></div>
                <div id="div-articlecard-main-content">
                    <div id="p-articlecard-main-content"><ReactMarkdown>{articleDataArray[0][3]}</ReactMarkdown></div>
                </div>
            </div>
        </div>
    )
}

export default ArticleCard;