import React, { useReducer, useState } from "react";
import { WpParamsAction, wpParamsReducer } from "./wpParamsReducer";
import { WpDataAction, wpDataReducer } from "./wpDataReducer";
import { AppStateAction, appStateReducer } from "./appStateReducer";



const initParams: WpParams = {
    currentPage: 1,
    author: 1,
    tag: 1,
    isJa: false,
};
export type WpParams = {
    currentPage: number | null,
    author: number | null,
    tag: number | null,
    isJa: boolean,
}

const initWpData: WpData = {
  articles: [],
  articleModal: [],
  tags: [],
  users: []
};
export type WpData = {
    articles: object[]
    articleModal: object[]
    tags: object[]
    users: object[]
}


const initAppState: AppState = {
    setModal: 'magazines',
    isModalOpen: false,
    isArticleModalOpen: false,
}
export type AppState = {
    setModal: string
    isModalOpen: boolean,
    isArticleModalOpen: boolean,
}

export type ContextProps = {
    wpParams: WpParams
    dispatchWpParams: React.Dispatch<WpParamsAction>
    wpData: WpData
    dispatchWpData: React.Dispatch<WpDataAction>
    appState: AppState
    dispatchAppState: React.Dispatch<AppStateAction>
    totalPages: number
    setTotalPages: React.Dispatch<React.SetStateAction<number>>
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
