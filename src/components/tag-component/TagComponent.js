import React from "react";
import './TagComponent.scss';
import HomeCard from "../home-card/HomeCard";

function TagComponent(props) {
    // Remove URI spaces from props.tagname
    const decodedTagname = decodeURIComponent(props.tagName);
    return(
        <div id="tagcomponent-container">
            <div id="div-tagcomponent-card">
                <HomeCard
                    title = {"Tag: " + decodedTagname}
                    pageType = "tag"
                    tag = { decodedTagname }
                    articles = { props.articles }
                />
            </div>
        </div>
    )
}

export default TagComponent;