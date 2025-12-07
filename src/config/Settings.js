"use client";

import { createContext, useContext, useEffect, useState } from "react";
import themes from './themes.json';
import fonts from './fonts.json';
import sizes from './sizes.json';

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    const [theme, setTheme] = useState(themes.find(t => t.id === 1));
    const [font, setFont] = useState(fonts.find(f => f.id === 1));
    const [size, setSize] = useState(sizes.find(s => s.id === 1));
    const [readAloud, setReadAloud] = useState(false);
    const [voices, setVoices] = useState([]);
    const [voicesAvailable, setVoicesAvailable] = useState(false);

    useEffect(() => {
        const synth = window.speechSynthesis;
        const loadVoices = () => {
            const availableVoices = synth.getVoices();
            if (availableVoices.length > 0) {
                const filteredVoices = availableVoices.filter(voice => voice.lang.includes('en'));
                setVoices(filteredVoices);
                setVoicesAvailable(true);
            }
        };
        loadVoices();
        synth.onvoiceschanged = loadVoices;
        return () => {
            synth.onvoiceschanged = null;
        };
    }, []);

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        const storedFont = localStorage.getItem("font");
        const storedSize = localStorage.getItem("size");
        const storedReadAloud = localStorage.getItem('readAloud');

        // For testing, nuke localStorage
        // localStorage.clear();

        // Return stored JSON if it exists, otherwise return themes object with an id of 1
        const initialTheme = storedTheme ? JSON.parse(storedTheme) : themes.find(t => t.id === 1);
        const initialFont = storedFont ? JSON.parse(storedFont) : fonts.find(f => f.id === 1);
        const initialSize = storedSize ? JSON.parse(storedSize) : sizes.find(s => s.id === 1);
        // Get readAloud from localStorage, otherwise set to false by default
        const initialReadAloud = storedReadAloud !== null ? JSON.parse(storedReadAloud) : false;
        setTheme(initialTheme);
        setFont(initialFont);
        setSize(initialSize);
        setReadAloud(initialReadAloud);
    }, []);

    // Persist config changes
    useEffect(() => {
        if (theme) {
            localStorage.setItem('theme', JSON.stringify(theme));
        }
        if (font) {
            localStorage.setItem('font', JSON.stringify(font));
        }
        if (size) {
            localStorage.setItem('size', JSON.stringify(size));
        }
        if (readAloud !== null) {
            localStorage.setItem('readAloud', JSON.stringify(readAloud));
        }

         // Set CSS custom properties: Theme
        if (theme) {
            document.documentElement.style.setProperty('--site-theme', theme.title);
            document.documentElement.style.setProperty('--site-theme-background-image', theme.backgroundImage);
            document.documentElement.style.setProperty('--site-theme-background-image-gradient', theme.backgroundImageGradient);
            document.documentElement.style.setProperty('--site-theme-background-image-banner', theme.backgroundImageBanner);
            document.documentElement.style.setProperty('--site-theme-background-color-input', theme.backgroundColorInput);
            document.documentElement.style.setProperty('--site-theme-background-color-input-alt', theme.backgroundColorInputAlt);
            document.documentElement.style.setProperty('--site-theme-background-color-switch-item', theme.backgroundColorSwitchItem);
            document.documentElement.style.setProperty('--site-theme-background-color-switch-item-toggle', theme.backgroundColorSwitchItemToggle);
            document.documentElement.style.setProperty('--site-theme-background-color-switch-item-toggle-alt', theme.backgroundColorSwitchItemToggleAlt);
            document.documentElement.style.setProperty('--site-theme-hover-color', theme.hoverColor);
            document.documentElement.style.setProperty('--site-theme-box-shadow', theme.boxShadow);
            document.documentElement.style.setProperty('--site-theme-box-shadow-top', theme.boxShadowTop);
            document.documentElement.style.setProperty('--site-theme-text-color', theme.textColor);
            document.documentElement.style.setProperty('--site-theme-text-color-alt', theme.textColorAlt);
            document.documentElement.style.setProperty('--site-theme-text-color-title-gradient', theme.textColorTitleGradient);
            document.documentElement.style.setProperty('--site-theme-text-shadow', theme.textShadow);
            document.documentElement.style.setProperty('--site-theme-element-color-dormant', theme.elementColorDormant);
        }
        
        // Set CSS custom properties: Font
        document.documentElement.style.setProperty('--site-font', font.value);
        document.documentElement.style.setProperty('--site-letter-spacing', font.letterSpacing);
        document.documentElement.style.setProperty('--site-font-size-adjust', font.fontSizeAdjust);

        // Set CSS custom properties: Size
        document.documentElement.style.setProperty('--site-size', size.title);
        document.documentElement.style.setProperty('--site-size-header-full', size.headerFull);
        document.documentElement.style.setProperty('--site-size-header-1400', size.header1400);
        document.documentElement.style.setProperty('--site-size-header-800', size.header800);
        document.documentElement.style.setProperty('--site-size-footer-full', size.footerFull);
        document.documentElement.style.setProperty('--site-size-footer-1400', size.footer1400);
        document.documentElement.style.setProperty('--site-size-footer-800', size.footer800);
        document.documentElement.style.setProperty('--site-size-nav-full', size.navFull);
        document.documentElement.style.setProperty('--site-size-nav-1400', size.nav1400);
        document.documentElement.style.setProperty('--site-size-nav-800', size.nav800);
        document.documentElement.style.setProperty('--site-size-nav-400', size.nav400);
        document.documentElement.style.setProperty('--site-size-dropdown-full', size.dropdownFull);
        document.documentElement.style.setProperty('--site-size-dropdown-1400', size.dropdown1400);
        document.documentElement.style.setProperty('--site-size-dropdown-800', size.dropdown800);
        document.documentElement.style.setProperty('--site-size-dropdown-400', size.dropdown400);
        document.documentElement.style.setProperty('--site-size-ddWidth-full', size.ddWidthFull);
        document.documentElement.style.setProperty('--site-size-ddWidth-1400', size.ddWidth1400);
        document.documentElement.style.setProperty('--site-size-ddWidth-800', size.ddWidth800);
        document.documentElement.style.setProperty('--site-size-ddWidth-400', size.ddWidth400);
        document.documentElement.style.setProperty('--site-size-ddHeight-full', size.ddHeightFull);
        document.documentElement.style.setProperty('--site-size-ddHeight-1400', size.ddHeight1400);
        document.documentElement.style.setProperty('--site-size-ddHeight-800', size.ddHeight800);
        document.documentElement.style.setProperty('--site-size-ddHeight-400', size.ddHeight400);
        document.documentElement.style.setProperty('--site-size-sliderX-full', size.sliderXFull);
        document.documentElement.style.setProperty('--site-size-sliderX-800', size.sliderX800);
        document.documentElement.style.setProperty('--site-size-sliderX-400', size.sliderX400);
        document.documentElement.style.setProperty('--site-size-search-desktop', size.searchDesktop);
        document.documentElement.style.setProperty('--site-size-search-mobile', size.searchMobile);
        document.documentElement.style.setProperty('--site-size-hccTitle-full', size.hccTitleFull);
        document.documentElement.style.setProperty('--site-size-hccTitle-1400', size.hccTitle1400);
        document.documentElement.style.setProperty('--site-size-hccTitle-800', size.hccTitle800);
        document.documentElement.style.setProperty('--site-size-hccDate-full', size.hccDateFull);
        document.documentElement.style.setProperty('--site-size-hccDate-1400', size.hccDate1400);
        document.documentElement.style.setProperty('--site-size-hccDate-800', size.hccDate800);
        document.documentElement.style.setProperty('--site-size-hccTags-full', size.hccTagsFull);
        document.documentElement.style.setProperty('--site-size-hccTags-1400', size.hccTags1400);
        document.documentElement.style.setProperty('--site-size-hccTags-800', size.hccTags800);
        document.documentElement.style.setProperty('--site-size-hscContent-full', size.hscContentFull);
        document.documentElement.style.setProperty('--site-size-hscContent-1400', size.hscContent1400);
        document.documentElement.style.setProperty('--site-size-hscContent-800', size.hscContent800);
        document.documentElement.style.setProperty('--site-size-acName-full', size.acNameFull);
        document.documentElement.style.setProperty('--site-size-acName-1400', size.acName1400);
        document.documentElement.style.setProperty('--site-size-acName-800', size.acName800);
        document.documentElement.style.setProperty('--site-size-acDesc-full', size.acDescFull);
        document.documentElement.style.setProperty('--site-size-acDesc-1400', size.acDesc1400);
        document.documentElement.style.setProperty('--site-size-acDesc-800', size.acDesc800);
        document.documentElement.style.setProperty('--site-size-artTitle-full', size.artTitleFull);
        document.documentElement.style.setProperty('--site-size-artTitle-1400', size.artTitle1400);
        document.documentElement.style.setProperty('--site-size-artTitle-800', size.artTitle800);
        document.documentElement.style.setProperty('--site-size-artAuthDate-full', size.artAuthDateFull);
        document.documentElement.style.setProperty('--site-size-artAuthDate-1400', size.artAuthDate1400);
        document.documentElement.style.setProperty('--site-size-artAuthDate-800', size.artAuthDate800);
        document.documentElement.style.setProperty('--site-size-artTags-full', size.artTagsFull);
        document.documentElement.style.setProperty('--site-size-artTags-1400', size.artTags1400);
        document.documentElement.style.setProperty('--site-size-artTags-800', size.artTags800);
        document.documentElement.style.setProperty('--site-size-artContent-full', size.artContentFull);
        document.documentElement.style.setProperty('--site-size-artContent-1400', size.artContent1400);
        document.documentElement.style.setProperty('--site-size-artContent-800', size.artContent800);
        document.documentElement.style.setProperty('--site-size-ascTitle-full', size.ascTitleFull);
        document.documentElement.style.setProperty('--site-size-ascTitle-1400', size.ascTitle1400);
        document.documentElement.style.setProperty('--site-size-ascTitle-800', size.ascTitle800);
        document.documentElement.style.setProperty('--site-size-ascAuth-full', size.ascAuthFull);
        document.documentElement.style.setProperty('--site-size-ascAuth-1400', size.ascAuth1400);
        document.documentElement.style.setProperty('--site-size-ascAuth-800', size.ascAuth800);
    }, [theme, font, size, readAloud]);

    return (
        <SettingsContext.Provider value= {{ font, setFont, readAloud, setReadAloud, voices, voicesAvailable, setVoicesAvailable, theme, setTheme, size, setSize }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);