import React from "react";

const screenWidth = 100
const screenHeight = 100

const portalPadding = 0
const portalWidth = screenWidth - portalPadding * 2
const portalHeight = screenHeight - portalPadding * 2

const pHeaderMarginBottom = 1
const pHeaderWidth = screenWidth - portalPadding * 2
const pHeaderHeight = 7

const pFooterMarginTop = 1
const pFooterWidth = screenWidth - portalPadding * 2
const pFooterHeight = 23

const pMainMargin = 1
const pMainWidth = screenWidth - pMainMargin * 2
const pMainHeight = screenHeight - pHeaderHeight - pHeaderMarginBottom - pFooterHeight - pFooterMarginTop - portalPadding * 2


// ThemeContext.Providerを通して渡される値
const themes = {
    app: {
        padding: portalPadding,
        width: portalWidth,
        height: portalHeight,
    },
    pHeader: {
        marginBottom: pHeaderMarginBottom,
        width: pHeaderWidth,
        height: pHeaderHeight,
    },
    pMain: {
        width: pMainWidth,
        height: pMainHeight,
    },
    pFooter: {
        marginTop: pFooterMarginTop,
        width: pFooterWidth,
        height: pFooterHeight,
    },
   

    // fontSize
    icon: 85,
    iconSmall : 38,
};

export type ThemeType = typeof themes;

export const ThemeContext = React.createContext({} as ThemeType);

export const ThemeProvider = ({ children }: any) => {

    return (
        <ThemeContext.Provider value={themes}>
        {children}
        </ThemeContext.Provider>
    )
};

