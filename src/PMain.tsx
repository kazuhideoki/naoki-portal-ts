import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store, ContextStore, WpData } from "./modules/Store";
import { sortDataPosts } from "./modules/wpApiFetch";
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


const PMainContainer = ({presenter}: any) => {
    const classes = useStyles();
    const { elevation } = React.useContext(ThemeContext);

    const { wpData, dispatchWpData, dispatchAppState } = React.useContext(Store);
    const articles = sortDataPosts(wpData.articles);
    const setAndOpenArticleModal = (data: object[]) => {
        dispatchWpData({type: "SET_SINGLE_ARTICLE", payload: data})
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL"})
    }
    
    const props = {
        wpData,
      classes,
      elevation,
      articles,
      setAndOpenArticleModal
    };

    return presenter(props)

}

type Props = {

}

const PMainPresenter = ({
    wpData,
  classes,
  elevation,
  articles,
  setAndOpenArticleModal
}) => {
  let displayArticles;

  if (articles) {
    displayArticles = articles.map((value: object, key: number) => (
      <Grid item key={key} className={classes.item}>
        <Paper
          className={classes.article}
          onClick={() => setAndOpenArticleModal([wpData.articles[key]])}
          elevation={elevation}
        >
          <h2>{value.title}</h2>
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
    <PMainContainer presenter={ props => <PMainPresenter {...props} />}/>
)

