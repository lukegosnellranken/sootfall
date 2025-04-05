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

    const token = 'ff75d12ddbfa3b18817eacba0f70b6fc3ef76c0d2e13da25468bfa16a6deaffd1f071ccc5ef1cff42ce2d2618ec6f457da47f6eceede245b00c59711b268482613864751271af51baf71109535b1bb87eff397e4193ffef7d08300aaa4e685792c019da43d928a18fff82ed34920c0aabfbdfc0fa2b22bd7379fb264eaebf0f4';


    useEffect(() => {
        const fetchData = async () => {
            await fetch('http://localhost:1337/api/articles?populate=*', {headers: {'Authorization': `Bearer ${token}`}})
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
                    let dateString = data.data[i].date.replaceAll("-","/");
                    dateString = dateString.slice(5) + "/" + dateString.slice(0,4);
                    let image = 'http://localhost:1337' + data.data[i].image.formats.thumbnail.url;
                    iArray.push([title, dateString, image]);
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