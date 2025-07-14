import { createContext, useContext, useState } from "react";

const SettingsContext = createContext();

export const Settings = ({ children }) => {
    // Set readAloud to false by default
    const [readAloud, setReadAloud] = useState(false);
    return (
        <SettingsContext.Provider value= {{ readAloud, setReadAloud }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);