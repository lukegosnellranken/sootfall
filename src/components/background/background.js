import React from "react";
import './background.css';
import logo from '../../images/gingernooklogo-plain3.png';
import bmc from '../../images/bmc-logo3.png'; 

function Background() {
    return (
        <div>
            <div id="div-background-container">
                <a href="http://gingernook.com/">
                    {<img src={logo} alt="logo" id="image-background-logo" href="http://gingernook.com"/>}
                </a>
                <div id="div-background-bmc">
                    <a href="https://buymeacoffee.com/gingernook" target="_blank" rel="noreferrer"><img id="image-background-bmc" src={bmc} alt="" /> </a>
                </div>
                <div id="div-background-social-links">
                    <a id="social-links-facebook" href="https://gingernook.com/" className="fa fa-facebook social-link"> </a>
                    <a id="social-links-pinterest" href="https://gingernook.com/" className="fa fa-pinterest social-link"> </a>
                    <a id="social-links-instagram" href="https://gingernook.com/" className="fa fa-instagram social-link"> </a>
                    <a id="social-links-rss" href="https://gingernook.com/" className="fa fa-rss social-link"> </a>
                </div>
            </div>
        </div>
    )
}

export default Background;