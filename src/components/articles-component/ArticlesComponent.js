import React from "react";
import './ArticlesComponent.scss';
import HomeCard from "../home-card/HomeCard";

function ArticlesComponent() {
    return (
        <div id="div-articles-component">
            <div id="articlescomponent-container">
                <div id="div-articlescomponent-card">
                    <HomeCard
                        title = "All Writings"
                        pageType = "home"
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticlesComponent;