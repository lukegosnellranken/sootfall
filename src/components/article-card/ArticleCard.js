import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import './ArticleCard.css';
import lantern from '../../images/lantern2.png';

function ArticleCard() {
    let [initDataArray, setInitDataArray] = useState([]);
    let [articleDataArray, setArticleDataArray] = useState([[]]);
    const { id } = useParams();

    const token = 'ff75d12ddbfa3b18817eacba0f70b6fc3ef76c0d2e13da25468bfa16a6deaffd1f071ccc5ef1cff42ce2d2618ec6f457da47f6eceede245b00c59711b268482613864751271af51baf71109535b1bb87eff397e4193ffef7d08300aaa4e685792c019da43d928a18fff82ed34920c0aabfbdfc0fa2b22bd7379fb264eaebf0f4';

    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path);
    };
    
    // Fetch data for all articles on mount and convert to JSON if res is ok
    useEffect(() => {
        let iArray = [];
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
                // Dynamically push data of each article as an array to iArray
                for (let i = 0; i < data.data.length; i++) {
                    let title = data.data[i].title;
                    let dateString = data.data[i].date;
                    dateString = dateString.slice(5) + "-" + dateString.slice(2,4);
                    let image = 'http://localhost:1337' + data.data[i].image.formats.thumbnail.url;
                    let content = data.data[i].content;
                    let tags = data.data[i].tags;
                    iArray.push([title, dateString, image, content, tags]);
                }
            })
            .catch(error => {console.log(error)});
            // set initDataArray to iArray (order of iArray is reversed)
            setInitDataArray(iArray.reverse());
        }
        fetchData();
    }, []);

    // All articles are now in initDataArray. When initDataArray or id updates, run through initDataArray to find the correct article (title === id)
    // Push the correct article's items to iArray, set ArticleDataArray to iArray
    useEffect(() => {
        // Return on initial call since setInitDataArray will not yet have been called in above useEffect
        if (initDataArray === 0) { return; }
        let iArray = [];
        for (let i = 0; i < initDataArray.length; i++) {
            if (initDataArray[i][0].replace(/\s+/g, '-').toLowerCase() === id) {
                let title = initDataArray[i][0];
                let dateString = initDataArray[i][1];
                let image = initDataArray[i][2];
                let content = initDataArray[i][3];
                let tags = initDataArray[i][4];
                if (tags != null) {
                    tags = tags.split(",").map(item => item.trim());
                }
                iArray.push([title, dateString, image, content, tags]);
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
                    <p id="p-articlecard-back-link"><a href="http://localhost:3000/">Return</a></p>
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
                        <div id="div-articlecardcontent-tags">
                            {
                                articleDataArray[0][4] ?
                                articleDataArray[0][4].map((item => (
                                    <p
                                        key={item}
                                        className="p-articlecardcontent-tags"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent parent div click event
                                            handleNavigation(`/tags/${item}`);
                                        }}
                                    >
                                        {item}
                                    </p>
                                )))
                                : null
                            }
                        </div>
                    </div>
                    <div id="div-articlecard-lantern">
                        <img src={lantern} alt="" id="p-articlecard-lantern" />
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