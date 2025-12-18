// We're importing the necessary React hooks and Next.js tools.
import React, { useEffect, useRef, useState } from "react";
// We import the specific styles for this component.
import './HomeCardContent.scss';
// 'useRouter' is a Next.js hook that allows us to programmatically control navigation.
import { useRouter } from 'next/navigation';

// This is the 'HomeCardContent' component. It's responsible for displaying a single
// article preview card, typically in a list on the home page or an articles page.
// It receives all the article's details as 'props'.
function HomeCardContent(props) {
    // We get the router object to handle navigation.
    const navigate = useRouter();
    // We create a 'ref' that will be attached to the tags' container div. This gives us direct access to that DOM element.
    const wrapperRef = useRef();
    // We use 'useState' to store the number of tags that are visible before they overflow the container.
    const [visibleCount, setVisibleCount] = useState(props.tags ? props.tags.length : 0);

    // This is a helper function for navigating to different pages.
    const handleNavigation = (path) => {
        navigate.push(path);
    };

    // This 'useEffect' hook contains the complex logic for figuring out how many tags can fit on one line.
    // It runs whenever the 'props.tags' array changes.
    useEffect(() => {
        // If there are no tags, we don't need to do anything.
        if (!props.tags) return;
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        let totalWidth = 0;
        let lastFullyVisibleIndex = -1;
        // To measure the width of each tag without affecting the layout, we create a temporary, invisible 'span' element.
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden'; // It won't be seen by the user.
        temp.style.position = 'absolute'; // It won't take up space in the document flow.
        temp.style.whiteSpace = 'nowrap'; // Ensures the text doesn't wrap, giving us its true width.
        temp.className = 'p-homecardcontent-tags'; // We give it the same class as our real tags to ensure styling (like font size) is the same for accurate measurement.
        document.body.appendChild(temp); // We add it to the document to be measured.

        // We loop through each tag.
        for (let i = 0; i < props.tags.length; i++) {
            temp.textContent = props.tags[i]; // Put the tag's text into our temporary span.
            const tagWidth = temp.offsetWidth + 16; // We measure the span's width and add some padding/margin value.
            // We check if adding the next tag would exceed the width of the container.
            if (totalWidth + tagWidth <= wrapper.offsetWidth) {
                // If it fits, we add its width to the total and update the index of the last visible tag.
                totalWidth += tagWidth;
                lastFullyVisibleIndex = i;
            } else {
                // If it doesn't fit, we stop checking.
                break;
            }
        }
        // After the loop, we clean up by removing our temporary measuring element.
        document.body.removeChild(temp);

        // We set the state to the number of tags that can be shown. We add 2 because slicing and indexing logic later requires it.
        setVisibleCount(lastFullyVisibleIndex + 2);
    }, [props.tags]); // This effect depends on the list of tags.
    
    // This is the main JSX for the component.
    return (
        // The entire card is a clickable div. When clicked, it navigates to the article's page.
        // This is a common pattern to avoid "nested <a> tags" which is invalid HTML, since the tags and author inside are also links.
        <div className="article-link" onClick={() => handleNavigation(props.sub)}>
            <div id="div-homecardcontent-container">
                {/* This div holds the article's thumbnail image. */}
                <div id="div-homecardcontent-image">
                    <img src={props.image} alt="" id="image-homecardcontent-image" draggable="false"/>
                </div>
                {/* This div holds all the textual information about the article. */}
                <div id="div-homecardcontent-article-info">
                    <div id="div-homecardcontent-title-date-tags">
                        <p id="p-homecardcontent-title">{props.title}</p>
                        <div id="div-homecardcontent-author-date">
                            <p id="p-homecardcontent-author-date">
                                By
                                {/* The author's name is a clickable span. */}
                                <span id="span-homecardcontent-author"
                                    onClick={(e) => {
                                            // 'e.stopPropagation()' is crucial. It stops the click event from "bubbling up"
                                            // to the parent div. Without this, clicking the author would navigate to both
                                            // the author's page AND the article's page. This prevents that.
                                            e.stopPropagation(); 
                                            handleNavigation(`/authors/${props.author.toLowerCase()}`);
                                    }}
                                >
                                    {props.author}
                                </span>
                                ∽ 
                                <span id="span-homecardcontent-date">{props.date}</span>
                            </p>
                        </div>
                        {/* This div contains the logic for displaying the tags. */}
                        <div id="div-homecardcontent-tags">
                            {/* We attach our 'ref' here to get a reference to this div's width. */}
                            <div id="tags-ellipsis-wrapper" ref={wrapperRef}>
                                {/* We only try to render tags if the 'props.tags' array exists. */}
                                {props.tags && Array.isArray(props.tags) && (() => {
                                    // Determine if we need to show the '...' ellipsis.
                                    const showEllipsis = visibleCount < props.tags.length;
                                    // We use 'slice' to get only the tags that should be visible.
                                    const tagsToShow = showEllipsis
                                        ? props.tags.slice(0, visibleCount - 1)
                                        : props.tags.slice(0, visibleCount);
                                    return (
                                        <>
                                            <span className="span-homecardcontent-tags-label">Tags: </span>
                                            {/* We map over the 'tagsToShow' array to render each visible tag. */}
                                            {tagsToShow.map(item => (
                                                <p
                                                    key={item}
                                                    className="p-homecardcontent-tags"
                                                    onClick={e => {
                                                        // We use 'stopPropagation' here for the same reason as the author link.
                                                        e.stopPropagation();
                                                        handleNavigation(`/tags/${item}`);
                                                    }}
                                                >
                                                    {item}
                                                </p>
                                            ))}
                                            {/* If 'showEllipsis' is true, we render the '...' span. It's not clickable. */}
                                            {showEllipsis && (
                                                <span
                                                    key="ellipsis"
                                                    className="p-homecardcontent-tags tags-ellipsis"
                                                    style={{ cursor: "default", pointerEvents: "none" }}
                                                >
                                                    …
                                                </span>
                                            )}
                                        </>
                                    );
                                })()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCardContent;