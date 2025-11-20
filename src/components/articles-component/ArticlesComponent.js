import React from "react";
import './ArticlesComponent.scss';
import HomeCard from "../home-card/HomeCard";

function ArticlesComponent(props) {
    let title = "All Writings";
    if (props.searchValue) {
        title = "Results for: " + props.searchValue;
    }
    return (
        <div id="div-articles-component">
            <div id="articlescomponent-container">
                <div id="div-articlescomponent-card">
                    <HomeCard
                        title = { title }
                        pageType = "home"
                        articles = { props.articles }
                    />
                </div>
            </div>
        </div>
    )
}

export default ArticlesComponent;