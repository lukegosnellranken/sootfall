// This line marks this as a Client Component, which is essential for a component like a navbar
// that uses extensive state, browser-only APIs, and user interaction hooks.
"use client";

// We import all the necessary tools from React and Next.js.
import React, { useState, useEffect, useCallback } from "react";
// We import the stylesheets for the Nav component and the custom dropdowns.
import './Nav.scss';
import './CustomDropdown.scss';
// We import the NavItem component, which represents a single link in the navbar.
import NavItem from "./NavItem";
// 'useRouter' is used for programmatic navigation (e.g., after a search).
import { useRouter } from 'next/navigation';
// 'useSettings' is our custom hook to access and modify global site settings like theme and font size.
import { useSettings } from "../../config/Settings";
// We import the JSON files that contain our predefined theme, font, and size options.
import themes from '../../config/themes.json'
import fonts from '../../config/fonts.json';
import sizes from '../../config/sizes.json';
 
// This is the main 'Nav' component, which controls the entire navigation and settings functionality of the site.
function Nav() {
    const navigate = useRouter();
    // 'useState' hooks are used to manage the component's internal state.
    const [search, setSearch] = useState(""); // Holds the current text in the search bar.
    const [hamburgerOpen, setHamburgerOpen] = useState(false); // Tracks if the mobile navigation menu is open.
    const [settingsOpen, setSettingsOpen] = useState(false); // Tracks if the settings menu is open.
    
    // We pull all the settings and their setter functions from our global 'useSettings' context.
    const { theme, setTheme, font, setFont, size, setSize, readAloud, setReadAloud, voicesAvailable } = useSettings();
    
    // These states control the open/closed status of our custom dropdown menus in the settings panel.
    const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
    const themeOptions = themes.map(t => t.title); // We create an array of just the theme titles for the dropdown.
    const [fontDropdownOpen, setFontDropdownOpen] = useState(false);
    const fontOptions = fonts.map(f => f.title);
    const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
    const sizeOptions = sizes.map(s => s.title);

    // These states will hold the colors for the search bar's SVG icon, which change with the theme.
    const [svgColorDormant, setSvgColorDormant] = useState('');
    const [svgColorActive, setSvgColorActive] = useState('');
    // This 'useEffect' hook runs whenever the theme changes. Its job is to read the current theme's colors
    // from the CSS variables defined on the root element and store them in our state.
    useEffect(() => {
        // 'getComputedStyle' allows us to read the final, rendered CSS properties of an element.
        const colorDormant = getComputedStyle(document.documentElement).getPropertyValue('--site-theme-element-color-dormant').trim();
        const colorActive = getComputedStyle(document.documentElement).getPropertyValue('--site-theme-text-color').trim();
        setSvgColorDormant(colorDormant);
        setSvgColorActive(colorActive);
    }, [theme]); // This hook depends on the 'theme' object.

    // This state tracks whether the search input is currently focused (being typed in).
    const [isFocused, setIsFocused] = useState(false);

    // This function handles the search form submission.
    const handleSearch = (e) => {
        e.preventDefault(); // Prevents the default form submission (which would reload the page).
        if (search.trim()) { // We only search if the input isn't empty.
            // We programmatically navigate to the search results page with the query.
            navigate.push(`/search?q=${encodeURIComponent(search.trim())}`);
            setSearch(""); // Clear the search bar after searching.
        }
    }

    // These functions handle the selection from our custom dropdown menus.
    function handleThemeSelect(option) {
        setTheme(formatTheme(option)); // We format the selected option and update the global theme.
        setThemeDropdownOpen(false); // Close the dropdown.
    }
    function handleFontSelect(option) {
        setFont(formatFont(option));
        setFontDropdownOpen(false);
    }
    function handleSizeSelect(option) {
        setSize(formatSize(option));
        setSizeDropdownOpen(false);
    }

    // These helper functions take a string (e.g., "Light") from the dropdown and find the
    // corresponding full JSON object from our imported settings files.
    function formatTheme(value) {
        return themes.find(t => t.title === value) || themes.find(t => t.id === 1);
    }
    function formatFont(value) {
        return fonts.find(f => f.title === value) || fonts.find(f => f.id === 1); 
    }
    function formatSize(value) {
        return sizes.find(s => s.title === value) || sizes.find(s => s.id === 1); 
    } 

    // This hook ensures that if the user navigates to a new page, any open menus are closed.
    useEffect(() => {
        setHamburgerOpen(false);
        setSettingsOpen(false);
    }, [navigate]); // It runs whenever the 'navigate' object changes (which happens on route change).

    // This function toggles the 'readAloud' setting.
    function toggleReadAloud() {
        setReadAloud(prev => !prev);
    }

    // This function manages the logic for opening and closing the hamburger and settings menus.
    // It ensures that one menu closes before the other one opens, creating a smooth animation.
    function menuAction(menu) {
        if (menu === "hamburger") {
            if (settingsOpen) { // If the settings menu is currently open...
                setSettingsOpen(false); // ...close it first...
                setTimeout(() => { // ...then, after a short delay (to allow for the CSS transition)...
                    setHamburgerOpen(true); // ...open the hamburger menu.
                }, 350);
            } else {
                setHamburgerOpen(!hamburgerOpen); // Otherwise, just toggle the hamburger menu.
            }
        }
        if (menu === "settings") {
            if (hamburgerOpen) { // If the hamburger menu is currently open...
                setHamburgerOpen(false); // ...close it first...
                setTimeout(() => { // ...then, after a delay...
                    setSettingsOpen(true); // ...open the settings menu.
                }, 350);
            } else {
                setSettingsOpen(!settingsOpen); // Otherwise, just toggle the settings menu.
            }
        }
    }

    // This function is a clever usability fix. When the menus are closed, their elements still exist
    // in the DOM and could potentially block clicks on elements underneath them.
    // This function toggles the 'pointer-events' CSS property to 'none' when a menu is closed,
    // making it completely "click-through-able".
    const hideContent = useCallback(() => {
        const settingsTag = document.getElementById("ul-settings");
        const hamburgerTag = document.getElementById("ul-nav-list-mobile");
        settingsTag.style.pointerEvents = settingsOpen ? 'auto' : 'none';
        hamburgerTag.style.pointerEvents = hamburgerOpen ? 'auto' : 'none';
    }, [hamburgerOpen, settingsOpen]); // 'useCallback' memoizes this function so it isn't recreated on every render.

    // This 'useEffect' hook calls 'hideContent' whenever the menu open/closed states change.
    useEffect(() => {
        hideContent();
    }, [hamburgerOpen, settingsOpen, hideContent]);

    // The main JSX for the component. It's split into a desktop nav, a mobile nav, and the settings panel content.
    return(
        <div id="div-nav-container">
            {/* =================================== */}
            {/* ====== DESKTOP NAVIGATION ========= */}
            {/* =================================== */}
            <nav id="nav-nav">
                <div id="nav-list-desktop">
                    <div id="div-nav-list">
                        <ul id="ul-nav-list">
                            <NavItem name="Home" href="/"/>
                            <NavItem name="Writings" href="articles"/>
                            <NavItem name="Authors" href="authors"/>
                            <NavItem name="Donate" href="https://buymeacoffee.com/lukegosnell"/>
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
                                // The search icon is an SVG embedded directly in the CSS 'backgroundImage'.
                                // Its 'fill' color is dynamically set based on whether the input is focused,
                                // using the colors we retrieved from the CSS variables.
                                style = {{
                                    "backgroundImage":`url("data:image/svg+xml,%3Csvg%20fill='${isFocused ? svgColorActive : svgColorDormant}'%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3E%3Cpath%20d='M15.5%2014h-.79l-.28-.27A6.471%206.471%200%200016%209.5%206.5%206.5%200%20109.5%2016c1.61%200%203.09-.59%204.23-1.57l.27.28v.79l5%204.99a1%201%200%20001.41-1.41l-4.99-5zm-6%200C8.01%2014%206%2011.99%206%209.5S8.01%205%2010.5%205%2015%207.01%2015%209.5%2012.99%2014%2010.5%2014z'%3E%3C/path%3E%3C/svg%3E")`
                                }}
                            />
                        </form>
                        {/* The settings gear button. */}
                        <div id="div-settings">
                            <button id="btn-settings" onClick={() => menuAction("settings")}>
                                <span id="span-gear" className={settingsOpen ? "open" : "close"}></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            {/* =================================== */}
            {/* ====== MOBILE NAVIGATION ========== */}
            {/* =================================== */}
            <nav id="nav-nav-mobile">
                <div id="nav-list-mobile">
                    <div id="div-mobile-hamburger-search">
                        {/* The hamburger menu button. Its visual state (lines forming an 'X') is controlled by the 'open' class. */}
                        <button id="btn-hamburger" onClick={() => menuAction("hamburger")}>
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
                        {/* The settings gear button for mobile. */}
                        <div id="div-settings-mobile">
                            <button id="btn-settings-mobile" onClick={() => menuAction("settings")}>
                                <span id="span-gear-mobile" className={settingsOpen && !hamburgerOpen ? "open" : "close"}></span>
                            </button>
                        </div>
                    </div>
                    {/* This is the actual content of the mobile dropdown menu. Its visibility is controlled by the 'open' class. */}
                    <ul id="ul-nav-list-mobile" className={hamburgerOpen && !settingsOpen ? "open" : "close"}>
                        <div className="settings-stitch"></div>
                        <div id="div-ul-nav-list-mobile-items">
                            <NavItem name="Home" href="/"/>
                            <NavItem name="Writings" href="articles"/>
                            <NavItem name="Authors" href="authors"/>
                            <NavItem name="Donate" href="https://buymeacoffee.com/lukegosnell"/>
                        </div>
                    </ul>
                </div>
            </nav>
            {/* =================================== */}
            {/* ====== SETTINGS PANEL CONTENT ===== */}
            {/* =================================== */}
            <div id="div-settings-content">
                {/* This is the content of the settings panel. Its visibility is also controlled by the 'open' class. */}
                <ul id="ul-settings" className={settingsOpen && !hamburgerOpen ? "open" : "close"}>
                    <div className="settings-stitch"></div>
                    <div id="div-switch-items">

                        {/* ======================================== */}
                        {/* ====== CUSTOM DROPDOWN EXAMPLE: THEME ==== */}
                        {/* ======================================== */}
                        {/* This is one of the three custom-built dropdown menus. The others for Font and Size follow the exact same pattern. */}
                        <div className="switch-item">
                            <div className="switch-item-text">Theme</div>
                            <div className="switch-item-selection">
                                <div 
                                    className={`custom-dropdown${themeDropdownOpen ? " open" : ""}`}
                                    tabIndex={0} // Makes the div focusable.
                                    onBlur={() => setThemeDropdownOpen(false)} // When the user clicks away, the dropdown closes.
                                >
                                    {/* This is the part of the dropdown that is always visible. */}
                                    <div
                                        className="custom-dropdown-selected"
                                        onClick={() => setThemeDropdownOpen(open => !open)} // Toggles the dropdown open/closed.
                                        style={{ // The dropdown arrow is an SVG embedded in the background image.
                                            backgroundImage: `url("data:image/svg+xml;utf8,<svg fill='${svgColorDormant}' height='12' viewBox='0 0 24 24' width='12' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>")`
                                        }}
                                    >
                                        <span className="span-custom-dropdown-selected">{theme.title}</span>
                                    </div>
                                    {/* This div contains the options that appear when the dropdown is opened. */}
                                    <div className="custom-dropdown-options">
                                        {themeDropdownOpen && // The options are only rendered in the DOM when the dropdown is open.
                                            themeOptions
                                                .filter(option => option !== theme.title) // We show every option *except* the one that's already selected.
                                                .map((option, index) => (
                                                    <div
                                                        key={option}
                                                        className={index === 0 ? "custom-dropdown-option first-option" : "custom-dropdown-option"}
                                                        onClick={() => handleThemeSelect(option)} // Sets the theme when an option is clicked.
                                                    >
                                                        {option}
                                                    </div>
                                                ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* The dropdowns for Text Size and Font follow the same pattern as the Theme dropdown above. */}
                        <div className="switch-item">
                            <div className="switch-item-text">Text Size</div>
                            <div className="switch-item-selection">
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
                        {/* This is the toggle switch for the 'Read Aloud' (text-to-speech) feature. */}
                        {/* It is only rendered if the browser has speech synthesis voices available. */}
                        {voicesAvailable && (
                            <div className="switch-item">
                                <div className="switch-item-text">Audio</div>
                                <div className="switch-item-selection">
                                    <div className="div-switch">
                                        {/* This is a standard checkbox input, but it's styled to look like a toggle switch using CSS. */}
                                        <label className="switch">
                                            <input id="switch-input" type="checkbox" onChange={toggleReadAloud} checked={readAloud}/>
                                            <span className="slider">
                                                <span className="slider-knob"></span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </ul>
            </div>
        </div>
    );
}

// We export the Nav component so it can be used in the main site layout.
export default Nav;