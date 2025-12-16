// This file defines the component that is displayed when a search yields no results.
// It provides a user-friendly message indicating that nothing was found for their query.

// We're importing necessary components and hooks here.
import React from "react";
import './noresults.scss';

// This functional component takes a single `props` argument, which is expected to be a string
// representing the search query for which no results were found.
function NoResults(props: string) {
    return(
        <div id="noResults">
            <h1>No results for: { props }</h1>
            <p>Sorry ;-;</p>
        </div>
    );
}

// We export the 'NoResults' component as the default export.
export default NoResults; 