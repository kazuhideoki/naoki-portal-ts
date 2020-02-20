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
import { ThemeContextProps } from "./modules/ThemeContext";

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

type Props = {
    classes: Record<"root" | "icon", string>,
    theme: ThemeContextProps,
    changeLang: () => void,
    openModal: (modalName: string) => void
};

const PFooterContainer = ({presenter}: any) => {
    const classes = useStyle();
    const theme = useContext(ThemeContext);
    const { dispatchWpParams, dispatchAppState } = useContext(Store);

    const changeLang = () => {
        dispatchWpParams({ type: "LANG" });
    }
    const openModal = (modalName: string) =>
      dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    const props = {
        classes,
        theme,
        changeLang,
        openModal
    };

    return presenter(props)
}
const PFooterPresenter = ({ classes, theme, changeLang, openModal }: Props) => {
         return (
           <Paper elevation={theme.elevation} className={classes.root}>
             <Grid container justify="center">
               <Grid item>
                 <Translate
                    onClick={() => changeLang()}
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
        presenter={(props: Props) => <PFooterPresenter {...props} />}
  />
);