// This file defines the component that is displayed when a page cannot be found.
// It provides a user-friendly message indicating that no page was found.

// We're importing necessary components and hooks here.
import React from "react";
import './notfound.scss';

function NotFound() {
    return(
        <div id="notFound">
            <h1>404</h1>
            <p>Page not found ;-;</p>
        </div>
    );
}

// We export the 'NoResults' component as the default export.
export default NotFound; 