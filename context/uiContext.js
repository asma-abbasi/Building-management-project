import { createContext, useContext, useState } from "react";
import React from "react";

export const UIContext = createContext({});
export const useUIContext = () => useContext(UIContext);

export const UIProvider = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [showSearchBox, setShowSearchBox] = useState(false);
    const [isManager, setIsManager] = useState(false);


    const value = {
        drawerOpen,
        setDrawerOpen,
        showSearchBox,
        setShowSearchBox,
        isManager,
        setIsManager
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
