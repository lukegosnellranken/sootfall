// We import the React library to build the component.
import React from "react";
// We import the specific styles for this side card.
import './HomeSideCard.scss';

// This is the 'HomeSideCard' component. It's a "presentational" component designed
// to be shown as a sidebar on the homepage for larger (desktop) screen sizes.
// It contains two distinct sections of content.
function HomeSideCard(props) {
    // It returns a JSX structure that defines what the card looks like.
    // All the content is passed in via 'props' from its parent component, 'HomeComponent'.
    return (
        // This is the main container for the side card.
        <div id="div-homesidecard-container">
            <div id="div-homesidecard-stitch">
                <div id="div-homesidecard-content">
                    {/* This is the first content section within the card. */}
                    <div id="div-section-1" className="sections">
                        {/* The title for section 1 is passed in via the 'title1' prop. */}
                        <h1 id="p-section-1-title" className="section-title">{props.title1}</h1>
                        <div id="div-image-section-1">
                            {/* The image for section 1 is passed in via the 'image1' prop. */}
                            <img id="image-section-1-image" src={props.image1} alt="" draggable="false"/>
                        </div>
                        {/* The description for section 1 is passed in via the 'description1' prop. */}
                        <p id="p-section-1-content" className="section-content">{props.description1}</p>
                    </div>
                    {/* A decorative separator between the two sections. */}
                    <div className="separator"></div>
                    {/* This is the second content section within the card. */}
                    <div id="div-section-2" className="sections">
                        {/* The title for section 2 is passed in via the 'title2' prop. */}
                        <p id="p-section-2-title" className="section-title">{props.title2}</p>
                        {/* The description for section 2 is passed in via the 'description2' prop. */}
                        <p id="p-section-2-content"  className="section-content">{props.description2}</p>
                        {/* The image for section 2 is passed in via the 'image2' prop. */}
                        <img id="image-section-2-image" src={props.image2} alt="" draggable="false"/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

// We export the component so it can be used by its parent, 'HomeComponent'.
export default HomeSideCard;