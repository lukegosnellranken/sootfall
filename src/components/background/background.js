import React from "react";
import './background.scss';
import logo from '../../images/sootfall-logo9.png';
// import tagline from '../../images/sootfall-tagline.png';
// import bmc from '../../images/bmc-logo.png'; 
import wutheringman from '../../images/wutheringman2.png';

const homeLink = process.env.REACT_APP_HOME;
const backendLink = process.env.REACT_APP_API_URL;

function Background() {
    return (
        <div>
            <div id="div-background-container">
                <div id="div-background-logo">
                    <a href={homeLink}>
                        {<img src={logo} alt="logo" id="image-background-logo" href={homeLink} draggable="false"/>}
                    </a>
                </div>
                {/* <div id="div-background-bmc">
                    <a href="http://localhost:3000/" target="_blank" rel="noreferrer"><img id="image-background-bmc" src={bmc} alt="" /> </a>
                </div> */}
                <div id="div-wutheringman">
                    <img id="img-wutheringman" src={wutheringman} alt="wutheringman"/>
                </div>
                {/* <div id="div-background-social-links">
                    <a id="social-links-facebook" href="https://gingernook.com/" className="fa fa-facebook social-link"> </a>
                    <a id="social-links-pinterest" href="https://gingernook.com/" className="fa fa-pinterest social-link"> </a>
                    <a id="social-links-instagram" href="https://gingernook.com/" className="fa fa-instagram social-link"> </a>
                    <a id="social-links-rss" href="https://gingernook.com/" className="fa fa-rss social-link"> </a>
                </div> */}
                <div id="div-background-social-links">
                    <ul id="ul-background-social-links">
                        <a id="social-links-rss" href={`${backendLink}/api/rss.xml`} target="_blank" rel="noreferrer" className="fa fa-rss social-link"> </a>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Background;