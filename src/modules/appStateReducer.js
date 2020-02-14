const initAppState = {
  setModal: "magazines",
  isModalOpen: false,
//   setArticleModal: 0,
  isArticleModalOpen: false
};

export function appStateReducer(state, action) {
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
