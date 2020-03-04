import React from "react";
import { ThemeType } from "./modules/ThemeContext";
import { Store } from "./modules/Store";
import { Tag, Author } from "./modules/wpParamsReducer";
import { AppState } from "./modules/Store";

import { Dialog, Slide, withStyles, DialogContent } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';

import { Magazines } from "./PModalModules/Magazines";
import { useStylesFactory } from "./modules/useStylesFactory";
import { Wifi } from "./PModalModules/Wifi";
import { Review } from "./PModalModules/Review";
import { Menus } from "./PModalModules/Menus";
import { Menu } from "./PModalModules/Menu";
import { MenuDrink } from "./PModalModules/MenuDrink";
import { MenuTreatment } from "./PModalModules/MenuTreatment";
import { TagModal } from "./PModalModules/TagModal";
import { AuthorModal } from "./PModalModules/AuthorModal";
import { CloseButton } from "./molecules/CloseButton";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    icon: { fontSize: (themes: ThemeType) => themes.icon },
    dialogContent: {
        padding: "0!important"
    }
}

type Props = {
    classes: Record<string, string>
    setModal: AppState["setModal"],
    isModalOpen: AppState["isModalOpen"]
    openModal: (name: string) => void,
    closeModal: () => void,
    setParamsAndClose: ({ type, payload }: SetParamsAndClose) => void
}
type SetParamsAndClose = Tag | Author

const PModalContainer = ({presenter}: any) => {
    const classes = useStylesFactory(styles);

    const { dispatchWpParams, appState, dispatchAppState } = React.useContext(Store)
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
    setModal,
    isModalOpen,
    openModal,
    closeModal,
    setParamsAndClose,
}: Props) => {
    // modalは内容、modalStyle内容に応じてDialogのstyleを変える
    let modal;
    let modalStyle
    const menuDringImg = {
        width: "90vw",
        height: "90vh",
        padding: 0,
    }
    const menuImg = {
        width: "100vw",
        height: "100vh",
        padding: 0,

    }
    
    switch (setModal) {
        case "magazines":
            modal = <Magazines icon={classes.icon}/>
            break;
        case "wifi":
            modal = <Wifi/>
            break;
        case "review":
            modal = <Review/>
            break;
        case "menus":
            modal = <Menus icon={classes.icon}  openModal={openModal}/>
            break;
        case "menuDrink":
            modalStyle = menuDringImg
            modal = <MenuDrink menuLists={classes.menuLists}/>
            break;
        case "menu":
            modalStyle = menuImg      
            modal = <Menu/>
        break;
        case "menuTreatment":
            modalStyle = menuImg     
            modal = <MenuTreatment/>
        break;
        // case "setting":
        //     modal = <p>settingです</p>;
        // break;
        case "tag":
            modal = <TagModal setParamsAndClose={setParamsAndClose}/>
        break;

        case "author":
            modal = <AuthorModal setParamsAndClose={setParamsAndClose} />
        break;

        default:
        console.log("エラーだよ、PModal");
    }

    // modalStyleの指定がなければデフォルト値をあてる
    let paperStyle: any = modalStyle || {
        width: 500,
        height: 500,
        padding: 30
    }
    paperStyle.maxWidth = "100%"
    paperStyle.maxHeight = "100%"
    paperStyle.margin = 0


    const StyledDialog = withStyles({
        paper: paperStyle
    })(Dialog);

    return (
        <StyledDialog
        open={isModalOpen}
        TransitionComponent={Transition}
        onClose={closeModal}
        maxWidth="xl"
        >
            <CloseButton onClick={closeModal}/>
            <DialogContent className={classes.dialogContent}>
                {modal}
            </DialogContent>
        </StyledDialog>
    );
};

export const PModal = () => (
    <PModalContainer presenter={(props: Props) => <PModalPresenter {...props} />} />
);
