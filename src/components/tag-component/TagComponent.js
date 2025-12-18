// We import the React library to build the component.
import React from "react";
// We import the specific styles for this component.
import './TagComponent.scss';
// We are reusing the 'HomeCard' component to display the list of articles.
import HomeCard from "../home-card/HomeCard";

// This is the 'TagComponent'. Its job is to display all the articles that are associated
// with a specific tag. It acts as a wrapper around the more general 'HomeCard' component.
function TagComponent(props) {
    // When a tag name is part of a URL, special characters (like spaces) are "encoded"
    // (e.g., a space becomes '%20'). We use 'decodeURIComponent' to convert it back to a readable string.
    const decodedTagname = decodeURIComponent(props.tagName);
    
    // The component renders a simple structure containing the 'HomeCard'.
    return(
        <div id="tagcomponent-container">
            <div id="div-tagcomponent-card">
                {/* We render the 'HomeCard' and pass it a specific set of props to configure it for the tag page. */}
                <HomeCard
                    // The title is dynamically created to show which tag is being displayed.
                    title = {"Tag: " + decodedTagname}
                    // We let the HomeCard know it's on a 'tag' page, which might affect styling or behavior.
                    pageType = "tag"
                    // We pass the clean tag name itself.
                    tag = { decodedTagname }
                    // Crucially, we pass down the list of 'articles' that was fetched by the parent page component.
                    articles = { props.articles }
                />
            </div>
        </div>
    )
}

// We export the component so it can be used by the dynamic tag page.
export default TagComponent;