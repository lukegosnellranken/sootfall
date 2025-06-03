import React from "react";
import { useParams } from "react-router-dom";
import './SearchComponent.css';
import HomeCard from "../home-card/HomeCard";

function SearchComponent() {
    // Using useParams is necessary for causing the page to rerender
    // when performing a new search when the user is already on the same route
    const { searchName } = useParams();
    const decodedSearchName = decodeURIComponent(searchName);
    const formattedDecodedSaerchName = decodedSearchName.charAt(0).toUpperCase() + decodedSearchName.slice(1);
    
    return(
    <div id="tagcomponent-container">
        <div id="div-tagcomponent-card">
            <HomeCard
                title = {formattedDecodedSaerchName}
                pageType = "search"
                search = {formattedDecodedSaerchName}
            />
        </div>
    </div>
    )
}

export default SearchComponent;