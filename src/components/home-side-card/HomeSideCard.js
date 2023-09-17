import React from "react";
import './HomeSideCard.css';

function SideCard(props) {
    return (
        <div id="div-homesidecard-container">
            <div id="div-homesidecard-stitch">
                <div id="div-homesidecard-content">
                    <div id="div-section-1" className="sections">
                        <p id="p-section-1-title" className="section-title">{props.title1}</p>
                        <img id="image-section-1-image" src={props.image1} alt="" />
                        <p id="p-section-1-content" className="section-content">{props.description1}</p>
                    </div>
                    <div className="separator"></div>
                    <div id="div-section-2" className="sections">
                        <p id="p-section-2-title" className="section-title">{props.title2}</p>
                        <p id="p-section-2-content"  className="section-content">{props.description2}</p>
                        <img id="image-section-2-image" src={props.image2} alt="" /> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideCard;