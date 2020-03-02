import React from "react";

const screenWidth = window.parent.screen.width
const screenHeight = window.parent.screen.height

const portalPadding = 10
const portalWidth = screenWidth - portalPadding * 2
const portalHeight = screenHeight - portalPadding * 2

const pHeaderMarginBottom = 5
const pHeaderWidth = screenWidth - portalPadding * 2
const pHeaderHeight = 80

const pFooterMarginTop = 5
const pFooterWidth = screenWidth - portalPadding * 2
const pFooterHeight = 170

const pMainMargin = 5
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
    icon: "100px",
    // Paperのかげの程度を設定
    elevation: 9,
};

export type ThemeType = typeof themes;

export const ThemeContext = React.createContext({} as ThemeType);

export const ThemeProvider = ({ children }: any) => {

    window.addEventListener("orientationchange", function () {
        /* 向き切り替え時の処理 */
    });

    React.useEffect(() => {

    })

    return (
        <ThemeContext.Provider value={themes}>
        {children}
        </ThemeContext.Provider>
    )
};

