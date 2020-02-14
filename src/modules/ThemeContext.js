import React from "react";

const themes = {
  icon: { 
    fontSize: 100
  },
  // Paperのかげの程度を設定
  elevation: 3
};

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => (
    <ThemeContext.Provider value={themes}>
        {children}
    </ThemeContext.Provider>
);

