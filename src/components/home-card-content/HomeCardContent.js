import React from "react";
import './HomeCardContent.css';
import { Link } from "react-router-dom";

function HomeCardContent(props) {
    console.log(props.tags);
    let tagLinks = [];

    if (props.tags) {
        tagLinks = props.tags.map(item => (
            <Link id = {item} to = {`/tags/${item}`}></Link>
        ));
    }
    console.log(tagLinks);


    return (
        <Link to={props.sub} className="article-link">
            <div id="div-homecardcontent-container">
                <div id="div-homecardcontent-image">
                    <img src={props.image} alt="" id="image-homecardcontent-image" />
                </div>
                <div id="div-homecardcontent-title-date-tags">
                    <div id="div-homecardcontent-title">
                        <p id="p-homecardcontent-title">{props.title}</p>
                    </div>
                    <div id="div-homecardcontent-date">
                        <p id="p-homecardcontent-date">{props.date}</p>
                    </div>
                    <div id="div-homecardcontent-tags">
                        <p id="p-homecardcontent-tags">{props.tags ? tagLinks.join(" ") : props.tags}</p>
                        
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default HomeCardContent;