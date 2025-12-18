// This line marks this as a Client Component, which is necessary for using hooks like 'useMemo'
// and for accessing the global theme settings in the browser.
"use client";

// We import the necessary tools and components.
import React, { useMemo } from "react";
// We import the specific styles for this component.
import './HomeComponent.scss';
// 'useSettings' is our custom hook to get the current theme.
import { useSettings } from "../../config/Settings";
// We import the various child components that make up the homepage.
import HomeCard from "../home-card/HomeCard";
import HomeSideCard from "../home-side-card/HomeSideCard";
import HomeMobileCard from "../home-mobile-card/HomeMobileCard";
// We import all the different images needed, for both light and dark themes.
import wutheringLight from '../../app/public/images/wuthering-side-light.jpg';
import wutheringDark from '../../app/public/images/wuthering-side-dark.jpg';
import dustLight from '../../app/public/images/dust-light.jpg';
import dustDark from '../../app/public/images/dust-dark.jpg';
import beans from '../../app/public/images/coffee-beans.png';

// This is the 'HomeComponent'. It acts as the main container and layout manager for the homepage.
// It brings together the main article list, a side card for desktop, and a different card for mobile.
function HomeComponent(props) {
    // We get the current 'theme' object from our global settings.
    const { theme } = useSettings();
    // We use 'useMemo' to determine if the theme is 'Light'. This value is memoized (remembered)
    // and only gets recalculated if the 'theme' object changes, which is a performance optimization.
    const lightTheme = useMemo(() => theme.title === "Light", [theme]);;

    // This is the JSX that defines the homepage layout.
    return (
        // This is the main container for all homepage content.
        <div id="homecomponent-container">
            {/* This div holds the main list of articles. */}
            <div id="div-homecomponent-card">
                <HomeCard
                    // We give the article list a title.
                    title = "Reveries & Ruminations"
                    // We tell the 'HomeCard' it's on the 'home' page.
                    pageType = "home"
                    // We pass down the list of articles that was fetched by the parent page component.
                    articles = {props.articles}
                />
            </div>
            {/* This div holds a card that is specifically designed for mobile screen sizes. */}
            {/* It's likely hidden on desktop via CSS. */}
            <div id="div-homecomponent-mobile-card">
                <HomeMobileCard
                    title1 = "Settle in the dust..."
                    // We use a ternary operator to choose the correct image based on the theme.
                    image1 = {lightTheme ? dustLight.src : dustDark.src}
                    description1 = "for a moment's rest among a heap of works stirred up from the blaze beneath the breath."
                />
            </div>
            {/* This div holds the card that appears on the side of the page on larger (desktop) screens. */}
            <div id="div-homecomponent-side-card">
                <HomeSideCard
                    title1 = "Settle in the dust..."
                    // We again select the appropriate image based on the current theme.
                    image1 = {lightTheme ? wutheringLight.src : wutheringDark.src}
                    description1 = "for a moment's rest among a heap of works stirred up from the blaze beneath the breath."
                    // This side card also contains a second section.
                    title2 = "Buy Us a Coffee"
                    image2 = {beans.src}
                    description2 = "Sootfall is run completely independently. To help continue covering site costs, please consider donating. All gifts are greatly appreciated."
                />
            </div>
        </div>
    )
}

// We export the HomeComponent so it can be used as the main content of the homepage.
export default HomeComponent;