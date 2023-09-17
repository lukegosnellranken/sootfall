import React from "react";
import './HomeCardContent.css';
import { Link } from "react-router-dom";

function HomeCardContent(props) {
    return (
        <Link to={props.sub} className="article-link">
            <div id="div-homecardcontent-container">
                <div id="div-homecardcontent-image">
                    <img src={props.image} alt="" id="image-homecardcontent-image" />
                </div>
                <div id="div-homecardcontent-title-date-description">
                    <div id="div-homecardcontent-title">
                        <p id="p-homecardcontent-title">{props.title}</p>
                    </div>
                    <div id="div-homecardcontent-date">
                        <p id="p-homecardcontent-date">{props.date}</p>
                    </div>
                    <div id="div-homecardcontent-description">
                        <p id="p-homecardcontent-description">{props.description}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HomeCardContent;