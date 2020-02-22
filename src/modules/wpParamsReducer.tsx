import { WpParams } from './Store'
import { reducerLogger } from "./reducerLogger";
export type MainHome = { type: "MAINHOME"}
export type Latest = { type: "LATEST" }
export type Prev ={ type: "PREV" } 
export type Next = { type: "NEXT" } 
export type Oldest = { type: "OLDEST", payload: number } 
export type Num = { type: "NUM", payload: number } 
export type Tag = { type: "TAG", payload: string } 
export type Author = { type: "AUTHOR", payload: string } 
export type Lang = { type: "LANG" }
export type Insta = { type: "INSTA" }

export type WpParamsAction = MainHome | Latest | Prev | Next | Oldest | Num | Tag | Author | Lang | Insta



export function wpParamsReducer(state: WpParams, action: WpParamsAction) {
    let newState: WpParams
    //  カテゴリーで、37は「インフォ」,24は「info」, 187はinstagram
    let categories
    const func = wpParamsReducer
    switch (action.type) {
    case "MAINHOME":
            // 言語に沿ってcategoriesを設定
            categories = state.isJa ? 37 : 24
            newState = { ...state, currentPage: 1, author: null, tag: null, categories: categories }
            break
    case "LATEST":
            newState = { ...state, currentPage: 1,}
            break
    case "PREV":
        const n = Number(state.currentPage)
            newState = { ...state, currentPage: n - 1};
            break
    case "NEXT": 
        const m = Number(state.currentPage)
            newState = { ...state, currentPage: m + 1};
            break
    case "OLDEST":
            newState = { ...state, currentPage: action.payload };
            break
    case "NUM":
            newState = { ...state, currentPage: action.payload };
            break
    case "TAG":
            // 言語に沿ってcategoriesを設定
            categories = state.isJa ? 37 : 24
            newState = { ...state, tag: action.payload, author: null, currentPage: 1, categories: categories };
            break
    case "AUTHOR":
            // 言語に沿ってcategoriesを設定
            categories = state.isJa ? 37 : 24
            newState = { ...state, author: action.payload, tag: null, currentPage: 1, categories: categories };
        break
    case "LANG":
            // Instaを表示させているときはcategoriesを維持。それ以外では言語に沿ってcategoriesを設定
        if (state.categories === 187){
            categories = 187
        }else{
            categories = state.isJa ? 24 : 37
        }
        newState = {
            ...state,
            isJa: !state.isJa,
            currentPage: 1,
            categories: categories,
            author: null,
            tag: null
        };
        break
    case "INSTA":
            newState = {
                ...state,
                currentPage: 1,
                categories: 187,
                author: null,
                tag: null 
            };
        break
        

    default:
        console.log("エラーだよ,wpDataReducer");
        newState = { ...state };
}
    reducerLogger({ state, newState, func, action })
    return newState
}

