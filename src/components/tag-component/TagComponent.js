import React from "react";
import HomeCard from "../home-card/HomeCard";

function TagComponent() {
    const pathname = window.location.pathname.split("/").pop();
    const formattedPathname = pathname.charAt(0).toUpperCase() + pathname.slice(1);

    return(
        <div>
            <HomeCard
                title = {formattedPathname}
                pageType = "tag"
                tag = {pathname}
            />
        </div>
    )
}

export default TagComponent;