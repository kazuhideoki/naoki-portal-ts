import { WpParams } from './Store'

export type WpParamsAction = |
    { type: "HOME" } |
    { type: "LATEST" } |
    { type: "PREV" } |
    { type: "NEXT" } |
    { type: "OLDEST", payload: number | null } |
    { type: "NUM", payload: number | null } |
    { type: "TAG", payload: number | null } |
    { type: "AUTHOR", payload: number | null } |
    { type: "LANG" }



export function wpParamsReducer(state: WpParams, action: WpParamsAction) {
    switch (action.type) {
    case "HOME":
        return { ...state, currentPage: 1, author: null, tag: null };
    case "LATEST":
        return { ...state, currentPage: 1 };
    case "PREV":
        const n = Number(state.currentPage)
        return { ...state, currentPage: n - 1 };
    case "NEXT":
        const m = Number(state.currentPage)
        return { ...state, currentPage: m + 1 };
    case "OLDEST":
        return { ...state, currentPage: action.payload };
    case "NUM":
        return { ...state, currentPage: action.payload };
    case "TAG":
        return { ...state, tag: action.payload, author: null, currentPage: 1 };
    case "AUTHOR":
        return { ...state, author: action.payload, tag: null, currentPage: 1 };
    case "LANG":
        return {
            ...state,
            isJa: !state.isJa,
            currentPage: 1,
            author: null,
            tag: null
        };

    default:
        console.log("エラーだよ,wpDataReducer");
        return { ...state };
}
}

