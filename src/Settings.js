import { createContext, useContext, useEffect, useState } from "react";
import themes from './config/themes.json';
import fonts from './config/fonts.json';
import sizes from './config/sizes.json';

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    // localStorage.clear();
    // Get theme from localStorage, otherwise set to Dark by default
    const [theme, setTheme] = useState(() => {
        // For testing, nuke localStorage
        // localStorage.clear();
        const stored = localStorage.getItem('theme');
        // Return stored JSON if it exists, otherwise return themes object with an id of 1
        return stored ? JSON.parse(stored) : themes.find(t => t.id === 1);
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    // Get font from localStorage, otherwise set to SootType by default
    const [font, setFont] = useState(() => {
        // For testing, nuke localStorage
        // localStorage.clear();
        const stored = localStorage.getItem('font');
        // Return stored JSON if it exists, otherwise return fonts object with an id of 1
        return stored ? JSON.parse(stored) : fonts.find(f => f.id === 1);
    });

    useEffect(() => {
        localStorage.setItem('font', JSON.stringify(font));
    }, [font]);

    // Get size from localStorage, otherwise set to Medium by default
    const [size, setSize] = useState(() => {
        // For testing, nuke localStorage
        // localStorage.clear();
        const stored = localStorage.getItem('size');
        // Return stored JSON if it exists, otherwise return sizes object with an id of 1
        return stored ? JSON.parse(stored) : sizes.find(s => s.id === 1);
    });

    useEffect(() => {
        localStorage.setItem('size', JSON.stringify(size));
    }, [size]);

    // Get readAloud from localStorage, otherwise set to false by default
    const [readAloud, setReadAloud] = useState(() => {
        const stored = localStorage.getItem('readAloud');
        return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
        localStorage.setItem('readAloud', JSON.stringify(readAloud));
    }, [readAloud]);

    // Set CSS custom properties: Theme
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
    
    // Set CSS custom properties: Font
    document.documentElement.style.setProperty('--site-font', font.value);
    document.documentElement.style.setProperty('--site-letter-spacing', font.letterSpacing);
    document.documentElement.style.setProperty('--site-font-size-adjust', font.fontSizeAdjust);

    return (
        <SettingsContext.Provider value= {{ font, setFont, readAloud, setReadAloud, theme, setTheme, size, setSize }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);