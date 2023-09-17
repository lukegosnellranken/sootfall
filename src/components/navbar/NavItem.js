import React from "react";
import './NavItem.css';

function NavItem(props) {
    return (
        <li id="li-nav-item"><a href={"http://gingernook.com/" + props.href}>{props.name}</a></li>
    )
}

export default NavItem;