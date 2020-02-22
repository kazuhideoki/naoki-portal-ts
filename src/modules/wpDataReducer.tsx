import { WpData } from './Store'
import { reducerLogger } from "./reducerLogger";

export type WpDataAction =  
    { type: "SET_ARTICLES"; payload: any[] } |
    { type: "SET_ARTICLES_IMPORTANT_EN"; payload: any[] } |
    { type: "SET_ARTICLES_IMPORTANT_JA"; payload: any[] } |
    { type: "SET_SINGLE_ARTICLE"; payload: any[]} |
    { type: "SET_TAGS"; payload: any[]} |
    { type: "SET_USERS"; payload: any[]} 

export function wpDataReducer(state: WpData, action: WpDataAction) {
    let newState: WpData
    const func = wpDataReducer
        switch (action.type) {
        case "SET_ARTICLES":
                newState = { ...state, articles: action.payload }
                break 
        case "SET_ARTICLES_IMPORTANT_EN":
                newState = { ...state, articlesImportantEn: action.payload }
                break
        case "SET_ARTICLES_IMPORTANT_JA":
                newState = { ...state, articlesImportantJa: action.payload }
                break
        case "SET_SINGLE_ARTICLE":
                newState = { ...state, articleModal: action.payload };
                break
        case "SET_TAGS":
                newState = { ...state, tags: action.payload };
                break
        case "SET_USERS":
                newState = { ...state, users: action.payload };
                break
        default:
            console.log("エラーだよ,wpDataReducer");
                newState = { ...state }
        }
    reducerLogger({ state, newState, func, action})
    return newState
    }
