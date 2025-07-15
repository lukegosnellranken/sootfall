import React, { useState } from "react";
import './Nav.scss';
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
 
function Nav() {
    const [search, setSearch] = useState("");
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`);
            setSearch("");
        }
    }

    return(
        <div id="div-nav-container">
            <nav id="nav-nav">
                <div id="nav-list-desktop">
                    <div id="div-nav-list">
                        <ul id="ul-nav-list">
                            <NavItem name="Home" href="#"/>
                            <NavItem name="Authors" href="authors"/>
                            <NavItem name="Tags" href="tags"/>
                            <NavItem name="Donate" href="#"/>
                        </ul>
                        <form id="form-search" onSubmit={handleSearch}>
                            <input
                                id="input-search"
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </form>
                        <div id="div-settings">
                            <button
                                id="btn-settings"
                                className={hamburgerOpen ? "open" : ""}
                                aria-label="Open menu"
                                onClick={() => setSettingsOpen(!settingsOpen)}
                            >
                                <span id="span-gear" className={settingsOpen ? "open" : "close"}></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <nav id="nav-nav-mobile">
                <div id="nav-list-mobile">
                    <div id="div-mobile-hamburger-search">
                        <button
                            id="btn-hamburger"
                            className={hamburgerOpen ? "open" : ""}
                            aria-label="Open menu"
                            onClick={() => setHamburgerOpen(!hamburgerOpen)}
                        >
                            <div id="div-hamburger">
                                <span className={hamburgerOpen ? "open" : ""} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                                <span className={hamburgerOpen ? "open" : ""} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                                <span className={hamburgerOpen ? "open" : ""} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                            </div>
                        </button>
                        <form id="form-search-mobile" onSubmit={handleSearch}>
                            <input
                                id="input-search-mobile"
                                type="text"
                                placeholder="Search"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </form>
                        <div id="div-settings-mobile">
                            <button
                                id="btn-settings-mobile"
                                className={hamburgerOpen ? "open" : ""}
                                aria-label="Open menu"
                                onClick={() => setSettingsOpen(!settingsOpen)}
                            >
                                <span id="span-gear-mobile" className={settingsOpen ? "open" : "close"}></span>
                            </button>
                        </div>
                    </div>
                    <ul id="ul-nav-list-mobile" className={hamburgerOpen ? "open" : ""}>
                        <NavItem name="Home" href="#"/>
                        <NavItem name="Authors" href="authors"/>
                        <NavItem name="Tags" href="tags"/>
                        <NavItem name="Donate" href="#"/>
                    </ul>
                </div>
            </nav>
            <ul id="ul-settings" className={settingsOpen ? "open" : ""}>
                <li>test</li>
                <li>test</li>
                <li>test</li>
            </ul>
        </div>
    );
}

export default Nav;