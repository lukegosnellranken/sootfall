import React, { useState, useEffect } from "react";
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

    // Close menus when the user navigates away from the current page
    useEffect(() => {
        setHamburgerOpen(false);
        setSettingsOpen(false);
    }, [navigate]);

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
                                className={hamburgerOpen && !settingsOpen ? "open" : "close"}
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
                            className={hamburgerOpen && !settingsOpen ? "open" : "close"}
                            aria-label="Open menu"
                            onClick={() => {
                                setHamburgerOpen(!hamburgerOpen);
                                settingsOpen && setSettingsOpen(!settingsOpen);
                            }}
                        >
                            <div id="div-hamburger">
                                <span className={hamburgerOpen && !settingsOpen ? "open" : "close"} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                                <span className={hamburgerOpen && !settingsOpen ? "open" : "close"} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
                                <span className={hamburgerOpen && !settingsOpen ? "open" : "close"} style={{display: "block", width: "25px", height: "3px", margin: "5px 0"}}></span>
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
                                className={hamburgerOpen && !settingsOpen ? "open" : "close"}
                                aria-label="Open menu"
                                onClick={() => {
                                    setSettingsOpen(!settingsOpen)
                                    hamburgerOpen && setHamburgerOpen(!hamburgerOpen);
                                }}
                            >
                                <span id="span-gear-mobile" className={settingsOpen && !hamburgerOpen ? "open" : "close"}></span>
                            </button>
                        </div>
                    </div>
                    <ul id="ul-nav-list-mobile" className={hamburgerOpen && !settingsOpen ? "open" : "close"}>
                        <NavItem name="Home" href="#"/>
                        <NavItem name="Authors" href="authors"/>
                        <NavItem name="Tags" href="tags"/>
                        <NavItem name="Donate" href="#"/>
                    </ul>
                </div>
            </nav>
            <div id="div-settings-content">
                <ul id="ul-settings" className={settingsOpen && !hamburgerOpen ? "open" : "close"}>
                    <div className="switch-item">
                        <span className="switch-item-text">Font</span>
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="switch-item">
                        <span className="switch-item-text">Read-Aloud</span>
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className="slider"></span>
                        </label>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Nav;