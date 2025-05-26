import React from "react";
import './HomeCardContent.css';
import { useNavigate } from "react-router-dom";

function HomeCardContent(props) {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };
    
    return (
        <div className="article-link" onClick={() => handleNavigation(props.sub)}>
            <div id="div-homecardcontent-container">
                <div id="div-homecardcontent-image">
                    <img src={props.image} alt="" id="image-homecardcontent-image" />
                </div>
                <div id="div-homecardcontent-title-date-tags">
                    <div id="div-homecardcontent-title">
                        <p id="p-homecardcontent-title">{props.title}</p>
                    </div>
                    <div id="div-homecardcontent-date">
                        <p id="p-homecardcontent-date">{props.date}</p>
                    </div>
                    <div id="div-homecardcontent-tags">
                        {
                            props.tags ?
                            props.tags.map((item => (
                                <span
                                    key={item}
                                    className="p-homecardcontent-tags"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent parent div click event
                                        handleNavigation(`/tags/${item}`);
                                    }}
                                >
                                    {item}
                                </span>
                            )))
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeCardContent;