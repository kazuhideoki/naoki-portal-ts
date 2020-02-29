import React, {useContext}from 'react'
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
    Translate,
    ImportContactsTwoTone,
    SignalWifi3BarTwoTone,
    ThumbUpTwoTone,
    PersonAddTwoTone,
    ListAltTwoTone,
    SettingsApplicationsTwoTone,
} from "@material-ui/icons";
import { ThemeContext } from "./modules/ThemeContext";
import { Store } from "./modules/Store";
import { ThemeContextProps } from "./modules/ThemeContext";
import { pfooter } from './modules/words'



type Props = {
    w: any
    classes: any,
    theme: ThemeContextProps,
    changeLang: () => void,
    openModal: (modalName: string) => void
};

const PFooterContainer = ({presenter}: any) => {
    const classes = useStyle();
    const theme = useContext(ThemeContext);
    const { wpParams, dispatchWpParams, dispatchAppState } = useContext(Store);

    const changeLang = () => {
        dispatchAppState({ type: "START_LOADING" })
        dispatchWpParams({ type: "LANG" });
    }
    const openModal = (modalName: string) =>
      dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    let w
    if (wpParams.isJa) {
         w = pfooter.ja
    }else{
         w = pfooter.en
    }

    const props = {
        w,
        classes,
        theme,
        changeLang,
        openModal,
    };

    return presenter(props)
}

const useStyle = makeStyles({
    root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    iconText: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
    },
    icon: {
        fontSize: "100px"
    }
});

const PFooterPresenter = ({ w, classes, theme, changeLang, openModal }: Props) => {
   
    return (
        <Paper elevation={theme.elevation} className={classes.root}>
            <Grid container justify="center">
                <Grid item className={classes.iconText}>
                    <Translate
                    onClick={() => changeLang()}
                    color="primary"
                    style={theme.icon}
                    />
                    {w.lang}
                </Grid>
                <Grid item className={classes.iconText}>
                    <ImportContactsTwoTone
                    onClick={ () => openModal("magazines")}
                    fontSize="large"
                    style={theme.icon}
                    />
                    {w.magazines}
                </Grid>
                <Grid item className={classes.iconText}>
                    <SignalWifi3BarTwoTone
                    onClick={ () => openModal("wifi")}
                    style={theme.icon}
                    />
                    Wifi
                </Grid>
                <Grid item className={classes.iconText}>
                    <ThumbUpTwoTone
                    onClick={ () => openModal("review")}
                    style={theme.icon}
                    />
                </Grid>
                <Grid item className={classes.iconText}>
                    <ListAltTwoTone
                    onClick={ () => openModal("menus")}
                    style={theme.icon}
                    />
                </Grid>
                <Grid item className={classes.iconText}>
                    <a href="https://karte.smart-recept.jp/staff/login/">
                    <PersonAddTwoTone style={theme.icon} />
                    </a>
                </Grid>
                {/* 設定が必要になったら追加する */}
                {/* <Grid item className={classes.iconText}>
                    <SettingsApplicationsTwoTone
                        onClick={() => openModal("setting")}
                        style={theme.icon}
                    />
                </Grid> */}
            </Grid>
        </Paper>
    );
};
export const PFooter = () => (
  <PFooterContainer
        presenter={(props: Props) => <PFooterPresenter {...props} />}
  />
);