import { WpParams, WpData, SetTotalPages } from "./Store";
import { SetArticles, SetTags, SetUsers } from "../App";
import { SetSingleArticle } from "../PArticleModal";

export function makeApiParamsPosts(state: WpParams, perPage: number) {
  const per_page = perPage;
  let categories;
  let page;
  let author;
  let tag;

  //  カテゴリーで、37は「インフォ」,24は「info」
  if (state.isJa) {
    categories = 37;
  } else {
    categories = 24;
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

  return "posts" + params;
}
export function makeApiParamsSinglePosts(slug: string) {
    const params = "?slug=" + slug;
    return "posts" + params;
}
export function makeApiParamsTags(perPage: number) {
  const per_page = perPage;
  const params = "?per_page=" + per_page;
  return "tags" + params;
}
export function makeApiParamsUsers(perPage: number) {
  const per_page = perPage;
  const params = "?per_page=" + per_page;
  return "users" + params;
}

export function fetchData(params: string) {
    return fetch(`https://naokihair.com/wp-json/wp/v2/${params}`);
}
type GetTotalPages = (response: any, setTotalPages: SetTotalPages) => void
export function getTotalPages(response: any, setTotalPages: SetTotalPages) {
  const totalPages = Number(response.headers.get("x-wp-totalpages"));
  setTotalPages(totalPages);
}
type WpApiToData = {
    response: any,
    setArticles?: SetArticles | undefined,
    setSingleArticle?: SetSingleArticle,
    setTags?: SetTags,
    setUsers?: SetUsers,
    getTotalPages?: GetTotalPages,
    setTotalPages?: SetTotalPages,
}
export function wpApiToData({
         response,
         setArticles,
         setSingleArticle,
         setTags,
         setUsers,
         getTotalPages,
         setTotalPages
}: WpApiToData) {
         response.then((response: any) => {
             if (getTotalPages && setTotalPages) {
             getTotalPages(response, setTotalPages);
           }
           response
             .json()
             .then((data: any) => {
               const setData =
                 setArticles || setSingleArticle || setTags || setUsers;
                 if (setData) {
                     setData(data);
                 }
               
             })
             .catch((error: any) => {
               console.log("catch errorだよ " + error);
             });
         });
       }
export type SortDataPosts ={
    title: string
    excerpt: string,
    content: string,
    link: string,
    date: string
    authorId: string | number,
    authorName: string | null
    featuredImg: string
}[]
export function sortDataPosts(data: WpData["articles"]) {
    let articles: SortDataPosts = [];
    data.forEach((index: any) => {
        articles.push({
        title: index.title.rendered,
        excerpt: index.excerpt.rendered,
        content: index.content.rendered,
        link: index.link,
        date: index.modified,
        authorId: index.author,
        authorName: null,
        featuredImg: index.jetpack_featured_media_url
        });
    });
    console.log(articles);
    
    return articles;
}



type UserData = {
  authorId: string
  authorName: string  
}
// wpData.articlesのauthorのみをnumberからstringに返る関数
export function setAuthorName(articles: SortDataPosts, wpData: WpData): SortDataPosts {
    // userデータがセットされていないときは機能しないのでarticleをそのまま返す
    if (wpData.users.length == 0) {
        return articles        
    }
    // ユーザーIDと名前の対応表をつくる
    const userData: UserData[] = wpData.users.map((value) => {
        let item: UserData  = {authorId: '', authorName: ''}
        item.authorId = value.id
        item.authorName = value.name
        return item
    })
    // 対応表のuserDataをもとにnameをセット
    const result = articles.map((value, index) => {
        const target = userData.filter(item => value.authorId == item.authorId)
        value.authorName = target[0].authorName
        return value   
    })
    return result
}

export function formatDate(articles: SortDataPosts ) {
    const formatedDateData = articles.map((value, index) => {
        const date = value.date
        const dateObj = new Date(date)
        const day = dateObj.getDate()
        const month = dateObj.getMonth() + 1
        const year = dateObj.getFullYear()
        return {...value, date: `${day}/${month}/${year}`} 
    })
    return formatedDateData
}



export type SortDataTags = {
    tagsJa: {
        name: string
        id: string
    }[],
    tagsEn: {
        name: string
        id: string
    }[]
}
export function sortDataTags(data: WpData["tags"]) {
    let tagsEn: any = [];
    let tagsJa: any = [];
    let result: SortDataTags = { tagsJa, tagsEn }
  data.forEach((index: any) => {
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
    return result
}

export type SortDataUsers = {
    name: string
    id: string
    img: string
}[]
export function sortDataUsers(data: WpData["users"]) {
    let authors: SortDataUsers = []
    data.forEach((index: any) => {
        if (authors) {
            authors.push({
            name: index.name,
            id: index.id,
            img: index.avatar_urls["96"]
            });  
        }
    });
    return authors
}

type GetWpPosts = {
    wpParams: WpParams
    setArticles?: (data: object[]) => void
    setTotalPages?: SetTotalPages
}
// メインのpostの記事取得
export function getWpPosts({ wpParams, setArticles, setTotalPages }: GetWpPosts ) {
         const params = makeApiParamsPosts(wpParams, 6);
         const response = fetchData(params);
         return wpApiToData({
           response,
           setArticles,
           getTotalPages,
           setTotalPages
         });
       }
type GetWpSinglePosts = ({
    slug: string;
    setSingleArticle: SetSingleArticle;
})
// PArticleModalで記事内にあるリンクを取得。記事データもsetSingleArticleで格納
export function getWpSinglePosts({ slug, setSingleArticle }: GetWpSinglePosts) {
         const params = makeApiParamsSinglePosts(slug);
         const response = fetchData(params);
         return wpApiToData({
           response,
           setSingleArticle
         });
       }
// tag取得日英に分けてsetTagsに格納
export function getWpTags(setTags: SetTags) {
         const params = makeApiParamsTags(50);
         const response = fetchData(params);
         return wpApiToData({
           response,
           setTags
         });
       }
// userを取得
export function getWpUsers(setUsers: SetUsers) {
         const params = makeApiParamsUsers(50);
         const response = fetchData(params);
         return wpApiToData({
           response,
           setUsers
         });
       }
    