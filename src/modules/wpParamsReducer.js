export function wpParamsReducer(state, action) {
switch (action.type) {
  case "HOME":
    return { ...state, currentPage: 1, author: "", tag: "" };
  case "LATEST":
    return { ...state, currentPage: 1 };
  case "PREV":
    return { ...state, currentPage: state.currentPage - 1 };
  case "NEXT":
    return { ...state, currentPage: state.currentPage + 1 };
  case "OLDEST":
    return { ...state, currentPage: action.payload };
  case "NUM":
    return { ...state, currentPage: action.payload };
  case "TAG":
    return { ...state, tag: action.payload, author: "", currentPage: 1 };
  case "AUTHOR":
    return { ...state, author: action.payload, tag: "", currentPage: 1 };
  case "LANG":
    return {
      ...state,
      isJa: !state.isJa,
      currentPage: 1,
      author: "",
      tag: ""
    };

  default:
    console.log("エラーだよ,wpDataReducer");
    return { ...state };
}
}

