import React, { useContext } from "react";
import { ThemeContext, ThemeContextProps } from "./modules/ThemeContext";
import { Store, WpParams } from "./modules/Store";
import { sortDataTags, SortDataTags, sortDataUsers, SortDataUsers } from "./modules/organaizeData";
import { Tag, Author } from "./modules/wpParamsReducer";
import { AppState } from "./modules/Store";

import { Button, Paper, Dialog, Slide, withStyles } from "@material-ui/core";
import {
    ImportContacts,
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

type Props = {
    wpParams: WpParams,
    tags: SortDataTags
    authors: SortDataUsers
    theme: ThemeContextProps,
    setModal: AppState["setModal"],
    isModalOpen: AppState["isModalOpen"]
    openModal: (name: string) => void,
    closeModal: () => void,
    changeParamsAndClose: ({ type, payload }: ChangeParamsAndClose) => void
}
type ChangeParamsAndClose = Tag | Author

const PModalContainer = ({presenter}: any) => {
    const theme = useContext(ThemeContext);
      const { wpParams, wpData, dispatchWpParams, appState, dispatchAppState } = React.useContext(
        Store
      );
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
    const changeParamsAndClose = ({ type, payload }: ChangeParamsAndClose) => {
        dispatchWpParams({ type: type, payload: payload })
        dispatchAppState({ type: "CLOSE_MODAL" });
    }

    const props = {
      wpParams,
      tags,
      authors,
      theme,
      setModal,
      isModalOpen,
      openModal,
      closeModal,
      changeParamsAndClose
    };
    return presenter(props)
}
const PModalPresenter = ({
  wpParams,
  tags,
  authors,
  theme,
  setModal,
  isModalOpen,
  openModal,
  closeModal,
  changeParamsAndClose,
}: Props) => {
  let modal;
  switch (setModal) {
    case "magazines":
      modal = (
        <Paper>
          Magzter
          <a href="fb179689808731959://" >
            <ImportContacts style={theme.icon} />
          </a>
          楽天マガジン
          <a href="rmagazine://" >
            <ImportContacts style={theme.icon} />
          </a>
        </Paper>
      );
      break;

    case "wifi":
      modal = <Paper>NAOKI Hair Dressing 02350235</Paper>;
      break;

    case "review":
      modal = (
        <Paper>
          レビューしてね。 google →<img src={googleQr} alt="" />
          facebook→
          <img src={facebookQr} alt="" />
        </Paper>
      );
      break;
    case "menus":
      modal = (
        <Paper>
          ドリンク、全体メニュー、トリートメント麺ニューを
          <FreeBreakfastTwoTone
            style={theme.icon}
            onClick={ () => openModal("menuDrink")}
          />
          <ListTwoTone style={theme.icon} onClick={ () => openModal("menu")} />
          <img
            src={treatmentIcon}
            alt=""
            onClick={ () => openModal("menuTreatment")}
          />
        </Paper>
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
          return <Button key={key} onClick={() => changeParamsAndClose({ type, payload})}>
          {value.name}
        </Button>
      });
      modal = <Paper>{tagsWrap}</Paper>;

      break;
    case "author":
      var auhtorsWrap = authors
          .filter(function (value) {
          if (value.name === "Naoki Hair Dressing") {
            return false; // skip
          }
          return true;
        })
        .map((value, key) => {
            const payload = value.id
            const type = "AUTHOR"
            return <Button key={key} onClick={() => changeParamsAndClose({type, payload})}>
                <img src={value.img} alt=""/>{value.name}
          </Button>
        });
      modal = <Paper>{auhtorsWrap}</Paper>;

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
      {modal}
    </StyledDialog>
  );
};

export const PModal = () => (
  <PModalContainer
        presenter={(props: Props) => <PModalPresenter {...props} />}
  />
);
