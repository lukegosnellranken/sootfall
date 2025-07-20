import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    // Set font to Sootype by default
    const [font, setFont] = useState("Bilbo");
    // Set readAloud to false by default
    const [readAloud, setReadAloud] = useState(false);
    document.documentElement.style.setProperty('--site-font', font);
    return (
        <SettingsContext.Provider value= {{ font, setFont, readAloud, setReadAloud }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);