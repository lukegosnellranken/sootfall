// This line marks this as a Client Component.
"use client";

// We import the React library.
import React from "react";
// NOTE: The use of 'useParams' from 'react-router-dom' is unusual in a Next.js App Router application.
// In the App Router, dynamic URL parameters are typically passed as props to the page component.
// This suggests this component might be legacy code from a previous project structure.
import { useParams } from "react-router-dom";
// We import the specific styles for this component.
import './SearchComponent.scss';
// 'HomeCard' is the component used to display a list of articles.
import HomeCard from "../home-card/HomeCard";

// This component is intended to display the results for a search query.
function SearchComponent() {
    // It uses 'useParams' to get the search term from the URL.
    // The comment below notes that this is necessary to force a re-render when a new search is made
    // from the search results page itself.
    const { searchName } = useParams();
    // The search term from the URL is "encoded" (e.g., spaces become '%20').
    // We need to decode it to get the original, readable search text.
    const decodedSearchName = decodeURIComponent(searchName);
    
    // This is the JSX that defines the component's layout.
    return(
    // NOTE: The container div has an ID of "tagcomponent-container", which is likely a copy-paste error from another component.
    <div id="tagcomponent-container">
        <div id="div-tagcomponent-card">
            {/* The component renders a 'HomeCard' to display the results. */}
            <HomeCard
                // It creates a dynamic title that includes the search term.
                title = {"Search results for: " + decodedSearchName}
                pageType = "search"
                // It passes the search term itself to the HomeCard.
                search = {decodedSearchName}
                // NOTE: A critical piece of data is missing here. The 'HomeCard' component expects an 'articles' prop
                // containing the list of articles to display. This component does not fetch any data, so the search
                // results will likely be empty. The data fetching logic needs to be implemented.
            />
        </div>
    </div>
    )
}

// We export the component.
export default SearchComponent;