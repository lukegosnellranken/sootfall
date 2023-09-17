import React from "react";
import { Link } from "react-router-dom";
import './ArticleSideCardContent.css';

function ArticleSideCardContent(props) {
    window.scrollTo(0, 0);
    return (
        <Link to={props.sub} className="article-link">
            <div id="div-articlesidecardcontent-container">
                <div id="div-articlesidecardcontent-image">
                    <img src={props.image} alt="" id="image-articlesidecardcontent" />
                </div>
                <div id="div-articlesidecardcontent-title">
                    <p id="p-articlesidecardcontent-title">{props.title}</p>
                </div>
            </div>
        </Link>
    );
}

export default ArticleSideCardContent;