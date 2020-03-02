import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store, WpData, WpParams } from "./modules/Store";
import { ThemeType } from "./modules/ThemeContext";
import { formatDate } from "./modules/organizeData";
import { sortDataPosts, SortDataPosts, setAuthorName } from "./modules/organizeData";
import { staffImg } from "./img/staff/staffImg";

import { Grid, Paper, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { pickStaffImg } from "./modules/pickStaffImg";
import { StyledPaper } from "./StyledComponent/StyledPaper";

const useStyles = makeStyles({
    root: {
        overflow: "scroll",
        height: "100%",
    },
    item: {
        marginLeft: "5px",
        marginRight: "5px",
    },
    article: {
        width: 400
    },
    staffImg: {
        width: 90
    },
    img: {
        width: "100%",
        height: 100
    }
});

type Props = {
    wpParams: WpParams
    wpData: WpData,
    classes: Record<"root" | "item" | "article" | "staffImg" | "img", string>
    elevation: ThemeType["elevation"],
    articles: SortDataPosts,
    setAndOpenArticleModal: (data: object[]) => void
}

const PMainContainer = ({presenter}: any) => {
    const themes = React.useContext(ThemeContext);
    const elevation = themes.elevation
    const classes = useStyles(themes);

    const { wpParams, wpData, dispatchWpData, dispatchAppState } = React.useContext(Store);
    // 利用するデータを抜き出し、authorをnumberから名前に変える
    let articles = sortDataPosts(wpData.articles);
        articles = setAuthorName(articles, wpData)
        articles = formatDate(articles)

    const setAndOpenArticleModal = (data: object[]) => {
        dispatchWpData({type: "SET_SINGLE_ARTICLE", payload: data})
        dispatchAppState({ type: "OPEN_ARTICLE_MODAL"})
    }
    
    const props = {
        wpParams,
        wpData,
        classes,
        elevation,
        articles,
        setAndOpenArticleModal,
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
}: Props) => {
    let displayArticles;

    //   インスタ表示のときはレイアウトを変える
    if (articles && wpParams.categories === 187) {
        displayArticles = articles.map((value, key: number) => {
            return (
            <Grid item key={key} className={classes.item}>
                    <StyledPaper
                    className={classes.article}
                    elevation={elevation}
                >
                    <h3>{value.date}</h3>
                    <div dangerouslySetInnerHTML={{ __html: value.content }} />
                    </StyledPaper>
            </Grid>
            )
        })
    //   通常の記事一覧の表示
    } else if (articles) {
        displayArticles = articles.map((value, key: number) => {

            const num = articles[key].authorId  
            const img = pickStaffImg(staffImg, num)
        
            return (
                <Grid item key={key} className={classes.item} >
                    {/* <StyledPaper
                    className={classes.article}
                    onClick={() => setAndOpenArticleModal([wpData.articles[key]])}
                    id={`p_main_` + key}
                    >
                        <h2>{value.title} </h2>
                        <h3>{value.authorName}</h3>
                        <h3>{value.date}</h3>
                        <img className={classes.staffImg} src={(img) ? img : ''} alt=''/>

                        <div  dangerouslySetInnerHTML={{ __html: value.excerpt }} />
                        <img
                        className={classes.img}
                        src={value.featuredImg}
                        alt={value.title}
                        />
                    </StyledPaper> */}
                    <Card className={classes.article} id={`p_main_` + key} onClick={() => setAndOpenArticleModal([wpData.articles[key]])}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.img}
                            image={value.featuredImg}
                            title={value.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    <h3>{value.title} </h3>
                                    <p>{value.date}<img className={classes.staffImg} src={(img) ? img : ''} alt='' />{value.authorName}</p>
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    <div dangerouslySetInnerHTML={{ __html: value.excerpt }} />
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            )
        });
    // 記事がもしなかった場合の表示
    } else {
        displayArticles = <StyledPaper>No articles</StyledPaper>;
    }

    return (
        <Grid id='p_main' container wrap="nowrap" className={classes.root}>
            {displayArticles}
        </Grid>
        
    );
}
export const PMain = () => (
    <PMainContainer presenter={ (props:Props) => <PMainPresenter {...props} />}/>
)