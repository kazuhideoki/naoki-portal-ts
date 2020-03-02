import React from 'react'
import { Store, WpData } from './modules/Store';
import { getWpSinglePosts } from "./modules/wpApiFetch";
import { sortDataPosts } from "./modules/organizeData";
import { bindOnclick } from "./modules/bindOnclick";
import { TransitionProps } from '@material-ui/core/transitions';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    Slide,
    withStyles
} from "@material-ui/core";
import { HighlightOff } from "@material-ui/icons";
import { StyledPaper } from './StyledComponent/StyledPaper';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = withStyles({
    paper: {
        maxWidth: '100%',
        width: '90vw',
        height: '90vh',
    }
})(Dialog);
const StyledHighlightOff = withStyles({
    root: {
        fontSize: '100px',
        position: 'fixed',
        right: '50px',
        opacity: '0.7'
    }
})(HighlightOff);


export type SetSingleArticle = (data: any) => void
export type GetAndShowLinkPage = (data: any) => void

type Props = {
    wpData: WpData
    articleModal: [{
        title: string;
        excerpt: string;
        content: string;
        link: string;
        featuredImg: string;
    }],
    isArticleModalOpen: boolean
    closeArticleModal: () => void
    getAndShowLinkPage: GetAndShowLinkPage
    isLoadingArticleModal:boolean

};

const PArticleModalContainer = ({presenter}:any) => {
    const {
        wpData,
        dispatchWpData,
        appState,
        dispatchAppState
    } = React.useContext(Store);
    const articleModal = sortDataPosts(wpData.articleModal) || [
    {
        title: "",
        excerpt: "",
        content: "",
        link: "",
        featuredImg: ""
    }
    ];
    const isArticleModalOpen = appState.isArticleModalOpen
    const closeArticleModal = () => dispatchAppState({ type: "CLOSE_ARTICLE_MODAL" });
    
    const setSingleArticle = (data: any) =>
    dispatchWpData({ type: "SET_SINGLE_ARTICLE", payload: data });

    const [isLoadingArticleModal, setIsLoadingArticleModal] = React.useState(false)
    const articleModalData = wpData.articleModal
    const getAndShowLinkPage = async (slug: string) =>{
        setIsLoadingArticleModal(true)
        await getWpSinglePosts({ slug, setSingleArticle, articleModalData});
        setIsLoadingArticleModal(false)
    }

    const props = {
        wpData,
        articleModal,
        isArticleModalOpen,
        closeArticleModal,
        getAndShowLinkPage,
        isLoadingArticleModal,
    };
    
    return presenter(props);
}
const PArticleModalPresenter = ({
    wpData,
    articleModal,
    isArticleModalOpen,
    closeArticleModal,
    getAndShowLinkPage,
    isLoadingArticleModal
}: Props) => {
    const ArticleRef = React.useRef(null)
    let singleArticle;
    let content;

    if (articleModal.length) {
        const article = articleModal[0];
        singleArticle = "<h1>" + article.title + "</h1>" + article.content;
 
        content = (
            <StyledPaper>
            <div
            ref={ArticleRef}
            id="p_article_modal"
            className="content"
            dangerouslySetInnerHTML={{ __html: singleArticle }}
            />
            </StyledPaper>
        );
    }

    //   記事ページのリンク先を取得、onClickでリンク先ページに遷移できるようにバインド
    React.useEffect(() => {
        bindOnclick(getAndShowLinkPage, ArticleRef);
    }, [wpData.articleModal]);
    
    return (
        <StyledDialog
        open={isArticleModalOpen}
        TransitionComponent={Transition}
        onClose={closeArticleModal}
        >
        <StyledHighlightOff onClick={closeArticleModal} />
            <DialogContent>
                <DialogContentText>{(!isLoadingArticleModal) ? content : null}</DialogContentText>
                {/* <DialogContentText>{ isLoadingArticleModal || content || null}</DialogContentText> */}
            </DialogContent>
        </StyledDialog>
    );
};

export const PArticleModal = () => (
    <PArticleModalContainer
        presenter={(props: Props) => <PArticleModalPresenter {...props} />}
    />
);
