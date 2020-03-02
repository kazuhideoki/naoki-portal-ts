import React from "react";
import { Store } from './modules/Store'
import { makeStyles } from "@material-ui/styles";
import { formatDate } from "./modules/organizeData";
import { sortDataPosts } from "./modules/organizeData";
import { ThemeContext, ThemeType } from "./modules/ThemeContext";
import { StyledPaper } from "./StyledComponent/StyledPaper";

const useStyles = makeStyles({
  root: {
      textAlign: "center",
      height: "100%"
  },
  img: {
    height: 40
  },
  p: {
      margin: 0
  }
});
type Props = {
    classes: Record<"root" | "img" | "p", string>
    SortedNotice: any[]
    setAndOpenArticleModal: () => void
}

const PHeaderContainer = ({presenter}: any) => {
    const themes = React.useContext(ThemeContext);
    const classes = useStyles(themes);

    const { wpData, wpParams, dispatchWpData, dispatchAppState } = React.useContext(Store);
    let notice = (wpParams.isJa) ? wpData.articlesImportantJa : wpData.articlesImportantEn
    let SortedNotice = sortDataPosts(notice)
    SortedNotice = formatDate(SortedNotice)

    const setAndOpenArticleModal = () => {
        dispatchWpData({ type: "SET_SINGLE_ARTICLE", payload: notice })
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL" })
    }

    const props = {
        classes,
        SortedNotice,
        setAndOpenArticleModal
    }
    return presenter(props)
}

const PHeaderPresenter = ({ classes, SortedNotice, setAndOpenArticleModal }: Props) => {
    let displayNotice
    if (SortedNotice) {
        displayNotice = SortedNotice.map((value, key) => (
            <StyledPaper key={key} className={classes.root} onClick={() => setAndOpenArticleModal()}>
                <p className={classes.p}>
                    <img
                    className={classes.img}
                    src={value.featuredImg}
                    alt={value.title}
                    />
                    {value.title} {value.date}
                </p>
            </StyledPaper>
         ))   
    }

    return <>{displayNotice}</>

}

export const PHeader = () => (
    <PHeaderContainer presenter={(props: Props) => <PHeaderPresenter {...props} />} />
)
