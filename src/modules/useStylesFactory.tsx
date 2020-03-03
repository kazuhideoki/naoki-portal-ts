import React from "react";
import { ThemeContext } from "./ThemeContext";
import { makeStyles } from "@material-ui/core";

export function useStylesFactory(styles: any) {
    const useStyles = makeStyles(styles)
    const themes = React.useContext(ThemeContext);
    const classes = useStyles(themes);
    return classes
}