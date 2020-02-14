const initWpData = {
  articles: [],
  articleModal: [],
  tags: [],
  users: []
};
export function wpDataReducer(state, action) {
         switch (action.type) {
           case "SET_ARTICLES":
                console.log("SET_ARTICLES " + state.articles);       
             return { ...state, articles: action.payload }
           case "SET_SINGLE_ARTICLE":
            //    let articleModal = []
            //    articleModal.push(state.articles[action.payload])
               console.log("SET_SINGLE_ARTICLE" + action.payload);
            //    payloadは直接dataを渡すようにする
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
