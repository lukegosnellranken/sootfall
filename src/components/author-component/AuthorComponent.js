import React from "react";
import './AuthorComponent.css';
import HomeCard from "../home-card/HomeCard";

function AuthorComponent() {
    const pathname = window.location.pathname.split("/").pop();
    const formattedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);
    
    return(
    <div id="tagcomponent-container">
        <div id="div-tagcomponent-card">
            <HomeCard
                title = {"Author: " + formattedPathname}
                pageType = "author"
                author = {pathname}
            />
        </div>
    </div>
    )
}

export default AuthorComponent;