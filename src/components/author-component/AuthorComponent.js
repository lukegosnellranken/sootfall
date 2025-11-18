"use client";

import React from "react";
import './AuthorComponent.scss';
import AuthorCard from "../author-card/AuthorCard";
import HomeCard from "../home-card/HomeCard";

function AuthorComponent({ author }) {
    let name = author.name;
    let image = author.image;
    let description = author.description;
    return(
        <div id="authorscomponent-container">
            <div id="div-authorscomponent-card">
                <AuthorCard 
                    authorName={name}
                    authorImage={image}
                    authorDescription={description}
                />
            </div>
            <HomeCard
                pageType="author"
                title = {"Writings by " + name}
                author={name}
            />
        </div>
    );
}

export default AuthorComponent;