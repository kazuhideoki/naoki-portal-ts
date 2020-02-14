import { WpData } from './Store'

export type WpDataAction = 
    { type: "SET_ARTICLES"; payload: object[]} |
    { type: "SET_SINGLE_ARTICLE"; payload: object[]} |
    { type: "SET_TAGS"; payload: object[]} |
    { type: "SET_USERS"; payload: object[]} 

export function wpDataReducer(state: WpData, action: WpDataAction) {
         switch (action.type) {
           case "SET_ARTICLES":
                console.log("SET_ARTICLES " + state.articles);       
             return { ...state, articles: action.payload }
           case "SET_SINGLE_ARTICLE":
               console.log("SET_SINGLE_ARTICLE" + action.payload);
             return { ...state, articleModal: action.payload };
           case "SET_TAGS":
             return { ...state, tags: action.payload };
           case "SET_USERS":
             return { ...state, users: action.payload };

           default:
               console.log("エラーだよ,wpDataReducer");
             return { ...state }
         }
       }
