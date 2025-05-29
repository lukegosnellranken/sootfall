import React from "react";
import './TagComponent.css';
import { useParams } from "react-router-dom";
import HomeCard from "../home-card/HomeCard";

function TagComponent() {
    const pathname = window.location.pathname.split("/").pop();
    const formattedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    // Using useParams is necessary for causing the page to rerender
    // when clicking a new tag when the user is already on the same route
    const { tagName } = useParams();

    return(
        <div id="tagcomponent-container">
            <div id="div-tagcomponent-card">
                <HomeCard
                    title = {formattedPathname}
                    pageType = "tag"
                    tag = {tagName}
                />
            </div>
        </div>
    )
}

export default TagComponent;