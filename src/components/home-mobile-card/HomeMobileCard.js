// We import the React library to build the component.
import React from "react";
// We import the specific styles for this mobile card.
import './HomeMobileCard.scss';

// This is the 'HomeMobileCard' component. It's a simple "presentational" component,
// meaning its only job is to display the data it's given. It's designed to be shown
// on mobile screen sizes as part of the homepage layout.
function HomeMobileCard(props) {
    // It returns a JSX structure that defines what the card looks like.
    return (
        // This is the main container for the mobile card.
        <div id="div-homemobilecard-container">
            <div id="div-homemobilecard-stitch">
                <div id="div-homemobilecard-content-container">
                    <div id="div-homemobilecard-title-content">
                        {/* The title is displayed here, taken from the 'title1' prop. */}
                        <h1 id="h1-homemobilecard-title" className="section-title">{props.title1}</h1>
                        {/* This div holds the image. */}
                        <div id="div-homemobilecard-image">
                            {/* The image source is passed in through the 'image1' prop. */}
                            <img id="image-homemobilecard-image" src={props.image1} alt="" />
                        </div>
                        {/* The description text is displayed here, taken from the 'description1' prop. */}
                        <p id="p-homemobilecard-content">{props.description1}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

// We export the component so it can be used by its parent, 'HomeComponent'.
export default HomeMobileCard;