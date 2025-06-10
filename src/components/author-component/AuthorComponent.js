import React from "react";
import './AuthorComponent.css';
import HomeCard from "../home-card/HomeCard";
import AuthorCard from "../author-card/AuthorCard";

function AuthorComponent() {
    let pathname = window.location.pathname.split("/").pop();
    pathname = decodeURIComponent(pathname);

    function capitalizeWords(str) {
        return str
            .split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
    
    return(
    <div id="tagcomponent-container">
        <div id="div-tagcomponent-card">
            <AuthorCard/>
            <HomeCard
                title = {"Author: " + capitalizeWords(pathname)}
                pageType = "author"
                author = {pathname}
            />
        </div>
    </div>
    )
}

export default AuthorComponent;