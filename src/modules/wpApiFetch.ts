import { WpParams, SetTotalPages } from "./Store";
import { SetArticles, SetArticlesImportantEn, SetArticlesImportantJa, SetTags, SetUsers } from "../App";
import { SetSingleArticle } from "../PArticleModal";

export function makeApiParamsPosts(state: WpParams, perPage: number) {
  const per_page = perPage;
  let page;
  let categories;
  let author;
  let tag;

  page = state.currentPage || 1;
  categories = state.categories
  author = state.author || "";
  tag = state.tag || "";

  const params =
    "?per_page=" +
    per_page +
    "&categories=" +
    categories +
    "&categories_exclude=59,61" +
    "&page=" +
    page +
    "&author=" +
    author +
    "&tags=" +
    tag;

    console.log(params);
    

  return "posts" + params;
}
export function makeApiParamsPostsImportantEn(perPage: number) {
    const params = "?per_page=" + perPage + "&categories=" + 59
    return "posts" + params;
}
export function makeApiParamsPostsImportantJa(perPage: number) {
    const params = "?per_page=" + perPage + "&categories=" + 61
    return "posts" + params;
}
export function makeApiParamsSinglePosts(slug: string) {
    const params = "?slug=" + slug;
    return "posts" + params;
}
export function makeApiParamsTags(perPage: number) {
    const params = "?per_page=" + perPage;
    return "tags" + params;
}
export function makeApiParamsUsers(perPage: number) {
    const params = "?per_page=" + perPage;
  return "users" + params;
}

export function fetchData(params: string) {
    console.log(params);
    const response = fetch(`https://naokihair.com/wp-json/wp/v2/${params}`);
    return response
}

type GetTotalPages = (response: any, setTotalPages: SetTotalPages) => void
export function getTotalPages(response: any, setTotalPages: SetTotalPages) {
  const totalPages = Number(response.headers.get("x-wp-totalpages"));
  setTotalPages(totalPages);
}
type WpApiToData = {
    response: any,
    setArticles?: SetArticles | undefined,
    setArticlesImportantEn?: SetArticlesImportantEn,
    setArticlesImportantJa?: SetArticlesImportantJa,
    setSingleArticle?: SetSingleArticle,
    setTags?: SetTags,
    setUsers?: SetUsers,
    getTotalPages?: GetTotalPages,
    setTotalPages?: SetTotalPages,
}
export function wpApiToData({
    response,
    setArticles,
    setArticlesImportantEn,   
    setArticlesImportantJa,   
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
            setArticles || setArticlesImportantEn || setArticlesImportantJa || setSingleArticle || setTags || setUsers
            if (setData) {
                setData(data);
            }
        
        })
        .catch((error: any) => {
        console.log("catch errorだよ " + error);
        });
    });
}

type ResponseToData = {
    response: any,
    getTotalPages?: GetTotalPages,
    setTotalPages?: SetTotalPages,
}

export function responseToData(response: any) {
    try {
        const data = response.json()
        return data
    } catch (error) {
        console.log("catch errorだよ,responseToData " + error);
    }
}
export function responseToTotalPages(response: any) {
    try {
        const totalPages = Number(response.headers.get("x-wp-totalpages"));
        return totalPages
    } catch (error) {
        console.log("catch errorだよ,responseToTotalPages " + error);
    }
    
}

type GetWpPosts = {
    wpParams: WpParams
    setArticles: (data: object[]) => void
    setTotalPages: SetTotalPages
    endLoading: () => void
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
export async function getWpPosts2({ wpParams, setArticles, setTotalPages, endLoading }: GetWpPosts ) {
    const params = makeApiParamsPosts(wpParams, 6);
    const response = await fetchData(params);
    const data = await responseToData(response)
    if (data) {
        setArticles(data)
    }
    const totalPages = responseToTotalPages(response)
    if (totalPages) {
        setTotalPages(totalPages)
    }
    endLoading()

}

export function getWpPostsImportantEn(setArticlesImportantEn: SetArticlesImportantEn) {
    const params = makeApiParamsPostsImportantEn(1);
    const response = fetchData(params);
    wpApiToData({
        response,
        setArticlesImportantEn,
    });
}
export function getWpPostsImportantJa(setArticlesImportantJa: SetArticlesImportantJa) {
    const params = makeApiParamsPostsImportantJa(1);
    const response = fetchData(params);
    wpApiToData({
        response,
        setArticlesImportantJa,
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
