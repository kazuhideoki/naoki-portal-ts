import { AppState } from './Store'
import { reducerLogger } from "./reducerLogger";

export type AppStateAction = 
    { type: "OPEN_MODAL", payload: string } |
    { type: "CLOSE_MODAL" } |
    { type: "OPEN_ARTICLE_MODAL" } |
    { type: "CLOSE_ARTICLE_MODAL" }

export function appStateReducer(state: AppState, action: AppStateAction) {
    let newState: AppState
    const func = appStateReducer
switch (action.type) {
    case "OPEN_MODAL":
        newState =  {
        ...state,
        setModal: action.payload,
        isModalOpen: true
    };
        break
    case "CLOSE_MODAL":
        newState =  {
        ...state,
        isModalOpen: false
    };
        break
    case "OPEN_ARTICLE_MODAL":
        newState =  {
        ...state,
        // setArticleModal: action.payload,
        isArticleModalOpen: true
    };
        break
    case "CLOSE_ARTICLE_MODAL":
        newState =  {
        ...state,
        isArticleModalOpen: false
    };
    break
        default:
    console.log("エラーだよ,appStateReducer");
        newState =  { ...state };
}
    reducerLogger({ state, newState, func, action })
    return newState
}
