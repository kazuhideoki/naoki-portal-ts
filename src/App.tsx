import React, { Suspense } from "react";
import { Grid, } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {PModal} from "./PModal";
import {PHeader} from "./PHeader"; 
import { PMain } from "./PMain";
import { PFooter } from "./PFooter";
import { PPagination } from "./PPagination";
import { Store, WpParams, SetTotalPages } from "./modules/Store";
import { PArticleModal } from "./PArticleModal";
import { getWpPosts, getWpPostsImportantEn, getWpPostsImportantJa, getWpTags, getWpUsers } from "./modules/wpApiFetch";


// 3段のコンテナの整形に関してのみ記述, 
const useStyles = makeStyles(theme => ({
root: {
    paddingTop: "1vh",
    paddingBottom: "1vh",
    maxHeight: "100%",
    overflow: "hidden"
},
header: {
    maxWidth: "100vw",
    height: "10vh",
    padding: 5,
    textAlign: "center",
    marginBottom: "1vh"
},
main: {
    height: "66vh",
    maxWidth: "100vw"
},
footer: {
    height: "20vh",
    padding: "5px",
    maxWidth: "100vw",
    marginTop: "1vh"
}
}));

export type SetArticles = (data: any) => void
export type SetArticlesImportantEn = (data: any) => void
export type SetArticlesImportantJa = (data: any) => void
export type SetTags = (data: any) => void
export type SetUsers = (data: any) => void

type Props = {
    classes: Record<"root" | "header" | "main" | "footer", string>
    wpParams: WpParams
    setArticles: SetArticles
    setArticlesImportantEn: SetArticlesImportantEn
    setArticlesImportantJa: SetArticlesImportantJa
    setTags: SetTags,
    setUsers: SetUsers,
    setTotalPages: SetTotalPages
}

const articlesRef = React.createRef()
const AppContainer = ({presenter}: any)=> {
    const classes = useStyles();
    const { wpParams, dispatchWpData, setTotalPages } = React.useContext(Store);
    const setArticles = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES", payload: data });
    const setArticlesImportantEn = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES_IMPORTANT_EN", payload: data });
    const setArticlesImportantJa = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES_IMPORTANT_JA", payload: data });
    const setTags = (data: any) =>
        dispatchWpData({ type: "SET_TAGS", payload: data });
    const setUsers = (data: any) =>
        dispatchWpData({ type: "SET_USERS", payload: data });

    const props = {
    classes,
    wpParams,
    setArticles,
    setArticlesImportantEn,
    setArticlesImportantJa,
    setTags,
    setUsers,
    setTotalPages
    };
    return presenter(props)
}

const AppPresenter = ({
    classes,
    wpParams,
    setArticles,
    setArticlesImportantEn,
    setArticlesImportantJa,
    setTags,
    setUsers,
    setTotalPages
}: Props) => {

    React.useEffect(() => {
        getWpPosts({ wpParams, setArticles, setTotalPages });
    }, [wpParams]);

    React.useEffect (() => {
        getWpPostsImportantEn(setArticlesImportantEn)
    },[])
    React.useEffect (() => {
        getWpPostsImportantJa(setArticlesImportantJa)
    },[])
    React.useEffect(() => {          
        getWpTags(setTags);
    }, []);
    React.useEffect(() => {
        getWpUsers(setUsers);
    }, []);

    return (
        <Grid
        spacing={0}
        container
        direction="column"
        justify="center"
        alignItems="stretch"
        >
        <Grid item className={classes.header}>
            <PHeader />
        </Grid>
        <Grid item className={classes.main}>
                <PMain />
            <PPagination />
        </Grid>
        <Grid item className={classes.footer}>
            <PFooter />
        </Grid>
        <PArticleModal />
        <PModal />
        </Grid>
    );
};

export const App = () => (
    <AppContainer presenter={(props: Props) => <AppPresenter {...props} />} />
);