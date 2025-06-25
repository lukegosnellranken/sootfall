import React from "react";
import './HomeComponent.scss';
import HomeCard from "../home-card/HomeCard";
import HomeSideCard from "../home-side-card/HomeSideCard";
import HomeMobileCard from "../home-mobile-card/HomeMobileCard";
import wuthering from '../../images/wuthering.jpg';
import beans from '../../images/coffee-beans.png';

function HomeComponent() {
    return (
        <div id="homecomponent-container">
            <div id="div-homecomponent-mobile-card">
                <HomeMobileCard
                    title1 = "Burning the Night"
                    image1 = {wuthering}
                    description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit vestibulum aliquam. Integer sed luctus mauris, in eleifend est. Praesent aliquet orci nec nisi iaculis pharetra. Donec aliquam neque sit amet laoreet auctor."
                />
            </div>
            <div id="div-homecomponent-card">
                <HomeCard
                    title = "Ruminations"
                    pageType = "home"
                />
            </div>
            <div id="div-homecomponent-side-card">
                <HomeSideCard
                    title1 = "Burning the Night"
                    image1 = {wuthering}
                    description1 = "Sootfall is a collective of prose and poetry writers seeking to understand and put to order the unending enigma of being through the God-given craft of thoughtful expression."
                    title2 = "Buy Us a Coffee"
                    image2 = {beans}
                    description2 = "Sootfall is ran completely independently, so in order for us to continue covering site costs, please consider buying us a coffee. All donations are greatly appreciated."
                />
            </div>
        </div>
    )
}

export default HomeComponent;