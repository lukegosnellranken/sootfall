import React, { useMemo } from "react";
import './HomeComponent.scss';
import { useSettings } from "../../Settings";
import HomeCard from "../home-card/HomeCard";
import HomeSideCard from "../home-side-card/HomeSideCard";
import HomeMobileCard from "../home-mobile-card/HomeMobileCard";
import wutheringLight from '../../images/wuthering-side-light.jpg';
import wutheringDark from '../../images/wuthering-side-dark.jpg';
import beans from '../../images/coffee-beans.png';

function HomeComponent() {
    const { theme } = useSettings(); // Instantiate theme object from Settings.js
    // Since lightTheme is computed from other reactive data (theme.title), only recalcualte it when theme changes
    const lightTheme = useMemo(() => theme.title === "Light", [theme]);;

    return (
        <div id="homecomponent-container">
            <div id="div-homecomponent-card">
                <HomeCard
                    title = "Reveries & Ruminations"
                    pageType = "home"
                />
            </div>
            <div id="div-homecomponent-mobile-card">
                <HomeMobileCard
                    title1 = "Settle in the dust..."
                    image1 = {lightTheme ? wutheringLight : wutheringDark}
                    description1 = "for a moment's rest. What surrounds and drifts from above is the fervor of life. Fill your lungs and may your breath stain the world as a blaze in shadow."
                />
            </div>
            <div id="div-homecomponent-side-card">
                <HomeSideCard
                    title1 = "Settle in the dust..."
                    image1 = {lightTheme ? wutheringLight : wutheringDark}
                    description1 = "for a moment's rest. What surrounds and drifts from above is the fervor of life. Fill your lungs and may your breath stain the world as a blaze in shadow."
                    title2 = "Buy Us a Coffee"
                    image2 = {beans}
                    description2 = "Sootfall is ran completely independently. To help continue covering site costs, please consider donating. All gifts are greatly appreciated."
                />
            </div>
        </div>
    )
}

export default HomeComponent;