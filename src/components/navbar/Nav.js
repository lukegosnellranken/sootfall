import React, { useState, useEffect, useCallback } from "react";
import './Nav.scss';
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../Settings";
 
function Nav() {
    const [search, setSearch] = useState("");
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const navigate = useNavigate();
    const { theme, setTheme, font, setFont, readAloud, setReadAloud } = useSettings();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`);
            setSearch("");
        }
    }

    // Format font as JSON given the selected font from the dropdown
    function formatTheme(value) {
        switch (value) {
            case "Dark":
                return {
                    "title": "Dark"
                }
            case "Light":
                return {
                    "title": "Light"
                }
            default :
                return {
                    "title": "Dark"
                }
        }
    }

    // Format font as JSON given the selected font from the dropdown
    function formatFont(value) {
        switch (value) {
            case "SootType":
                return {
                    "title": "SootType",
                    "value": "Bilbo, sans-serif",
                    "letterSpacing": "0.03em",
                    "fontSizeAdjust": "cap-height 0.7"
                }
            case "Arial":
                return {
                    "title": "Arial",
                    "value": "Arial, sans-serif",
                    "letterSpacing": "-0.03em",
                    "fontSizeAdjust": "cap-height 0.55"
                }
            case "Georgia":
                return {
                    "title": "Georgia",
                    "value": "Georgia, sans-serif",
                    "letterSpacing": "-0.03em",
                    "fontSizeAdjust": "cap-height 0.5"
                }
            case "Bucket":
                return {
                    "title": "Bucket",
                    "value": "Trebuchet MS, sans-serif",
                    "letterSpacing": "-0.03em",
                    "fontSizeAdjust": "cap-height 0.57"
                }
            default:
                return {
                    "title": "SootType",
                    "value": "Bilbo, sans-serif",
                    "letterSpacing": "0.03em",
                    "fontSizeAdjust": "cap-height 0.7"
                }
        }
    } 

    // Close menus when the user navigates away from the current page
    useEffect(() => {
        setHamburgerOpen(false);
        setSettingsOpen(false);
    }, [navigate]);

    function toggleReadAloud() {
        setReadAloud(prev => !prev);
    }

    // Classy menu opening/closing
    function menuAction(menu) {
        if (menu === "hamburger") {
            if (settingsOpen) {
                setSettingsOpen(!settingsOpen);
                setTimeout(() => {
                    setHamburgerOpen(!hamburgerOpen);   
                }, 350);
            } else {
                setHamburgerOpen(!hamburgerOpen);
            }
        }
        if (menu === "settings") {
            if (hamburgerOpen) {
                setHamburgerOpen(!hamburgerOpen);
                setTimeout(() => {
                    setSettingsOpen(!settingsOpen);   
                }, 350);
            } else {
                setSettingsOpen(!settingsOpen);
            }
        }
    }

    // Show or hide hamburger/settings content by changing pointer-events
    // This makes it so that the ul elements don't get in the way of the clickable elements beneath them
    // Also, the user cannot accidently click on elements within the ul tags that are not currently visible
    const hideContent = useCallback(() => {
        const settingsTag = document.getElementById("ul-settings");
        const hamburgerTag = document.getElementById("ul-nav-list-mobile");
        if (!settingsOpen) {
            settingsTag.style.pointerEvents = 'none';
        } else {
            settingsTag.style.pointerEvents = 'auto';
        }
        if (!hamburgerOpen) {
            hamburgerTag.style.pointerEvents = 'none';
        } else {
            hamburgerTag.style.pointerEvents = 'auto';
        }
    }, [hamburgerOpen, settingsOpen]);

    useEffect(() => {
        hideContent();
    }, [hamburgerOpen, settingsOpen, hideContent]);

    return(
        <div id="div-nav-container">
            <nav id="nav-nav">
                <div id="nav-list-desktop">
                    <div id="div-nav-list">
                        <ul id="ul-nav-list">
                            <NavItem name="Home" href="#"/>
                            <NavItem name="Writings" href="articles"/>
                            <NavItem name="Authors" href="authors"/>
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
                                onClick={() => menuAction("settings")}
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
                                menuAction("hamburger")
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
                                    menuAction("settings")
                                }}
                            >
                                <span id="span-gear-mobile" className={settingsOpen && !hamburgerOpen ? "open" : "close"}></span>
                            </button>
                        </div>
                    </div>
                    <ul id="ul-nav-list-mobile" className={hamburgerOpen && !settingsOpen ? "open" : "close"}>
                        <div className="settings-stitch"></div>
                        <div id="div-ul-nav-list-mobile-items">
                            <NavItem name="Home" href="#"/>
                            <NavItem name="Writings" href="articles"/>
                            <NavItem name="Authors" href="authors"/>
                            <NavItem name="Donate" href="#"/>
                        </div>
                    </ul>
                </div>
            </nav>
            <div id="div-settings-content">
                <ul id="ul-settings" className={settingsOpen && !hamburgerOpen ? "open" : "close"}>
                    <div className="settings-stitch"></div>
                    <div id="div-switch-items">
                        <div className="switch-item">
                            <span className="switch-item-text">Theme</span>
                            <select 
                                name="theme" 
                                id="select-theme"
                                className="select-settings"
                                value={theme.title}
                                // Update the CSS variable with the new theme value
                                onChange={e => setTheme(formatTheme(e.target.value))}
                            >
                                <option>Dark</option>
                                <option>Light</option>
                            </select>
                        </div>
                        <div className="switch-item">
                            <span className="switch-item-text">Font</span>
                            <select 
                                name="font" 
                                id="select-font"
                                className="select-settings"
                                value={font.title}
                                // Update the CSS variable with the new font value
                                onChange={e => setFont(formatFont(e.target.value))}
                            >
                                <option>SootType</option>
                                <option>Arial</option>
                                <option>Georgia</option>
                                <option>Bucket</option>
                            </select>
                        </div>
                        <div className="switch-item">
                            <span className="switch-item-text">Read-Aloud</span>
                            <label className="switch">
                                <input type="checkbox" onClick={toggleReadAloud} defaultChecked={readAloud}/>
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Nav;