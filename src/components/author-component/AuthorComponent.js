// This line marks the component as a Client Component in Next.js, which is a common practice for components
// that might involve client-side interactions, even if this one is primarily for display.
"use client";

// We're importing the necessary tools and components.
import React from "react";
// We import the specific styles for this component.
import './AuthorComponent.scss';
// 'AuthorCard' is the component that displays the main information about the author.
import AuthorCard from "../author-card/AuthorCard";
// 'HomeCard' is a reusable component that we use here to list all the articles written by this author.
import HomeCard from "../home-card/HomeCard";

// This is the 'AuthorComponent'. It's responsible for laying out the page for a single author.
// It combines the author's biography with a list of their writings.
// It receives the 'author' object and a list of their 'articles' as props.
function AuthorComponent({ author, articles }) {
    // We extract the necessary information (name, image, description) from the 'author' object prop.
    // This makes the code below cleaner and easier to read.
    let name = author.name;
    let image = author.image;
    let description = author.description;

    // The component returns a JSX structure that defines the layout.
    return(
        // This is the main container for the author page content.
        <div id="authorscomponent-container">
            {/* This div wraps the 'AuthorCard' component, which shows the author's details. */}
            <div id="div-authorscomponent-card">
                <AuthorCard 
                    // We pass the author's name, image, and description down to the AuthorCard component.
                    authorName={name}
                    authorImage={image}
                    authorDescription={description}
                />
            </div>
            {/* We then render the 'HomeCard' component to display the list of articles. */}
            <HomeCard
                // We pass the 'pageType' as "author" to let the HomeCard know it's on an author's page.
                // This might be used for styling or to disable certain links.
                pageType="author"
                // The title for the list of articles is dynamically created to include the author's name.
                title = {"Writings by " + name}
                // We pass the author's name.
                author={name}
                // We pass the list of the author's articles for the HomeCard to render.
                articles={articles}
            />
        </div>
    );
}

// We export the AuthorComponent so it can be used by the author's dynamic page file.
export default AuthorComponent;