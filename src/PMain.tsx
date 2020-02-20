import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store, WpData } from "./modules/Store";
import { ThemeContextProps } from "./modules/ThemeContext";
import { sortDataPosts, SortDataPosts, setAuthorName, formatDate } from "./modules/wpApiFetch";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { AppStateAction } from "./modules/appStateReducer";
import { WpDataAction } from "./modules/wpDataReducer";

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
    img: {
        width: '100%'
    }
});

type Props = {
    wpData: WpData,
    classes: Record<"root" | "item" | "article" | "img", string>
    elevation: ThemeContextProps["elevation"],
    articles: SortDataPosts,
    setAndOpenArticleModal: (data: object[]) => void
}

const PMainContainer = ({presenter}: any) => {
    const classes = useStyles();
    const { elevation } = React.useContext(ThemeContext);

    const { wpData, dispatchWpData, dispatchAppState } = React.useContext(Store);
    // 利用するデータを抜き出し、authorをnumberから名前に変える
    let articles = sortDataPosts(wpData.articles);
        articles = setAuthorName(articles, wpData)
        articles = formatDate(articles)

    const setAndOpenArticleModal = (data: object[]) => {
        dispatchWpData({type: "SET_SINGLE_ARTICLE", payload: data})
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL"})
    }
    
    const props: Props = {
        wpData,
        classes,
        elevation,
        articles,
        setAndOpenArticleModal
    };

    return presenter(props)

}

const PMainPresenter = ({
    wpData,
  classes,
  elevation,
  articles,
  setAndOpenArticleModal
}: Props) => {
  let displayArticles;

  if (articles) {
      displayArticles = articles.map((value, key: number) => (
      <Grid item key={key} className={classes.item}>
        <Paper
          className={classes.article}
          onClick={() => setAndOpenArticleModal([wpData.articles[key]])}
          elevation={elevation}
        >
          <h2>{value.title}</h2>
          <h3>{value.authorName}</h3>
          <h3>{value.date}</h3>

          <div dangerouslySetInnerHTML={{ __html: value.excerpt }} />
          <img
            className={classes.img}
            src={value.featuredImg}
            alt={value.title}
          />
        </Paper>
      </Grid>
    ));
  } else {
    displayArticles = <Paper>No articles</Paper>;
  }

  return (
    <Grid container wrap="nowrap" className={classes.root}>
      {displayArticles}
    </Grid>
  );
};
export const PMain = () => (
    <PMainContainer presenter={ (props:Props) => <PMainPresenter {...props} />}/>
)

