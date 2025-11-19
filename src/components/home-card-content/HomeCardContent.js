import React, { useEffect, useRef, useState } from "react";
import './HomeCardContent.scss';
import { useRouter } from 'next/navigation';

function HomeCardContent(props) {
    // The solution for a Link inside a Link (nested <a> tags)
    const navigate = useRouter();
    const wrapperRef = useRef();
    const [visibleCount, setVisibleCount] = useState(props.tags ? props.tags.length : 0);

    const handleNavigation = (path) => {
        navigate.push(path);
    };

    // Get the number correllating to the last visible tag before overflow
    useEffect(() => {
        if (!props.tags) return;
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        let total = 0;
        let lastFullyVisibleIndex = -1;
        // Create a temporary element to measure tag width
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.style.whiteSpace = 'nowrap';
        temp.className = 'p-homecardcontent-tags';
        document.body.appendChild(temp);

        for (let i = 0; i < props.tags.length; i++) {
            temp.textContent = props.tags[i];
            const tagWidth = temp.offsetWidth + 16; // adjust for margin/padding
            if (total + tagWidth <= wrapper.offsetWidth) {
                total += tagWidth;
                lastFullyVisibleIndex = i;
            } else {
                break;
            }
        }
        // Now that we know the value of visibleCount, delete the temporary element
        document.body.removeChild(temp);

        setVisibleCount(lastFullyVisibleIndex + 2); // Changed to 2. Seems to fit the correct number of tags better
    }, [props.tags]);
    
    return (
        <div className="article-link" onClick={() => handleNavigation(props.sub)}>
            <div id="div-homecardcontent-container">
                <div id="div-homecardcontent-image">
                    <img src={props.image} alt="" id="image-homecardcontent-image" draggable="false"/>
                </div>
                <div id="div-homecardcontent-article-info">
                    <div id="div-homecardcontent-title-date-tags">
                        <p id="p-homecardcontent-title">{props.title}</p>
                        <div id="div-homecardcontent-author-date">
                            {
                                <p id="p-homecardcontent-author-date">
                                    By
                                    <span id="span-homecardcontent-author"
                                        onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent div click event
                                                handleNavigation(`/authors/${props.author.toLowerCase()}`);
                                        }}
                                    >
                                        {props.author}
                                    </span>
                                     - 
                                    <span id="span-homecardcontent-date">{props.date}</span>
                                </p>
                            }
                        </div>
                        <div id="div-homecardcontent-tags">
                            <div id="tags-ellipsis-wrapper" ref={wrapperRef}>
                                {/* Only render tags if props.tags exists */}
                                {props.tags && Array.isArray(props.tags) && (() => {
                                    // Only show elipses if the number of visible tags is lesser than the total number of tags
                                    const showEllipsis = visibleCount < props.tags.length;
                                    const tagsToShow = showEllipsis
                                        // If true, bind a new array containing only tags up to, but not including visibleCount minus 1
                                        ? props.tags.slice(0, visibleCount - 1)
                                        // If false, bind a new array containing only tags up to, but not including visibleCount, leaving room for the elipses span below
                                        : props.tags.slice(0, visibleCount);
                                    return (
                                        <>
                                            {tagsToShow.map(item => (
                                                <p
                                                    key={item}
                                                    className="p-homecardcontent-tags"
                                                    onClick={e => {
                                                        e.stopPropagation(); // Prevent parent div click event
                                                        handleNavigation(`/tags/${item}`);
                                                    }}
                                                >
                                                    {item}
                                                </p>
                                            ))}
                                            {/* If showElipses is true, fill the space (see tagsToShow assignment above) with an elipses */}
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