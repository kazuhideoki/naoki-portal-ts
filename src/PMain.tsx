import React from "react";
import { ThemeContext } from "./modules/ThemeContext";
import { Store, WpData, WpParams } from "./modules/Store";
import { formatDate } from "./modules/organizeData";
import { sortDataPosts, SortDataPosts, setAuthorName } from "./modules/organizeData";
import { staffImg } from "./img/staff/staffImg";

import { Grid, Paper, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { pickStaffImg } from "./modules/pickStaffImg";
import { StyledPaper } from "./StyledComponent/StyledPaper";
import { useStylesFactory } from "./modules/useStylesFactory";

const styles = {
    root: {
        overflow: "scroll",
        height: "100%",
    },
    item: {
        height: "100%",
    },
    article: {
        width: 350,
        height: "100%",
    },
    insta: {
        width: 408,
        height: "100%",
    },
    instaDiv: {
        position: "relative",
    },
    titleImgDiv: {
        position: "relative",
    },
    title: {
        position: "absolute",
        bottom: 0, 
        width: "100%",
        padding: "40px 10px 0 10px",
        background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5074404761904762) 33%, rgba(255,255,255,1) 100%)",
    },
    img: {
        objectFit: "cover",
        width: "100%",
        height: 300,
        backgroundSize: "cover",
    },
    staffImg: {
        width: 50
    },
}

type Props = {
    wpParams: WpParams
    wpData: WpData,
    classes: Record<"root" | "item" | "article" | "titleImgDiv" | "title" | "staffImg" | "img" | "insta" | "instaDiv", string>
    articles: SortDataPosts,
    setAndOpenArticleModal: (data: object[]) => void
}

const PMainContainer = ({presenter}: any) => {
    const classes = useStylesFactory(styles);

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
        articles,
        setAndOpenArticleModal,
    };

    return presenter(props)

}

const PMainPresenter = ({
    wpParams,
    wpData,
    classes,
    articles,
    setAndOpenArticleModal,
}: Props) => {
    let displayArticles;
    const instaRef = React.useRef(null)

    //   インスタ表示のときはレイアウトを変える
    if (articles && wpParams.categories === 187) {
        displayArticles = articles.map((value, key: number) => {
            return (
            // <Grid item key={key} className={classes.item}>
            //         <StyledPaper
            //         className={classes.article}
            //     >
            //         <h3>{value.date}</h3>
            //         <div dangerouslySetInnerHTML={{ __html: value.content }} />
            //         </StyledPaper>
            // </Grid>
            <Grid item key={key} className={classes.item}>
                    <Card
                        variant="outlined"
                        className={classes.insta}
                    >
                        <Typography gutterBottom variant="h6" align="right">
                            <h3>{value.date}</h3>
                        </Typography>
                        <div className={classes.instaDiv}dangerouslySetInnerHTML={{ __html: value.content }} />
                    </Card>
            </Grid>
            )
        })
    //   通常の記事一覧の表示
    } else if (articles) {
        displayArticles = articles.map((value, key: number) => {

            const num = articles[key].authorId  
            const img = pickStaffImg(staffImg, num)
        
            return (
                <Grid item key={key} className={classes.item}>
                    <Card variant="outlined" className={classes.article} id={`p_main_` + key} onClick={() => setAndOpenArticleModal([wpData.articles[key]])}>
                        <CardActionArea>
                            <div className={classes.titleImgDiv}>
                                <img
                                    className={classes.img}
                                    src={value.featuredImg}
                                    alt={value.title}
                                />
                                <Typography className={classes.title} variant="h5" >
                                    {value.title}
                                </Typography>
                            </div>
                            <CardContent>
                                <Typography gutterBottom variant="h6" align="right">
                                    {value.date} <img className={classes.staffImg} src={(img) ? img : ''} alt='' /> {value.authorName}
                                </Typography>
                                <Typography variant="body1">
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

    // instaのiframeの表示サイズを変更させる
    React.useEffect(() => {
        console.log(instaRef.current);
        if (wpParams.categories === 187) {
            //@ts-ignore
            const iframe = instaRef.current.getElementsByClassName("iframe-class")
            console.log(iframe);
            Array.prototype.forEach.call(iframe, function (element: any) {
                element.style.transform = "scale(1.2)"
                element.style.transformOrigin = "left"
            })
        }  
    })

    return (
        <Grid id='p_main' container wrap="nowrap" className={classes.root} spacing={2} ref={instaRef}>
            {displayArticles}
        </Grid>
        
    );
}
export const PMain = () => (
    <PMainContainer presenter={ (props:Props) => <PMainPresenter {...props} />}/>
)