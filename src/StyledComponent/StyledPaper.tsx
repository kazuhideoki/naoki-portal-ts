import React from "react";
import { Paper } from "@material-ui/core";

export const StyledPaper = (props: any) => {
  // const themes = React.useContext(ThemeContext);
  return (
    // <Paper elevation={themes.elevation} {...props}/>
    <Paper variant="outlined" {...props} />
  );
};
