import React from "react";
import './Nav.css';
import './NavItem'
import NavItem from "./NavItem";
 
function Nav() {
    return(
        <div id="div-nav-container">
            <nav id="nav-nav">
                <div id="div-nav-list">
                    <ul id="ul-nav-list">
                        <NavItem name="Home" href="#"/>
                        <NavItem name="Updates" href="#"/>
                        <NavItem name="Tags" href="#"/>
                        <NavItem name="Donate" href="#"/>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Nav;