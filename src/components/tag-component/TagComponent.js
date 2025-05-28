import React from "react";
import './TagComponent.css';
import HomeCard from "../home-card/HomeCard";

function TagComponent() {
    const pathname = window.location.pathname.split("/").pop();
    const formattedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);

    return(
        <div id="tagcomponent-container">
            <div id="div-tagcomponent-card">
                <HomeCard
                    title = {formattedPathname}
                    pageType = "tag"
                    tag = {pathname}
                />
            </div>
        </div>
    )
}

export default TagComponent;