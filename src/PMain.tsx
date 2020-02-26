import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store, WpData, WpParams } from "./modules/Store";
import { ThemeContextProps } from "./modules/ThemeContext";
import { formatDate } from "./modules/organizeData";
import { sortDataPosts, SortDataPosts, setAuthorName } from "./modules/organizeData";
import { staffImg } from "./img/staff/staffImg";

import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
    root: {
        overflow: "scroll"
    },
    item: {
        margin: '5px',
    },
    article: {
        height: "60vh",
        width: 400
    },
    staffImg: {
        width: 100
    },
    img: {
        width: '100%'
    },
});

type Props = {
    wpParams: WpParams
    wpData: WpData,
    classes: Record<"root" | "item" | "article" | "staffImg" | "img", string>
    elevation: ThemeContextProps["elevation"],
    articles: SortDataPosts,
    setAndOpenArticleModal: (data: object[]) => void
    isLoading: boolean
    endLoading: () => void
}

const PMainContainer = ({presenter}: any) => {
    const classes = useStyles();
    const { elevation } = React.useContext(ThemeContext);

    const { wpParams, wpData, dispatchWpData, appState, dispatchAppState } = React.useContext(Store);
    // 利用するデータを抜き出し、authorをnumberから名前に変える
    let articles = sortDataPosts(wpData.articles);
        articles = setAuthorName(articles, wpData)
        articles = formatDate(articles)

    const setAndOpenArticleModal = (data: object[]) => {
        dispatchWpData({type: "SET_SINGLE_ARTICLE", payload: data})
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL"})
    }

    const isLoading = appState.isLoading
    const endLoading = () => dispatchAppState({type: "END_LOADING"})
    
    const props = {
        wpParams,
        wpData,
        classes,
        elevation,
        articles,
        setAndOpenArticleModal,
        isLoading,
        endLoading,
    };

    return presenter(props)

}

const PMainPresenter = ({
    wpParams,
    wpData,
    classes,
    elevation,
    articles,
    setAndOpenArticleModal,
    isLoading,
    endLoading,
}: Props) => {
    let displayArticles;
        //   インスタ表示のときはレイアウトを変える
    if (articles && wpParams.categories === 187) {
        displayArticles = articles.map((value, key: number) => {
            return (
            <Grid item key={key} className={classes.item}>
                <Paper
                    className={classes.article}
                    elevation={elevation}
                >
                    <h3>{value.date}</h3>
                    <div dangerouslySetInnerHTML={{ __html: value.content }} />
                </Paper>
            </Grid>
            )
        })
        //   通常の記事一覧の表示
    } else if (articles) {
        displayArticles = articles.map((value, key: number) => {
            const imgNum = 'img' + articles[key].authorId  
            let img: string[] = []
            staffImg.forEach((value: string) => {
                if (!(value.indexOf(imgNum) === -1)) {
                    img.push(value)
                }
            })
            
            return (
                <Grid item key={key} className={classes.item} >
                <Paper
                className={classes.article}
                onClick={() => setAndOpenArticleModal([wpData.articles[key]])}
                elevation={elevation}
                id={`p_main_` + key}
                >
                <h2>{value.title} </h2>
                <h3>{value.authorName}</h3>
                <h3>{value.date}</h3>
                <img className={classes.staffImg} src={(img) ? img[0] : ''} alt=''/>

                <div  dangerouslySetInnerHTML={{ __html: value.excerpt }} />
                <img
                    className={classes.img}
                    src={value.featuredImg}
                    alt={value.title}
                />
                </Paper>
            </Grid>
            )
        });
    } else {
        displayArticles = <Paper>No articles</Paper>;
    }

    return (
        <Grid id='p_main' container wrap="nowrap" className={classes.root}>
        {/* {(!isLoading)? displayArticles: null} */}
        {displayArticles}
        </Grid>
        
    );
}
export const PMain = () => 
    <PMainContainer presenter={ (props:Props) => <PMainPresenter {...props} />}/>
