import React, {useContext}from 'react'
import { Grid } from "@material-ui/core";
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
import { useStylesFactory } from './modules/useStylesFactory';
import { IconAndText } from './molecules/IconAndText';
import { useWordsChange } from './modules/useWordsChange';

const styles = {
    root: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",

    },
    icon: {
      fontSize: (themes: ThemeType) => themes.icon
    }
  }

type Props = {
    w: any
    classes: any,
    themes: ThemeType
    changeLang: () => void,
    openModal: (modalName: string) => void
};

const PFooterContainer = ({presenter}: any) => {
    const themes = React.useContext(ThemeContext)
    const classes = useStylesFactory(styles);
    const { wpParams, dispatchWpParams, dispatchAppState } = useContext(Store);

    const changeLang = () => {
        dispatchAppState({ type: "START_LOADING" })
        dispatchWpParams({ type: "LANG" });
    }
    const openModal = (modalName: string) =>
      dispatchAppState({ type: "OPEN_MODAL", payload: modalName });

    // let w
    // if (wpParams.isJa) {
    //      w = pfooter.ja
    // }else{
    //      w = pfooter.en
    // }
    const w = useWordsChange(pfooter)

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
            <Grid item>
                <IconAndText
                    icon={Translate}
                    onClick={() => changeLang()}
                    color="primary"
                    classNameIcon={classes.icon}
                    text={w.lang}
                />
            </Grid>
            <Grid item>
                <IconAndText
                    icon={ImportContactsTwoTone}
                    onClick={() => openModal("magazines")}
                    fontSize="large"
                    classNameIcon={classes.icon}
                    text={w.magazines}
                />
            </Grid>
            <Grid item>
                <IconAndText
                    icon={SignalWifi3BarTwoTone}
                    onClick={() => openModal("wifi")}
                    classNameIcon={classes.icon}
                    text="Wifi"
                />
            </Grid>
            <Grid item>
                <IconAndText
                    icon={ThumbUpTwoTone}
                    onClick={() => openModal("review")}
                    classNameIcon={classes.icon}
                    text={w.review}
                />
            </Grid>
            <Grid item>
                <IconAndText
                    icon={ListAltTwoTone}
                    onClick={() => openModal("menus")}
                    classNameIcon={classes.icon}
                    text={w.menu}
                />
            </Grid>
            <Grid item>
                <a href="https://karte.smart-recept.jp/staff/login/">
                    <IconAndText
                        icon={PersonAddTwoTone}
                        classNameIcon={classes.icon}
                        text={w.registration}
                    />
                </a>
            </Grid>
        </Grid>
    </StyledPaper>
    );
};
export const PFooter = () => (
  <PFooterContainer
        presenter={(props: Props) => <PFooterPresenter {...props} />}
  />
);