"use client";

import React from "react";
import { useParams } from "react-router-dom";
import './SearchComponent.scss';
import HomeCard from "../home-card/HomeCard";

function SearchComponent() {
    // Using useParams is necessary for causing the page to rerender
    // when performing a new search when the user is already on the same route
    const { searchName } = useParams();
    const decodedSearchName = decodeURIComponent(searchName);
    
    return(
    <div id="tagcomponent-container">
        <div id="div-tagcomponent-card">
            <HomeCard
                title = {"Search results for: " + decodedSearchName}
                pageType = "search"
                search = {decodedSearchName}
            />
        </div>
    </div>
    )
}

export default SearchComponent;