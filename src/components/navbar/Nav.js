"use client";

import React, { useState, useEffect, useCallback } from "react";
import './Nav.scss';
import './CustomDropdown.scss';
import NavItem from "./NavItem";
import { useRouter } from 'next/navigation';
import { useSettings } from "../../config/Settings";
import themes from '../../config/themes.json'
import fonts from '../../config/fonts.json';
import sizes from '../../config/sizes.json';
 
function Nav() {
    const navigate = useRouter();
    const [search, setSearch] = useState("");
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { theme, setTheme, font, setFont, size, setSize, readAloud, setReadAloud } = useSettings();
    // Dropdown variables
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const themeOptions = themes.map(t => t.title);
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
    const fontOptions = fonts.map(f => f.title);
    const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
    const sizeOptions = sizes.map(s => s.title);
    // Set svg color on client after DOM load -- needs a fix.
    const [svgColorDormant, setSvgColorDormant] = useState('');
    const [svgColorActive, setSvgColorActive] = useState('');
    useEffect(() => {
        const colorDormant = getComputedStyle(document.documentElement).getPropertyValue('--site-theme-element-color-dormant');
        const colorActive = getComputedStyle(document.documentElement).getPropertyValue('--site-theme-text-color');
        setSvgColorDormant(colorDormant);
        setSvgColorActive(colorActive);
    }, [theme]);

    // Track focus for the search input so that the above svg color vars can be used accordingly
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate.push(`/search?q=${encodeURIComponent(search.trim())}`);
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

    function handleSizeSelect(option) {
        setSize(formatSize(option));
        setSizeDropdownOpen(false);
    }

    // Format font as JSON given the selected font from the dropdown
    function formatTheme(value) {
        // Find the theme object by title, otherwise set to object with id of 1
        return themes.find(t => t.title === value) || themes.find(t => t.id === 1);
    }

    // Format font as JSON given the selected font from the dropdown
    function formatFont(value) {
        // Find the font object by title, otherwise set to object with id of 1
        return fonts.find(f => f.title === value) || fonts.find(f => f.id === 1); 
    }

    // Format font as JSON given the selected font from the dropdown
    function formatSize(value) {
        // Find the sizes object by title, otherwise set to object with id of 1
        return sizes.find(s => s.title === value) || sizes.find(s => s.id === 1); 
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

    console.log(readAloud);

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
                                <span className={hamburgerOpen && !settingsOpen ? "open" : "close"}></span>
                                <span className={hamburgerOpen && !settingsOpen ? "open" : "close"}></span>
                                <span className={hamburgerOpen && !settingsOpen ? "open" : "close"}></span>
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
                            <div className="switch-item-text">Theme</div>
                            <div className="switch-item-selection">
                                {/* Custom dropdown for Theme */}
                                <div 
                                    className={`custom-dropdown${themeDropdownOpen ? " open" : ""}`}
                                    tabIndex={0}
                                    onBlur={() => setThemeDropdownOpen(false)}
                                >
                                    <div
                                        className="custom-dropdown-selected"
                                        onClick={() => setThemeDropdownOpen(open => !open)}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${svgColorDormant}' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`
                                        }}
                                    >
                                        <span className="span-custom-dropdown-selected">{theme.title}</span>
                                    </div>
                                    <div className="custom-dropdown-options">
                                        {/* Only render options when the dropdown is open for the sake of animation */}
                                        {themeDropdownOpen &&
                                            themeOptions
                                                .filter(option => option !== theme.title)
                                                .map((option, index) => (
                                                    <div
                                                        key={option}
                                                        className={index === 0 ? "custom-dropdown-option first-option" : "custom-dropdown-option"}
                                                        id={themeOptions.length < 3 ? "only-option" : ""}
                                                        onClick={() => handleThemeSelect(option)}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="switch-item">
                            <div className="switch-item-text">Text Size</div>
                            <div className="switch-item-selection">
                                {/* Custom dropdown for Text Size */}
                                <div 
                                    className={`custom-dropdown${sizeDropdownOpen ? " open" : ""}`}
                                    tabIndex={0}
                                    onBlur={() => setSizeDropdownOpen(false)}
                                >
                                    <div
                                        className="custom-dropdown-selected"
                                        onClick={() => setSizeDropdownOpen(open => !open)}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${svgColorDormant}' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`
                                        }}
                                    >
                                        <span className="span-custom-dropdown-selected">{size.title}</span>
                                    </div>
                                    <div className="custom-dropdown-options">
                                        {/* Only render options when the dropdown is open for the sake of animation */}
                                        {sizeDropdownOpen &&
                                            sizeOptions
                                                .filter(option => option !== size.title)
                                                .map((option, index) => (
                                                    <div
                                                        key={option}
                                                        className={index === 0 ? "custom-dropdown-option first-option" : "custom-dropdown-option"}
                                                        id={sizeOptions.length < 3 ? "only-option" : ""}
                                                        onClick={() => handleSizeSelect(option)}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="switch-item">
                            <div className="switch-item-text">Font</div>
                            <div className="switch-item-selection">
                                {/* Custom dropdown for Font */}
                                <div 
                                    className={`custom-dropdown${fontDropdownOpen ? " open" : ""}`}
                                    tabIndex={0}
                                    onBlur={() => setFontDropdownOpen(false)}
                                >
                                    <div
                                        className="custom-dropdown-selected"
                                        onClick={() => setFontDropdownOpen(open => !open)}
                                        style={{
                                            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${svgColorDormant}' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`
                                        }}
                                    >
                                        <span className="span-custom-dropdown-selected">{font.title}</span>
                                    </div>
                                    <div className="custom-dropdown-options">
                                        {/* Only render options when the dropdown is open for the sake of animation */}
                                        {fontDropdownOpen &&
                                            fontOptions
                                                .filter(option => option !== font.title)
                                                .map((option, index) => (
                                                    <div
                                                        key={option}
                                                        className={index === 0 ? "custom-dropdown-option first-option" : "custom-dropdown-option"}
                                                        id={fontOptions.length < 3 ? "only-option" : ""}
                                                        onClick={() => handleFontSelect(option)}
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="switch-item">
                            <div className="switch-item-text">Audio</div>
                            <div className="switch-item-selection">
                                <div className="div-switch">
                                    <label className="switch">
                                        <input id="switch-input" type="checkbox" onChange={toggleReadAloud} checked={readAloud}/>
                                        <span className="slider">
                                            <span className="slider-knob"></span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    );
}

export default Nav;