import React from "react";

const themes = {
  icon: { 
    fontSize: 100
  },
  // Paperのかげの程度を設定
  elevation: 3
};

export type ThemeContextProps = {
    icon: {
        fontSize: number
    },
    // Paperのかげの程度を設定
    elevation: number
};

export const ThemeContext = React.createContext({} as ThemeContextProps);

export const ThemeProvider = ({ children }: any) => (
    <ThemeContext.Provider value={themes}>
        {children}
    </ThemeContext.Provider>
);

