// This line marks this as a Client Component, which is essential for using React hooks
// like 'useState', 'useEffect', and 'useMemo' that manage state and interactions in the user's browser.
"use client";

// We import the necessary tools and assets.
import React, { useMemo, useState, useEffect } from "react";
// We import the specific styles for this background component.
import './background.scss';
// We import the different logo versions for the light and dark themes.
import logoDark from '../../app/public/images/sootfall-logo-dark.png';
import logoLight from '../../app/public/images/sootfall-logo-light.png';
// 'useSettings' is a custom hook that lets us access the global theme settings.
import { useSettings } from "../../config/Settings";
// We import the different character image versions for the light and dark themes.
import wutheringManDark from '../../app/public/images/wuthering-man-dark.png';
import wutheringManLight from '../../app/public/images/wuthering-man-light.png';

// This section reads environment variables to get the correct URLs for links.
// This allows the site to use different links for local development vs. a live 'cloud' environment.
const env = process.env.NEXT_PUBLIC_ENV;
let homeLink;
let backendLink;
if (env === 'local') {
    // For 'local' development, we use the local home and backend URLs.
    homeLink = process.env.NEXT_PUBLIC_HOME_LOCAL;
    backendLink = process.env.NEXT_PUBLIC_API_URL_LOCAL;
}
else if (env === 'cloud') {
    // For the live 'cloud' site, we use the production URLs.
    homeLink = process.env.NEXT_PUBLIC_HOME_CLOUD;
    backendLink = process.env.NEXT_PUBLIC_API_URL_CLOUD;
}

// This is the 'Background' component. It's responsible for rendering the static but
// theme-aware elements that sit in the background of the site layout, like the logo.
function Background() {
    // We get the current 'theme' object from our global settings using our custom hook.
    const { theme } = useSettings();
    // 'useMemo' is a performance optimization. It calculates a value and 'memoizes' (remembers) it.
    // The value is only recalculated if one of the dependencies in the array '[theme]' changes.
    // Here, we determine if the current theme is 'Light' and store the boolean result.
    const lightTheme = useMemo(() => theme.title === "Light", [theme]);
    
    // This 'hasMounted' state is a common technique to prevent issues with server-side rendering (SSR) and hydration.
    // The server doesn't know the user's theme, so it might render the dark theme by default.
    // When the client-side JavaScript loads, it might render the light theme, causing a "flash" or mismatch.
    // This code ensures the component renders *nothing* on the server and then renders the correct theme on the client.
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        // Once the component "mounts" (is added to the page) in the browser, we set 'hasMounted' to true.
        setHasMounted(true);
    }, []); // The empty array ensures this runs only once.
    // If the component hasn't mounted in the browser yet, we return 'null' so nothing is rendered.
    if (!hasMounted) return null;
    

    // This is the JSX that defines the component's structure.
    return (
        <div>
            {/* This is the main container for all background elements. */}
            <div id="div-background-container">
                {/* This div contains the site logo. */}
                <div id="div-background-logo">
                    {/* The logo is a link that points to the home page. */}
                    <a href={homeLink}>
                        {/* We use a ternary operator to choose the correct logo based on the current theme.
                            If 'lightTheme' is true, we use the light logo; otherwise, we use the dark one. */}
                        {<img src={lightTheme ? logoLight.src : logoDark.src} alt="logo" id="image-background-logo" draggable="false"/>}
                    </a>
                </div>
                {/* This is a commented-out section, likely for a "Buy Me a Coffee" link.
                    It's left in the code but is not currently visible on the site. */}
                {/* <div id="div-background-bmc">
                    <a href="http://localhost:3000/" target="_blank" rel="noreferrer"><img id="image-background-bmc" src={bmc} alt="" /> </a>
                </div> */}
                {/* This div contains the "wuthering man" character image. */}
                <div id="div-wutheringman">
                    {/* Just like the logo, we switch between the light and dark versions of the image based on the theme. */}
                    <img id="img-wutheringman" src={lightTheme ? wutheringManLight.src : wutheringManDark.src} alt="wutheringman"/>
                </div>
                {/* This is another commented-out section for social media links. */}
                {/* <div id="div-background-social-links">
                    <a id="social-links-facebook" href="https://gingernook.com/" className="fa fa-facebook social-link"> </a>
                    <a id="social-links-pinterest" href="https://gingernook.com/" className="fa fa-pinterest social-link"> </a>
                    <a id="social-links-instagram" href="https://gingernook.com/" className="fa fa-instagram social-link"> </a>
                    <a id="social-links-rss" href="https://gingernook.com/" className="fa fa-rss social-link"> </a>
                </div> */}
                {/* This div contains the currently active social links. */}
                <div id="div-background-social-links">
                    <ul id="ul-background-social-links">
                        {/* This is a link to the site's RSS feed. The URL is constructed from the backend link.
                            'target="_blank"' and 'rel="noreferrer"' are important for security and user experience when opening new tabs. */}
                        <a id="social-links-rss" href={`${backendLink}/api/rss.xml`} target="_blank" rel="noreferrer" className="fa fa-rss social-link"> </a>
                    </ul>
                </div>
            </div>
        </div>
    )
}

// We export the Background component so it can be used in the main layout of the application.
export default Background;