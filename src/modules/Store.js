import React, { useReducer, useState } from "react";
import { wpParamsReducer } from "./wpParamsReducer";
import { wpDataReducer } from "./wpDataReducer";
import { appStateReducer } from "./appStateReducer";

const initParams = {
    currentPage: 1,
    author: "",
    tag: "",
    isJa: false,
};

const initWpData = {
  articles: [],
  articleModal: [],
  tags: [],
  users: []
};

const initAppState = {
    setModal: 'magazines',
    isModalOpen: false,
    // setArticleModal: 0,
    isArticleModalOpen: false,
}

const Store = React.createContext();

const StoreContextProvider = ({children}) => {
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
