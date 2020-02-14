export function makeApiParamsPosts(state, perPage) {
  const per_page = perPage;
  let categories;
  let page;
  let author;
  let tag;

  //  カテゴリーで、35は「ニュース」20は「news」
  if (state.isJa) {
    categories = 35;
  } else {
    categories = 20;
  }

  page = state.currentPage || 1;
  author = state.author || "";
  tag = state.tag || "";

  const params =
    "?per_page=" +
    per_page +
    "&categories=" +
    categories +
    "&page=" +
    page +
    "&author=" +
    author +
    "&tags=" +
    tag;

  console.log(params);
  return "posts" + params;
}
export function makeApiParamsSeinglePosts(slug) {
    const params = "?slug=" + slug;
    return "posts" + params;
}
export function makeApiParamsTags(perPage) {
  const per_page = perPage;
  const params = "?per_page=" + per_page;
  return "tags" + params;
}
export function makeApiParamsUsers(perPage) {
  const per_page = perPage;
  const params = "?per_page=" + per_page;
  return "users" + params;
}

export function fetchData(params) {
    return fetch(`https://naokihair.com/wp-json/wp/v2/${params}`);
}

export function getTotalPages(response, setTotalPages) {
  const totalPages = Number(response.headers.get("x-wp-totalpages"));
  setTotalPages(totalPages);
}
export function wpApiToData({
         response,
         setArticles,
         setSingleArticle,
         setTags,
         setUsers,
         getTotalPages,
         setTotalPages
       }) {
         response.then(response => {
           if (getTotalPages) {
             getTotalPages(response, setTotalPages);
           }
           response
             .json()
             .then(data => {
               const setData =
                 setArticles || setSingleArticle || setTags || setUsers;
                 console.log(data);
                 
               setData(data);
             })
             .catch(error => {
               console.log("catch errorだよ " + error);
             });
         });
       }
export function sortDataPosts(data) {
    console.log(data);
    
  let articles = [];
  data.forEach(index => {
    articles.push({
      title: index.title.rendered,
      excerpt: index.excerpt.rendered,
      content: index.content.rendered,
      link: index.link,
      featuredImg: index.jetpack_featured_media_url
    });
  });
  return articles;
}
export function sortDataTags(data) {
  let tagsEn = [];
  let tagsJa = [];
  data.forEach(index => {
    if (index.link.indexOf(/ja/) !== -1) {
      tagsJa.push({
        name: index.name,
        id: index.id
      });
    } else {
      tagsEn.push({
        name: index.name,
        id: index.id
      });
    }
  });
  return { tagsJa, tagsEn };
}
export function sortDataUsers(data) {
    let authors = [];
    data.forEach(index => {
      authors.push({
        name: index.name,
        id: index.id,
        img: index.avatar_urls["96"]
      });
    });
    return authors
}

// メインのpostの記事取得
export function getWpPosts({ wpParams, setArticles, setTotalPages }) {
         const params = makeApiParamsPosts(wpParams, 6);
         const response = fetchData(params);
         console.log("getWpPostsだよ");

         return wpApiToData({
           response,
           setArticles,
           getTotalPages,
           setTotalPages
         });
       }
// PArticleModalで記事内にあるリンクを取得。記事データもsetSingleArticleで格納
export function getWpSinglePosts({ slug, setSingleArticle }) {
         const params = makeApiParamsSeinglePosts(slug);
         const response = fetchData(params);
         console.log("getWpSinglePostsだよ");

         return wpApiToData({
           response,
           setSingleArticle
         });
       }
// tag取得日英に分けてsetTagsに格納
export function getWpTags({setTags}) {
         const params = makeApiParamsTags(50);
         const response = fetchData(params);
         console.log("getWpTagsだよ");

         return wpApiToData({
           response,
           setTags
         });
       }
// userを取得
export function getWpUsers({setUsers}) {
         const params = makeApiParamsUsers(50);
         const response = fetchData(params);
         console.log("getWpUsersだよ");

         return wpApiToData({
           response,
           setUsers
         });
       }