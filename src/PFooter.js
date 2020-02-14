import React, {useContext}from 'react'
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  Translate,
  ImportContactsTwoTone,
  SignalWifi3BarTwoTone,
  ThumbUpTwoTone,
  PersonAddTwoTone,
  ListAltTwoTone
} from "@material-ui/icons";
import { ThemeContext } from "./modules/ThemeContext";
import { Store } from "./modules/Store";

const useStyle = makeStyles({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  icon: {
    fontSize: "100px"
  }
});

const PFooterContainer = ({presenter}) => {
    const classes = useStyle();
    const elevation = classes.elevation;
    const theme = useContext(ThemeContext);
    const { dispatchWpParams, dispatchAppState } = useContext(Store);

    const changeParams = (type) => {
        dispatchWpParams({ type: type });
    }
    const openModal = modalName =>
      dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const props = {
        classes,
      theme,
      changeParams,
      openModal
    };

    return presenter(props)
}
const PFooterPresenter = ({ classes, theme, changeParams, openModal }) => {
         return (
           <Paper elevation={theme.elevation} className={classes.root}>
             <Grid container justify="center">
               <Grid item>
                 <Translate
                   onClick={ () => changeParams("LANG")}
                   color="primary"
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <ImportContactsTwoTone
                   onClick={ () => openModal("magazines")}
                   fontSize="large"
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <SignalWifi3BarTwoTone
                   onClick={ () => openModal("wifi")}
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <ThumbUpTwoTone
                   onClick={ () => openModal("review")}
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <ListAltTwoTone
                   onClick={ () => openModal("menus")}
                   style={theme.icon}
                 />
               </Grid>
               <Grid item>
                 <a href="https://karte.smart-recept.jp/staff/login/">
                   <PersonAddTwoTone style={theme.icon} />
                 </a>
               </Grid>
             </Grid>
           </Paper>
         );
       };
export const PFooter = () => (
  <PFooterContainer
    presenter={props => <PFooterPresenter {...props} />}
  />
);