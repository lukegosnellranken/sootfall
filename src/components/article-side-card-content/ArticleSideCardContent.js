// We're importing the necessary tools from React and Next.js.
import React from "react";
// 'Link' is a special component from Next.js that enables fast, client-side navigation between pages.
import Link from "next/link";
// We import the specific styles for this component.
import './ArticleSideCardContent.scss';

// This is the 'ArticleSideCardContent' component. It's a reusable "dumb" component,
// meaning its only job is to display the data it's given. It doesn't fetch or manage its own data.
// It receives all the data it needs to display (like title, author, image, and link) as 'props'.
function ArticleSideCardContent(props) {
    // The entire component is wrapped in a 'Link' component from Next.js.
    // This makes the whole card a clickable link that will navigate the user to the article.
    return (
        // The 'href' prop tells the Link where to navigate to. We get this URL from the 'sub' prop.
        <Link href={props.sub} className="article-link">
            {/* This is the main container for the content of a single side-card item. */}
            <div id="div-articlesidecardcontent-container">
                {/* This div holds the article's thumbnail image. */}
                <div id="div-articlesidecardcontent-image">
                    {/* The 'src' of the image is passed in via the 'image' prop. 'draggable="false"' prevents users from dragging the image. */}
                    <img src={props.image} alt="" id="image-articlesidecardcontent" draggable="false"/>
                </div>
                {/* This div holds the article's title and author. */}
                <div id="div-articlesidecardcontent-title">
                    {/* The article title is displayed here, taken from the 'title' prop. */}
                    <p id="p-articlesidecardcontent-title">{props.title}</p>
                    {/* The author's name is displayed here, taken from the 'author' prop. */}
                    <p id="p-articlesidecardcontent-author">By {props.author}</p>
                </div>
            </div>
        </Link>
    );
}

// We export the component so it can be used by its parent, 'ArticleSideCard'.
export default ArticleSideCardContent;