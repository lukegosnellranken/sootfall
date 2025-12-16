// This file defines the `NotFound` component.
// It is displayed when a user navigates to a route that does not exist.
// The component provides a simple, user-friendly 404 error message.

// We're importing necessary components and hooks here.
import React from "react";
import './notfound.scss';

// The `NotFound` component renders a 404 page.
// It uses a heading and a short message to inform the user that the page was not found.
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