import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store, WpData, WpParams } from "./modules/Store";
import { ThemeContextProps } from "./modules/ThemeContext";
import { formatDate } from "./modules/organaizeData";
import { sortDataPosts, SortDataPosts, setAuthorName } from "./modules/organaizeData";

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
    img: {
        width: '100%'
    }
});

type Props = {
    wpParams: WpParams
    wpData: WpData,
    classes: Record<"root" | "item" | "article" | "img", string>
    elevation: ThemeContextProps["elevation"],
    articles: SortDataPosts,
    setAndOpenArticleModal: (data: object[]) => void
}

const PMainContainer = ({presenter}: any) => {
    const classes = useStyles();
    const { elevation } = React.useContext(ThemeContext);

    const { wpParams, wpData, dispatchWpData, dispatchAppState } = React.useContext(Store);
    // 利用するデータを抜き出し、authorをnumberから名前に変える
    let articles = sortDataPosts(wpData.articles);
        articles = setAuthorName(articles, wpData)
        articles = formatDate(articles)

    const setAndOpenArticleModal = (data: object[]) => {
        dispatchWpData({type: "SET_SINGLE_ARTICLE", payload: data})
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL"})
    }
    
    const props: Props = {
        wpParams,
        wpData,
        classes,
        elevation,
        articles,
        setAndOpenArticleModal
    };

    return presenter(props)

}

const PMainPresenter = ({
    wpParams,
    wpData,
  classes,
  elevation,
  articles,
  setAndOpenArticleModal
}: Props) => {
  let displayArticles;
  if (articles && wpParams.categories === 187) {
      displayArticles = articles.map((value, key: number) => (      <Grid item key={key} className={classes.item}>
          <Paper
              className={classes.article}
              elevation={elevation}
          >
              <h3>{value.date}</h3>
              <div dangerouslySetInnerHTML={{ __html: value.content }} />
          </Paper>
      </Grid>
      ))
  } else if (articles) {
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

