import React from 'react'
import { Store } from './modules/Store';
import { getWpSinglePosts } from "./modules/wpApiFetch";
import { sortDataPosts } from "./modules/organizeData";
import { modifyAtags } from "./modules/modifyAtags";
import { TransitionProps } from '@material-ui/core/transitions';
import {
  Paper,
  Dialog,
  DialogContent,
  DialogContentText,
  Slide,
  withStyles
} from "@material-ui/core";
import { HighlightOff, ImportExport } from "@material-ui/icons";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledDialog = withStyles({
  paper: {
    maxWidth: '100%',
    width: '90vw',
    height: '90vh',
    // padding: 30
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
    const getAndShowLinkPage = (slug: string) =>{
      getWpSinglePosts({ slug, setSingleArticle });
    }

        

    const props = {
      articleModal,
      isArticleModalOpen,
      closeArticleModal,
      getAndShowLinkPage
    };
     
    return presenter(props);
}
const PArticleModalPresenter = ({
    articleModal,
  isArticleModalOpen,
  closeArticleModal,
  getAndShowLinkPage,
}: Props) => {
  let singleArticle;
  let content;
  if (articleModal.length) {
//   if (articleModal) {
    const article = articleModal[0];
    singleArticle = "<h1>" + article.title + "</h1>" + article.content;

    content = (
      <Paper>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: singleArticle }}
        />
      </Paper>
    );
  }

  //   記事ページのリンク先を取得、onClickでリンク先ページに遷移できるようにバインド
  React.useEffect(() => {
    modifyAtags(getAndShowLinkPage);
  });

  return (
    <StyledDialog
      open={isArticleModalOpen}
      TransitionComponent={Transition}
      onClose={closeArticleModal}
    >
      <StyledHighlightOff onClick={closeArticleModal} />
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    </StyledDialog>
  );
};

export const PArticleModal = () => (
  <PArticleModalContainer
        presenter={(props: Props) => <PArticleModalPresenter {...props} />}
  />
);
