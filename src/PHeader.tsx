import React from "react";
import { Store } from './modules/Store'
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { formatDate } from "./modules/organizeData";
import { sortDataPosts } from "./modules/organizeData";

const useStyles = makeStyles({
    root: {
        height: '100%',
        padding: 10
    },
    img: {
        heigth: "100%"
    }
});
type Props = {
    classes: Record<"root" | "img", string>
    SortedNotice: any[]
    setAndOpenArticleModal: () => void
}

const PHeaderContainer = ({presenter}: any) => {
    const classes = useStyles();

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
            <Paper key={key} className={classes.root} onClick={() => setAndOpenArticleModal()}>
                <p>
                    <img
                    className={classes.img}
                    src={value.featuredImg}
                    alt={value.title}
                    />
                    {value.title} {value.date}
                </p>
            </Paper>
         ))   
    }

    return displayNotice

}

export const PHeader = () => (
    <PHeaderContainer presenter={(props: Props) => <PHeaderPresenter {...props} />} />
)
