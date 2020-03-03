import React from "react";
import { ThemeType } from "./modules/ThemeContext";
import { Store, WpParams } from "./modules/Store";
import { sortDataTags, SortDataTags, sortDataUsers, SortDataUsers } from "./modules/organizeData";
import { Tag, Author } from "./modules/wpParamsReducer";
import { AppState } from "./modules/Store";

import { Button, Dialog, Slide, withStyles } from "@material-ui/core";
import {
    FreeBreakfastTwoTone,
    ListTwoTone
} from "@material-ui/icons";
import { TransitionProps } from '@material-ui/core/transitions';

import treatmentIcon from "./img/menu-treatment.png";
import menuDrink from "./img/drink-img.jpg";
import menu from "./img/menu-img.jpg"; 
import menuTreatment from "./img/menu-treatment-img.jpg";
import googleQr from "./img/review_qr_google.png";
import facebookQr from "./img/review_qr_facebook.png";
import { pickStaffImg } from "./modules/pickStaffImg";
import { staffImg } from "./img/staff/staffImg";
import { StyledPaper } from "./StyledComponent/StyledPaper";
import { Magazines } from "./PModalModules/Magazines";
import { useStylesFactory } from "./modules/useStylesFactory";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = withStyles({
    paper: {
    width: 500,
    height: 500,
    padding: 30
    }
})(Dialog);

const styles = {
    staffImg: {
        width: 50
    },
        icon: { fontSize: (themes: ThemeType) => themes.icon }
    }

type Props = {
    classes: Record<"icon" | "staffImg", string>
    wpParams: WpParams,
    tags: SortDataTags
    authors: SortDataUsers
    setModal: AppState["setModal"],
    isModalOpen: AppState["isModalOpen"]
    openModal: (name: string) => void,
    closeModal: () => void,
    setParamsAndClose: ({ type, payload }: SetParamsAndClose) => void
}
type SetParamsAndClose = Tag | Author

const PModalContainer = ({presenter}: any) => {
    const classes = useStylesFactory(styles);

    const { wpParams, wpData, dispatchWpParams, appState, dispatchAppState } = React.useContext(Store)
    const tags = sortDataTags(wpData.tags);
    const authors = sortDataUsers(wpData.users);
    const setModal = appState.setModal;
    const isModalOpen = appState.isModalOpen
    const openModal = (name: string) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: name });
    }
    const closeModal = () => {
      dispatchAppState({ type: "CLOSE_MODAL" });
    };
    const setParamsAndClose = ({ type, payload }: SetParamsAndClose) => {
        dispatchAppState({ type: "START_LOADING" })
        dispatchWpParams({ type: type, payload: payload })
        dispatchAppState({ type: "CLOSE_MODAL" });
    }

    const props = {
        classes,
        wpParams,
        tags,
        authors,
        setModal,
        isModalOpen,
        openModal,
        closeModal,
        setParamsAndClose
    };

    return presenter(props)

}

const PModalPresenter = ({
    classes,
    wpParams,
    tags,
    authors,
    setModal,
    isModalOpen,
    openModal,
    closeModal,
    setParamsAndClose,
}: Props) => {
    let modal;
    switch (setModal) {
        case "magazines":
            modal = <Magazines/>
        break;

        case "wifi":
            modal = (<p>NAOKI Hair Dressing 02350235</p>)
        break;

        case "review":
            modal = (
                <>
                レビューしてね。 google →<img src={googleQr} alt="" />
                facebook→
                <img src={facebookQr} alt="" />
                </>
            );
        break;
        case "menus":
            modal = (
              <>
                <FreeBreakfastTwoTone
                  className={classes.icon}
                  onClick={() => openModal("menuDrink")}
                />
                <ListTwoTone
                  className={classes.icon}
                  onClick={() => openModal("menu")}
                />
                <img
                  src={treatmentIcon}
                  alt=""
                  onClick={() => openModal("menuTreatment")}
                />
              </>
            );
        break;
        case "menuDrink":
            modal = <img src={menuDrink} alt="" />;
        break;
        case "menu":
            modal = <img src={menu} alt="" />;
        break;
        case "menuTreatment":
            modal = <img src={menuTreatment} alt="" />;
        break;
        case "setting":
            modal = <p>settingです</p>;
        break;
        case "tag":
            let tagsLang;
            if (wpParams.isJa) {
                tagsLang = tags.tagsJa;
            } else {
                tagsLang = tags.tagsEn;
            }
            const tagsWrap = tagsLang.map((value, key) => {
                const payload = value.id
                const type = "TAG"
                return (
                    <Button key={key} onClick={() => setParamsAndClose({ type, payload})}>
                        {value.name}
                    </Button>
                )
            });
            modal = <>{tagsWrap}</>;
        break;

        case "author":

            let auhtorsWrap = authors.filter(function (value) {
                if (value.name === "Naoki Hair Dressing") {
                    return false; // skip
                }
                return true;
            }).map((value, key) => {
                const payload = value.id
                const img = pickStaffImg(staffImg, payload)
                const type = "AUTHOR"
                return (
                    <Button key={key} onClick={() => setParamsAndClose({type, payload})}>
                        <img src={img} alt="" className={classes.staffImg}/>{value.name}
                    </Button>
                )
            });
            modal = <>{auhtorsWrap}</>
        break;

        default:
        console.log("エラーだよ、PModal");
    }

    return (
        <StyledDialog
        open={isModalOpen}
        TransitionComponent={Transition}
        onClose={closeModal}
        >
            {/* <StyledPaper> */}
                {modal}
            {/* </StyledPaper> */}
        </StyledDialog>
    );
};

export const PModal = () => (
    <PModalContainer presenter={(props: Props) => <PModalPresenter {...props} />} />
);
