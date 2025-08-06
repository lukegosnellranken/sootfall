import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    // Get font from localStorage, otherwise set to SootType by default
    const [font, setFont] = useState(() => {
        const stored = localStorage.getItem('font');
        return stored ? JSON.parse(stored) :
         {
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

    document.documentElement.style.setProperty('--site-font', font.value);
    document.documentElement.style.setProperty('--site-letter-spacing', font.letterSpacing);
    document.documentElement.style.setProperty('--site-font-size-adjust', font.fontSizeAdjust);
    return (
        <SettingsContext.Provider value= {{ font, setFont, readAloud, setReadAloud }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);