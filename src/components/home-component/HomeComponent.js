"use client";

import React, { useMemo } from "react";
import './HomeComponent.scss';
import { useSettings } from "../../config/Settings";
import HomeCard from "../home-card/HomeCard";
import HomeSideCard from "../home-side-card/HomeSideCard";
import HomeMobileCard from "../home-mobile-card/HomeMobileCard";
import dustLight from '../../app/public/images/dust-light.jpg';
import dustDark from '../../app/public/images/dust-dark.jpg';
import beans from '../../app/public/images/coffee-beans.png';

function HomeComponent(props) {
    const { theme } = useSettings(); // Instantiate theme object from Settings.js
    // Since lightTheme is computed from other reactive data (theme.title), only recalcualte it when theme changes
    const lightTheme = useMemo(() => theme.title === "Light", [theme]);;

    return (
        <div id="homecomponent-container">
            <div id="div-homecomponent-card">
                <HomeCard
                    title = "Reveries & Ruminations"
                    pageType = "home"
                    articles = {props.articles}
                />
            </div>
            <div id="div-homecomponent-mobile-card">
                <HomeMobileCard
                    title1 = "Settle in the dust..."
                    image1 = {lightTheme ? dustLight.src : dustDark.src}
                    description1 = "for a moment's rest among a heap of works stirred up from the blaze beneath the breath."
                />
            </div>
            <div id="div-homecomponent-side-card">
                <HomeSideCard
                    title1 = "Settle in the dust..."
                    image1 = {lightTheme ? dustLight.src : dustDark.src}
                    description1 = "for a moment's rest among a heap of works stirred up from the blaze beneath the breath."
                    title2 = "Buy Us a Coffee"
                    image2 = {beans.src}
                    description2 = "Sootfall is ran completely independently. To help continue covering site costs, please consider donating. All gifts are greatly appreciated."
                />
            </div>
        </div>
    )
}

export default HomeComponent;