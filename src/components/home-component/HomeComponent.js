import React from "react";
import './HomeComponent.css';
import HomeCard from "../home-card/HomeCard";
import HomeSideCard from "../home-side-card/HomeSideCard";
import HomeMobileCard from "../home-mobile-card/HomeMobileCard";
import sid from '../../images/sid7.png';
import sidmobile from '../../images/sid7-mobile.png';
import beans from '../../images/coffee-beans5.png';

function HomeComponent() {
    return (
        <div id="homecomponent-container">
            <div id="div-homecomponent-mobile-card">
                <HomeMobileCard
                    title1 = "Welcome to Ginger Nook!"
                    image1 = {sidmobile}
                    description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit vestibulum aliquam. Integer sed luctus mauris, in eleifend est. Praesent aliquet orci nec nisi iaculis pharetra. Donec aliquam neque sit amet laoreet auctor."
                />
            </div>
            <div id="div-homecomponent-card">
                <HomeCard
                    title = "Writings from the Cribside"
                />
            </div>
            <div id="div-homecomponent-side-card">
                <HomeSideCard
                    title1 = "Welcome to Ginger Nook!"
                    image1 = {sid}
                    description1 = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi hendrerit vestibulum aliquam. Integer sed luctus mauris, in eleifend est. Praesent aliquet orci nec nisi iaculis pharetra. Donec aliquam neque sit amet laoreet auctor. Maecenas sem odio, varius quis metus ut, placerat viverra nulla. Donec mattis velit mauris, ut pellentesque dolor aliquam eu. Quisque vehicula magna massa, sed facilisis justo maximus et. Pellentesque a finibus nibh. Nullam in elementum risus. Suspendisse lacinia fringilla metus nec vehicula. Fusce maximus velit id tempor pharetra."
                    title2 = "Buy Us a Coffee"
                    image2 = {beans}
                    description2 = "Ginger Nook is ran completely independently, so in order for us to continue covering site costs, please consider buying us a coffee. All donations are greatly appreciated!"
                />
            </div>
        </div>
    )
}

export default HomeComponent;