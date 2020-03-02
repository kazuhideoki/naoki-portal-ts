import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { PModal } from "./PModal";
import { PHeader } from "./PHeader"; 
import { PMain } from "./PMain";
import { PFooter } from "./PFooter";
import { Store } from "./modules/Store";
import { PArticleModal } from "./PArticleModal";
import { getWpPosts, getWpPostsImportant, getWpTags, getWpUsers } from "./modules/wpApiFetch";
import { ThemeContext, ThemeType } from "./modules/ThemeContext";


// 3段のコンテナの整形に関してのみ記述, 
// 枠の設定、header,footerの最大値の設定
const useStyles = makeStyles({
    root: {
        overflow: "hidden",
        position: "fixed",
        padding: (themes: ThemeType) => themes.app.padding,
        // width: (themes: ThemeType) => themes.app.width,
        // height: (themes: ThemeType) => themes.app.height,
        width: "100vw",
        height: "100vh",
    },
    header: {
        marginBottom: (themes: ThemeType) => themes.pHeader.marginBottom,
        width: (themes: ThemeType) => themes.pHeader.width,
        height: (themes: ThemeType) => themes.pHeader.height,
    },
    main: {
        width: (themes: ThemeType) => themes.pMain.width,
        height: (themes: ThemeType) => themes.pMain.height,
    },
    footer: {
        marginTop: (themes: ThemeType) => themes.pFooter.marginTop,
        width: (themes: ThemeType) => themes.pFooter.width,
        height: (themes: ThemeType) => themes.pFooter.height,
    }
});

export type SetArticles = (data: any) => void
export type SetArticlesImportant = (data: any) => void
export type SetArticlesImportantEn = (data: any) => void
export type SetArticlesImportantJa = (data: any) => void
export type SetTags = (data: any) => void
export type SetUsers = (data: any) => void

type Props = {
    classes: Record<"root" | "header" | "main" | "footer", string>
    isLoading: boolean
}

const AppContainer = ({presenter}: any)=> {
    const themes = React.useContext(ThemeContext);
    const classes = useStyles(themes)
    const { wpParams, dispatchWpData, appState, dispatchAppState, setTotalPages } = React.useContext(Store);
    const isLoading = appState.isLoading
    const endLoading = () => dispatchAppState({type: "END_LOADING"})
    const setArticles = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES", payload: data });

    const getPosts = async function() {
        await getWpPosts({ wpParams, setArticles, setTotalPages })
        endLoading()
    }
    const setArticlesImportantEn = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES_IMPORTANT_EN", payload: data });
    const setArticlesImportantJa = (data: any) =>
        dispatchWpData({ type: "SET_ARTICLES_IMPORTANT_JA", payload: data });
    const setTags = (data: any) =>
        dispatchWpData({ type: "SET_TAGS", payload: data });
    const setUsers = (data: any) =>
        dispatchWpData({ type: "SET_USERS", payload: data });

    React.useEffect(() => {
        getPosts()
    }, [wpParams]);

    React.useEffect(() => {          
        getWpPostsImportant({ setArticlesImportantEn, setArticlesImportantJa});
    }, []);
    React.useEffect(() => {          
        getWpTags(setTags);
    }, []);
    React.useEffect(() => {
        getWpUsers(setUsers);
    }, []);

    const props = {
    classes,
    isLoading,
    };

    return presenter(props)
}

const AppPresenter = ({
    classes,
    isLoading,
}: Props) => {

    return (
        <div className={classes.root}>

      <Grid
                // className={classes.root}
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
          {!isLoading ? <PMain /> : <Skeleton />}
        </Grid>
        <Grid item className={classes.footer}>
          <PFooter />
        </Grid>
        <PArticleModal />
        <PModal />
      </Grid>
        </div>

    );
};

export const App = () => (
    <AppContainer presenter={(props: Props) => <AppPresenter {...props} />} />
);