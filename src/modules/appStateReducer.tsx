import { AppState } from './Store'

export type AppStateAction = 
    { type: "OPEN_MODAL", payload: string } |
    { type: "CLOSE_MODAL" } |
    { type: "OPEN_ARTICLE_MODAL" } |
    { type: "CLOSE_ARTICLE_MODAL" }

export function appStateReducer(state: AppState, action: AppStateAction) {
  switch (action.type) {
    case "OPEN_MODAL":
    return {
        ...state,
        setModal: action.payload,
        isModalOpen: true
    };
    case "CLOSE_MODAL":
    return {
        ...state,
        isModalOpen: false
    };
    case "OPEN_ARTICLE_MODAL":
    return {
        ...state,
        // setArticleModal: action.payload,
        isArticleModalOpen: true
    };
    case "CLOSE_ARTICLE_MODAL":
    return {
        ...state,
        isArticleModalOpen: false
    };
        default:
      console.log("エラーだよ,appStateReducer");
      return { ...state };
  }
}
