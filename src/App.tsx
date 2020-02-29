import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Skeleton from "@material-ui/lab/Skeleton";
import { PModal } from "./PModal";
import { PHeader } from "./PHeader"; 
import { PMain } from "./PMain";
import { PFooter } from "./PFooter";
import { PPagination } from "./PPagination";
import { Store, WpParams } from "./modules/Store";
import { PArticleModal } from "./PArticleModal";
import { getWpPosts, getWpPostsImportant, getWpTags, getWpUsers } from "./modules/wpApiFetch";


// 3段のコンテナの整形に関してのみ記述, 
const useStyles = makeStyles(() => ({
    root: {
        // paddingTop: "1vh",
        // paddingBottom: "1vh",
        padding: "1vh 1vw",

        maxHeight: "100%",
        overflow: "hidden"
    },
    header: {
        height: "10vh",
        marginBottom: "1vh",

        maxWidth: "98vw",
        padding: 5,
        textAlign: "center",
    },
    main: {
        maxWidth: "98vw",
        height: "66vh",
    },
    footer: {
        maxWidth: "98vw",
        height: "20vh",
        padding: "5px",
        marginTop: "1vh"
    }
}));

export type SetArticles = (data: any) => void
export type SetArticlesImportant = (data: any) => void
export type SetArticlesImportantEn = (data: any) => void
export type SetArticlesImportantJa = (data: any) => void
export type SetTags = (data: any) => void
export type SetUsers = (data: any) => void

type Props = {
    classes: Record<"root" | "header" | "main" | "footer", string>
    wpParams: WpParams
    isLoading: boolean
    getPosts: () => Promise<void>
    getWpPostsImportant: SetArticlesImportant
    setArticlesImportantEn: SetArticlesImportantEn
    setArticlesImportantJa: SetArticlesImportantJa
    setTags: SetTags,
    setUsers: SetUsers,
}

const AppContainer = ({presenter}: any)=> {
    const classes = useStyles();
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

    const props = {
    classes,
    wpParams,
    isLoading,
    getPosts,
    setArticles,
    getWpPostsImportant,
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
    isLoading,
    getPosts,
    getWpPostsImportant,
    setArticlesImportantEn,
    setArticlesImportantJa,
    setTags,
    setUsers,
}: Props) => {
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
          {!isLoading ? <PMain /> : <Skeleton />}
        </Grid>
        <Grid item className={classes.footer}>
          <PPagination />
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