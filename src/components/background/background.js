import React, { useMemo } from "react";
import './background.scss';
import logoDark from '../../images/sootfall-logo-dark.png';
import logoLight from '../../images/sootfall-logo-light.png';
import { useSettings } from "../../Settings";
import wutheringManDark from '../../images/wuthering-man-dark.png';
import wutheringManLight from '../../images/wuthering-man-light.png';

// Get data from ~/.env, set API_URL and token
const env = process.env.REACT_APP_ENV;
let homeLink;
let backendLink;
if (env === 'local') {
    homeLink = process.env.REACT_APP_HOME_LOCAL;
    backendLink = process.env.REACT_APP_API_URL_LOCAL;
}
else if (env === 'cloud') {
    homeLink = process.env.REACT_APP_HOME_CLOUD;
    backendLink = process.env.REACT_APP_API_URL_CLOUD;
}

function Background() {
    const { theme } = useSettings(); // Instantiate theme object from Settings.js
    // Since lightTheme is computed from other reactive data (theme.title), only recalcualte it when theme changes
    const lightTheme = useMemo(() => theme.title === "Light", [theme]);;

    return (
        <div>
            <div id="div-background-container">
                <div id="div-background-logo">
                    <a href={homeLink}>
                        {<img src={lightTheme ? logoLight : logoDark} alt="logo" id="image-background-logo" href={homeLink} draggable="false"/>}
                    </a>
                </div>
                {/* <div id="div-background-bmc">
                    <a href="http://localhost:3000/" target="_blank" rel="noreferrer"><img id="image-background-bmc" src={bmc} alt="" /> </a>
                </div> */}
                <div id="div-wutheringman">
                    <img id="img-wutheringman" src={lightTheme ? wutheringManLight : wutheringManDark} alt="wutheringman"/>
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