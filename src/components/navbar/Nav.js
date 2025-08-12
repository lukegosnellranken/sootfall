import React, { useState, useEffect, useCallback } from "react";
import './Nav.scss';
import './CustomDropdown.scss';
import NavItem from "./NavItem";
import { useNavigate } from "react-router-dom";
import { useSettings } from "../../Settings";
 
function Nav() {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { theme, setTheme, font, setFont, readAloud, setReadAloud } = useSettings();
    // Dropdown variables
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const themeOptions = ["Dark", "Light"];
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
    const fontOptions = ["SootType", "Arial", "Georgia", "Bucket"];
    // Set vars to CSS custom properties
    const svgColorDormant = getComputedStyle(document.documentElement).getPropertyValue('--site-theme-element-color-dormant');
    const svgColorActive = getComputedStyle(document.documentElement).getPropertyValue('--site-theme-text-color');
    // Track focus for the search input so that the above svg color vars can be used accordingly
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/search/${encodeURIComponent(search.trim())}`);
            setSearch("");
        }
    }

    // Dropdown functions
    function handleThemeSelect(option) {
        setTheme(formatTheme(option));
        setThemeDropdownOpen(false);
    }

    function handleFontSelect(option) {
        setFont(formatFont(option));
        setFontDropdownOpen(false);
    }

    // Format font as JSON given the selected font from the dropdown
    function formatTheme(value) {
        switch (value) {
            case "Dark":
                return {
                    "title": "Dark",
                    "backgroundImage": "linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(0, 0, 0, 0.95))",
                    "backgroundImageGradient": "linear-gradient(to bottom, rgba(5, 5, 5, .7), rgba(0, 0, 0, .7))",
                    "backgroundImageBanner": "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
                    "backgroundColorInput": "rgba(10, 10, 10, 0.95)",
                    "backgroundColorInputAlt": "rgba(50, 50, 50, 0.95)",
                    "backgroundColorSwitchItem": "rgba(130, 130, 130, 1)",
                    "backgroundColorSwitchItemToggle": "rgba(130, 130, 130, 0.95)",
                    "backgroundColorSwitchItemToggleAlt": "rgba(50, 50, 50, 1)",
                    "hoverColor": "rgba(17, 17, 17, 0.5)",
                    "boxShadow": "0em 0em .8em .15em rgba(255, 255, 255, 0.199)",
                    "boxShadowTop": "0em 0.3em .8em .05em rgba(255, 255, 255, 0.199)",
                    "textColor": "rgba(130, 130, 130, 1)",
                    "textColorAlt": "rgba(200, 200, 200, 1)",
                    "textShadow": ".05em .05em .05em rgba(73, 73, 73, 1)",
                    "elementColorDormant": "rgba(50, 50, 50, 0.95)"
                }
            case "Light":
                return {
                    "title": "Light",
                    "backgroundImage": "linear-gradient(to bottom, rgba(150, 150, 150, 0.95), rgba(90, 90, 90, 0.95))",
                    "backgroundImageGradient": "linear-gradient(to bottom, rgba(250, 250, 250, 0.4), rgba(230, 230, 230, 0.4))",
                    "backgroundImageBanner": "linear-gradient(rgba(200, 200, 200, 0.6), rgba(150, 150, 150, 0.6))",
                    "backgroundColorInput": "rgba(200, 200, 200, 0.95)",
                    "backgroundColorInputAlt": "rgba(120, 120, 120, 0.95)",
                    "backgroundColorSwitchItem": "rgba(200, 200, 200, 0.95)",
                    "backgroundColorSwitchItemToggle": "rgba(200, 200, 200, 0.95)",
                    "backgroundColorSwitchItemToggleAlt": "rgba(130, 130, 130, 1)",
                    "hoverColor": "rgba(125, 125, 125, 0.5)",
                    "boxShadow": "0em 0em .8em .15em rgba(0, 0, 0, 0.5)",
                    "boxShadowTop": "0em 0.3em .8em .05em rgba(0, 0, 0, 0.5)",
                    "textColor": "rgba(50, 50, 50, 1)",
                    "textColorAlt": "rgba(100, 100, 100, 1)",
                    "textShadow": ".05em .05em .05em rgba(150, 150, 150, 1)",
                    "elementColorDormant": "rgba(100, 100, 100, 0.95)"
                }
            default :
                return {
                    "title": "Dark",
                    "backgroundImage": "linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(0, 0, 0, 0.95))",
                    "backgroundImageGradient": "linear-gradient(to bottom, rgba(5, 5, 5, .7), rgba(0, 0, 0, .7))",
                    "backgroundImageBanner": "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
                    "backgroundColorInput": "rgba(10, 10, 10, 0.95)",
                    "backgroundColorInputAlt": "rgba(50, 50, 50, 0.95)",
                    "backgroundColorSwitchItem": "rgba(130, 130, 130, 1)",
                    "backgroundColorSwitchItemToggle": "rgba(130, 130, 130, 0.95)",
                    "backgroundColorSwitchItemToggleAlt": "rgba(50, 50, 50, 1)",
                    "hoverColor": "rgba(17, 17, 17, 0.5)",
                    "boxShadow": "0em 0em .8em .15em rgba(255, 255, 255, 0.199)",
                    "boxShadowTop": "0em 0.3em .8em .05em rgba(255, 255, 255, 0.199)",
                    "textColor": "rgba(130, 130, 130, 1)",
                    "textColorAlt": "rgba(200, 200, 200, 1)",
                    "textShadow": ".05em .05em .05em rgba(73, 73, 73, 1)",
                    "elementColorDormant": "rgba(50, 50, 50, 0.95)"
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
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                style = {{
                                    "backgroundImage":`url("data:image/svg+xml,%3Csvg%20fill='${isFocused ? svgColorActive : svgColorDormant}'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M15.5%2014h-.79l-.28-.27A6.471%206.471%200%200016%209.5%206.5%206.5%200%20109.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99a1%201%200%20001.41-1.41l-4.99-5zm-6%200C8.01%2014%206%2011.99%206%209.5S8.01%205%2010.5%205%2015%207.01%2015%209.5%2012.99%2014%2010.5%2014z'%3E%3C/path%3E%3C/svg%3E")`
                                }}
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
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                style = {{
                                    "backgroundImage":`url("data:image/svg+xml,%3Csvg%20fill='${isFocused ? svgColorActive : svgColorDormant}'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M15.5%2014h-.79l-.28-.27A6.471%206.471%200%200016%209.5%206.5%206.5%200%20109.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99a1%201%200%20001.41-1.41l-4.99-5zm-6%200C8.01%2014%206%2011.99%206%209.5S8.01%205%2010.5%205%2015%207.01%2015%209.5%2012.99%2014%2010.5%2014z'%3E%3C/path%3E%3C/svg%3E")`
                                }}
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
                            {/* Custom dropdown for Theme */}
                            <div 
                                className="custom-dropdown"
                                tabIndex={0}
                                onBlur={() => setThemeDropdownOpen(false)}
                            >
                                <div
                                    className="custom-dropdown-selected"
                                    onClick={() => setThemeDropdownOpen(open => !open)}
                                    style = {{
                                        "backgroundImage":`url("data:image/svg+xml;utf8,<svg fill='${svgColorDormant}' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`
                                    }}
                                >
                                    {theme.title}
                                </div>
                                {themeDropdownOpen && (
                                    <div className="custom-dropdown-options">
                                        {themeOptions
                                        .filter(option => option !== theme.title) // Filter out the currently selected option
                                        .map((option, index) => (
                                            <div
                                                key={option}
                                                className={index === 0 ? "custom-dropdown-option first-option" : "custom-dropdown-option"}
                                                id={themeOptions.length < 3 ? "only-option" : ""}
                                                onClick={() => handleThemeSelect(option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="switch-item">
                            <span className="switch-item-text">Font</span>
                            {/* Custom dropdown for Font */}
                            <div 
                                className="custom-dropdown"
                                tabIndex={0}
                                onBlur={() => setFontDropdownOpen(false)}
                            >
                                <div
                                    className="custom-dropdown-selected"
                                    onClick={() => setFontDropdownOpen(open => !open)}
                                    style = {{
                                        "backgroundImage":`url("data:image/svg+xml;utf8,<svg fill='${svgColorDormant}' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`
                                    }}
                                >
                                    {font.title}
                                </div>
                                {fontDropdownOpen && (
                                    <div className="custom-dropdown-options">
                                        {fontOptions
                                        .filter(option => option !== font.title) // Filter out the currently selected option
                                        .map((option, index) => (
                                            <div
                                                key={option}
                                                className={index === 0 ? "custom-dropdown-option first-option" : "custom-dropdown-option"}
                                                id={fontOptions.length < 3 ? "only-option" : ""}
                                                onClick={() => handleFontSelect(option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
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