import React from "react";
import './HomeMobileCard.css';

function MobileCard(props) {
    return (
        <div id="div-homemobilecard-container">
            <div id="div-homemobilecard-stitch">
                <div id="div-homemobilecard-content-container">
                    <div id="div-homemobilecard-image">
                        <img id="image-homemobilecard-image" src={props.image1} alt="" />
                    </div>
                    <div id="div-homemobilecard-title-content">
                        <p id="p-homemobilecard-title">{props.title1}</p>
                        <p id="p-homemobilecard-content">{props.description1}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileCard;