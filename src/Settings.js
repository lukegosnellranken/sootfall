import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    // Get font from localStorage, otherwise set to SootType by default
    const [font, setFont] = useState(() => {
        const stored = localStorage.getItem('font');
        return stored ? JSON.parse(stored) :
         {
            "title": "SootType",
            "value": "Bilbo, sans-serif"
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
    return (
        <SettingsContext.Provider value= {{ font, setFont, readAloud, setReadAloud }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);