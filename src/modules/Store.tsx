import React, { useReducer, useState } from "react";
import { WpParamsAction, wpParamsReducer } from "./wpParamsReducer";
import { WpDataAction, wpDataReducer } from "./wpDataReducer";
import { AppStateAction, appStateReducer } from "./appStateReducer";



const initParams: WpParams = {
    currentPage: 1,
    author: '',
    tag: '',
    isJa: false,
};
export type WpParams = {
    // currentPage: number | null,
    currentPage: number,
    author: number | string | null,
    tag: number | string | null,
    isJa: boolean,
}

const initWpData: WpData = {
  articles: [],
  articleModal: [],
  tags: [],
  users: []
};
// export type WpData = typeof initWpData
export type WpData = {
    articles: any[],
    articleModal: any[],
    tags: any[],
    users: any[]
};

const initAppState = {
    setModal: 'magazines',
    isModalOpen: false,
    isArticleModalOpen: false,
}
export type AppState = typeof initAppState

export type DispatchWpParams = React.Dispatch<WpParamsAction>
export type DispatchWpData = React.Dispatch < WpDataAction >
export type DispatchAppState = React.Dispatch < AppStateAction >
export type SetTotalPages = React.Dispatch < React.SetStateAction < number >>

export type ContextProps = {
    wpParams: WpParams
    dispatchWpParams: DispatchWpParams
    wpData: WpData
    dispatchWpData: DispatchWpData
    appState: AppState
    dispatchAppState: DispatchAppState
    totalPages: number
    setTotalPages: SetTotalPages
}
const Store = React.createContext({} as ContextProps);

const StoreContextProvider = ({children}: any) => {
    const [wpParams, dispatchWpParams] = useReducer(wpParamsReducer, initParams);
    const [wpData, dispatchWpData] = useReducer(wpDataReducer, initWpData);
    const [appState, dispatchAppState] = useReducer(
      appStateReducer,
      initAppState
    );
    // トータルページ数を取得、paginationに利用
    const [totalPages, setTotalPages] = useState(1)

    const values = {
      wpParams,
      dispatchWpParams,
      wpData,
      dispatchWpData,
      appState,
      dispatchAppState,
      totalPages,
      setTotalPages,
    };

    return (
      <Store.Provider value={ values }>
        {children}
      </Store.Provider>
    );

}

export { Store, StoreContextProvider };
