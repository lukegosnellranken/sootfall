import React from "react";
import './HomeMobileCard.scss';

function MobileCard(props) {
    return (
        <div id="div-homemobilecard-container">
            <div id="div-homemobilecard-stitch">
                <div id="div-homemobilecard-content-container">
                    <div id="div-homemobilecard-image">
                        <img id="image-homemobilecard-image" src={props.image1} alt="" />
                    </div>
                    <div id="div-homemobilecard-title-content">
                        <h1 id="h1-homemobilecard-title" className="section-title">{props.title1}</h1>
                        <p id="p-homemobilecard-content">{props.description1}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MobileCard;