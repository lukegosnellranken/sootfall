import React, { useEffect } from "react";
import './HomeCardContent.scss';
import { useNavigate } from "react-router-dom";

function HomeCardContent(props) {
    // The solution for a Link inside a Link (nested <a> tags)
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    useEffect(() => {
        const  wrapper = document.getElementById('tags-ellipsis-wrapper');
        let total = 0;
        let lastFullyVisibleIndex = -1;
        let lastTag = "";
        const children = Array.from(wrapper.children);

        for (let i = 0; i < children.length; i++) {
            const tag = children[i];
            total += tag.offsetWidth;
            if (total <= wrapper.clientWidth) {
                lastFullyVisibleIndex = i;
                lastTag = children[lastFullyVisibleIndex + 1];
            } else {
                break;
            }
        }

        if (lastTag) {
            lastTag.textContent = "...";
            for (let i = 2; i < children.length; i++) {
                if (children[lastFullyVisibleIndex + i]) {
                    children[lastFullyVisibleIndex + i].remove();
                }
            }
        }
    })
    
    return (
        <div className="article-link" onClick={() => handleNavigation(props.sub)}>
            <div id="div-homecardcontent-container">
                <div id="div-homecardcontent-image">
                    <img src={props.image} alt="" id="image-homecardcontent-image" />
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
                            <div id="tags-ellipsis-wrapper">
                                {
                                    props.tags ?
                                    props.tags.map((item => (
                                        <p
                                            key={item}
                                            className="p-homecardcontent-tags"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent div click event
                                                handleNavigation(`/tags/${item}`);
                                            }}
                                        >
                                            {item}
                                        </p>
                                    )))
                                    // invisible text to keep height consistent
                                    : <p className="p-homecardcontent-tags" style={{ visibility: "hidden" }}>|</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCardContent;