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
import { ThemeType } from "./modules/ThemeContext";
import { pfooter } from './modules/words'
import { PPagination } from './PPagination';
import { StyledPaper } from './StyledComponent/StyledPaper';

const useStyle = makeStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
    
    },
    iconText: {
      display: "flex",
      flexDirection: "column",
      textAlign: "center"
    },
    icon: {
      fontSize: (themes: ThemeType) => themes.icon
    }
  })

type Props = {
    w: any
    classes: any,
    themes: ThemeType
    changeLang: () => void,
    openModal: (modalName: string) => void
};

const PFooterContainer = ({presenter}: any) => {
    const themes = React.useContext(ThemeContext);
    const classes = useStyle(themes);
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
        themes,
        changeLang,
        openModal,
    };

    return presenter(props)
}

const PFooterPresenter = ({ w, classes, themes, changeLang, openModal }: Props) => {
   
    return (
    
        <StyledPaper className={classes.root}>
        <PPagination/>
        <Grid container justify="center" spacing={2}>
          <Grid item className={classes.iconText}>
            <Translate
              onClick={() => changeLang()}
              color="primary"
              className={classes.icon}
            />
            {w.lang}
          </Grid>
          <Grid item className={classes.iconText}>
            <ImportContactsTwoTone
              onClick={() => openModal("magazines")}
              fontSize="large"
              className={classes.icon}
            />
            {w.magazines}
          </Grid>
          <Grid item className={classes.iconText}>
            <SignalWifi3BarTwoTone
              onClick={() => openModal("wifi")}
              className={classes.icon}
            />
            Wifi
          </Grid>
          <Grid item className={classes.iconText}>
            <ThumbUpTwoTone
              onClick={() => openModal("review")}
              className={classes.icon}
            />
          </Grid>
          <Grid item className={classes.iconText}>
            <ListAltTwoTone
              onClick={() => openModal("menus")}
              className={classes.icon}
            />
          </Grid>
          <Grid item className={classes.iconText}>
            <a href="https://karte.smart-recept.jp/staff/login/">
              <PersonAddTwoTone className={classes.icon} />
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
      </StyledPaper>
    );
};
export const PFooter = () => (
  <PFooterContainer
        presenter={(props: Props) => <PFooterPresenter {...props} />}
  />
);