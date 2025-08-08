import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    // localStorage.clear();
    // Get theme from localStorage, otherwise set to Dark by default
    const [theme, setTheme] = useState(() => {
        const stored = localStorage.getItem('theme');
        return stored ? JSON.parse(stored) : {
            "title": "Dark",
            "backgroundImage": "linear-gradient(to bottom, rgba(10, 10, 10, 0.95), rgba(0, 0, 0, 0.95))",
            "backgroundImageGradient": "linear-gradient(to bottom, rgba(5, 5, 5, .7), rgba(0, 0, 0, .7)",
            "backgroundImageBanner": "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))",
            "backgroundColorInput": "rgba(10, 10, 10, 0.95)",
            "backgroundColorInputAlt": "rgba(50, 50, 50, 0.95)",
            "backgroundColorSwitchItem": "#818181",
            "boxShadow": "0em 0em .8em .15em rgba(255, 255, 255, 0.199)",
            "textColor": "#818181"
        };
    });

    useEffect(() => {
        localStorage.setItem('theme', JSON.stringify(theme));
    }, [theme]);

    // Get font from localStorage, otherwise set to SootType by default
    const [font, setFont] = useState(() => {
        const stored = localStorage.getItem('font');
        return stored ? JSON.parse(stored) : {
            "title": "SootType",
            "value": "Bilbo, sans-serif",
            "letterSpacing": "0.03em",
            "fontSizeAdjust": "cap-height 1"
        };
    });

    useEffect(() => {
        localStorage.setItem('font', JSON.stringify(font));
    }, [font]);

    // Get readAloud from localStorage, otherwise set to false by default
    const [readAloud, setReadAloud] = useState(() => {
        const stored = localStorage.getItem('readAloud');
        return stored ? JSON.parse(stored) : false;
    });

    useEffect(() => {
        localStorage.setItem('readAloud', JSON.stringify(readAloud));
    }, [readAloud]);

    // Set CSS custom properties
    document.documentElement.style.setProperty('--site-theme', theme.title);
    document.documentElement.style.setProperty('--site-theme-background-image', theme.backgroundImage);
    document.documentElement.style.setProperty('--site-theme-background-image-gradient', theme.backgroundImageGradient);
    document.documentElement.style.setProperty('--site-theme-background-image-banner', theme.backgroundImageBanner);
    document.documentElement.style.setProperty('--site-theme-background-color-input', theme.backgroundColorInput);
    document.documentElement.style.setProperty('--site-theme-background-color-input-alt', theme.backgroundColorInputAlt);
    document.documentElement.style.setProperty('--site-theme-background-color-switch-item', theme.backgroundColorSwitchItem);
    document.documentElement.style.setProperty('--site-theme-box-shadow', theme.boxShadow);
    document.documentElement.style.setProperty('--site-theme-box-shadow-top', theme.boxShadowTop);
    document.documentElement.style.setProperty('--site-theme-text-color', theme.textColor);
    document.documentElement.style.setProperty('--site-font', font.value);
    document.documentElement.style.setProperty('--site-letter-spacing', font.letterSpacing);
    document.documentElement.style.setProperty('--site-font-size-adjust', font.fontSizeAdjust);

    return (
        <SettingsContext.Provider value= {{ font, setFont, readAloud, setReadAloud, theme, setTheme }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);