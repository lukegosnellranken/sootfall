// We import the necessary React library to create the component.
import React from "react";
// We import the specific styles for the footer.
import './Footer.scss';

// This is the 'Footer' component. It's a simple, static component that
// appears at the bottom of every page.
function Footer() {
    // It returns a simple JSX structure.
    return (
        // This is the main container for the footer content.
        <div id="div-footer-container">
            {/* This paragraph displays the site credit text. */}
            <p id="p-footer-text">Site development and design by Luke Gosnell</p>
        </div>
    );
}

// We export the Footer component so it can be included in the main layout of the site.
export default Footer;