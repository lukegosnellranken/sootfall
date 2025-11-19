import React from "react";
import './noresults.scss';

function NoResults(props: string) {
    return(
        <div id="noResults">
            <h1>No results for: { props }</h1>
            <p>Sorry ;-;</p>
        </div>
    );
}

export default NoResults; 