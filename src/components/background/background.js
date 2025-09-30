"use client";

import React, { useMemo, useState, useEffect } from "react";
import './background.scss';
import logoDark from '../../app/public/images/sootfall-logo-dark.png';
import logoLight from '../../app/public/images/sootfall-logo-light.png';
import { useSettings } from "../../config/Settings";
import wutheringManDark from '../../app/public/images/wuthering-man-dark.png';
import wutheringManLight from '../../app/public/images/wuthering-man-light.png';

// Get data from ~/.env, set API_URL and token
const env = process.env.NEXT_PUBLIC_ENV;
let homeLink;
let backendLink;
if (env === 'local') {
    homeLink = process.env.NEXT_PUBLIC_HOME_LOCAL;
    backendLink = process.env.NEXT_PUBLIC_API_URL_LOCAL;
}
else if (env === 'cloud') {
    homeLink = process.env.NEXT_PUBLIC_HOME_CLOUD;
    backendLink = process.env.NEXT_PUBLIC_API_URL_CLOUD;
}

function Background() {
    const { theme } = useSettings(); // Instantiate theme object from Settings.js
    // Since lightTheme is computed from other reactive data (theme.title), only recalcualte it when theme changes
    const lightTheme = useMemo(() => theme.title === "Light", [theme]);
    // Mounting logic supporting lightTheme (do not load component until the client has loaded the DOM)
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);
    if (!hasMounted) return null;
    

    return (
        <div>
            <div id="div-background-container">
                <div id="div-background-logo">
                    <a href={homeLink}>
                        {<img src={lightTheme ? logoLight.src : logoDark.src} alt="logo" id="image-background-logo" draggable="false"/>}
                    </a>
                </div>
                {/* <div id="div-background-bmc">
                    <a href="http://localhost:3000/" target="_blank" rel="noreferrer"><img id="image-background-bmc" src={bmc} alt="" /> </a>
                </div> */}
                <div id="div-wutheringman">
                    <img id="img-wutheringman" src={lightTheme ? wutheringManLight.src : wutheringManDark.src} alt="wutheringman"/>
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