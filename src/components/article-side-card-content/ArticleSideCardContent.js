import React from "react";
import Link from "next/link";
import './ArticleSideCardContent.scss';

function ArticleSideCardContent(props) {
    return (
        <Link href={props.sub} className="article-link">
            <div id="div-articlesidecardcontent-container">
                <div id="div-articlesidecardcontent-image">
                    <img src={props.image} alt="" id="image-articlesidecardcontent" draggable="false"/>
                </div>
                <div id="div-articlesidecardcontent-title">
                    <p id="p-articlesidecardcontent-title">{props.title}</p>
                    <p id="p-articlesidecardcontent-author">By {props.author}</p>
                </div>
            </div>
        </Link>
    );
}

export default ArticleSideCardContent;