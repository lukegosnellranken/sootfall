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
                    title1 = "Burning the Night"
                    image1 = {lightTheme ? wutheringLight : wutheringDark}
                    description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel convallis ipsum. Mauris viverra, nisl vel mattis fringilla, ex quam faucibus felis, vitae bibendum risus quam sit amet purus. Quisque fringilla vehicula justo sed egestas. Nam pharetra neque quis erat laoreet, eu fermentum lacus ullamcorper."
                />
            </div>
            <div id="div-homecomponent-side-card">
                <HomeSideCard
                    title1 = "Burning the Night"
                    image1 = {lightTheme ? wutheringLight : wutheringDark}
                    description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel convallis ipsum. Mauris viverra, nisl vel mattis fringilla, ex quam faucibus felis, vitae bibendum risus quam sit amet purus. Quisque fringilla vehicula justo sed egestas. Nam pharetra neque quis erat laoreet, eu fermentum lacus ullamcorper."
                    title2 = "Buy Us a Coffee"
                    image2 = {beans}
                    description2 = "Sootfall is ran completely independently, so in order for us to continue covering site costs, please consider buying us a coffee. All donations are greatly appreciated."
                />
            </div>
        </div>
    )
}

export default HomeComponent;