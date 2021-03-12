import { WpParams, SetTotalPages } from "./Store";
import {
  SetArticlesImportantEn,
  SetArticlesImportantJa,
  SetTags,
  SetUsers,
} from "../App";
import { SetSingleArticle } from "../PArticleModal";

export function makeApiParamsPosts(state: WpParams, perPage: number) {
  const per_page = perPage;
  let page;
  let categories;
  let author;
  let tag;

  page = state.currentPage || 1;
  categories = state.categories;
  author = state.author || "";
  tag = tag ? "&tags=" + state.tag : "";

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
    tag;

  return "posts" + params;
}
export function makeApiParamsPostsImportantEn(perPage: number) {
  const params = "?per_page=" + perPage + "&categories=" + 59;
  return "posts" + params;
}
export function makeApiParamsPostsImportantJa(perPage: number) {
  const params = "?per_page=" + perPage + "&categories=" + 61;
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
  const query = `https://naokihair.com/wp-json/wp/v2/${params}`;
  console.log(`★★★queryは ${query}`);

  const response = fetch(query);
  return response;
}

export function responseToData(response: any) {
  try {
    const data = response.json();
    return data;
  } catch (error) {
    console.log("catch errorだよ, responseToData " + error);
  }
}
export function responseToTotalPages(response: any) {
  try {
    const totalPages = Number(response.headers.get("x-wp-totalpages"));
    return totalPages;
  } catch (error) {
    console.log("catch errorだよ,responseToTotalPages " + error);
  }
}

type GetWpPosts = {
  wpParams: WpParams;
  setArticles: (data: object[]) => void;
  setTotalPages: SetTotalPages;
  endLoading?: () => void;
};
// メインのpostの記事取得
export async function getWpPosts({
  wpParams,
  setArticles,
  setTotalPages,
  endLoading,
}: GetWpPosts) {
  const params = makeApiParamsPosts(wpParams, 6);
  const response = await fetchData(params);
  const data = await responseToData(response);

  if (data) {
    setArticles(data);
  }
  const totalPages = responseToTotalPages(response);
  if (totalPages) {
    setTotalPages(totalPages);
  }
  if (endLoading) {
    endLoading();
  }
}

type GetWpPostsImportant = {
  setArticlesImportantEn: SetArticlesImportantEn;
  setArticlesImportantJa: SetArticlesImportantJa;
};
// Importantの記事を日英ともに取得
export async function getWpPostsImportant({
  setArticlesImportantEn,
  setArticlesImportantJa,
}: GetWpPostsImportant) {
  const paramsEn = makeApiParamsPostsImportantEn(1);
  const responseEn = await fetchData(paramsEn);
  const dataEn = await responseToData(responseEn);
  if (dataEn) {
    setArticlesImportantEn(dataEn);
  }
  const paramsJa = makeApiParamsPostsImportantJa(1);
  const responseJa = await fetchData(paramsJa);
  const dataJa = await responseToData(responseJa);
  if (dataJa) {
    setArticlesImportantJa(dataJa);
  }
}

type GetWpSinglePosts = {
  slug: string;
  setSingleArticle: SetSingleArticle;
  articleModalData: any[];
};
// PArticleModalで記事内にあるリンクを取得。記事データもsetSingleArticleで格納
export async function getWpSinglePosts({
  slug,
  setSingleArticle,
  articleModalData,
}: GetWpSinglePosts) {
  const params = makeApiParamsSinglePosts(slug);
  const response = await fetchData(params);
  const data = await responseToData(response);
  console.log(data);
  if (data.length) {
    setSingleArticle(data);
  } else {
    // 固定ページや外部のリンクで有効なページがfetchできなかった場合でもPArticleModalのuseEffectを作動させるために値渡しでcloneを作ってsetSingleArticleし直す
    const clone = Array.from(articleModalData);
    setSingleArticle(clone);
    alert("Portalで表示できないリンク先です。");
  }
}

// tag取得日英に分けてsetTagsに格納
export async function getWpTags(setTags: SetTags) {
  const params = makeApiParamsTags(50);
  const response = await fetchData(params);
  const data = await responseToData(response);
  if (data) {
    setTags(data);
  }
}
// userを取得
export async function getWpUsers(setUsers: SetUsers) {
  const params = makeApiParamsUsers(50);
  const response = await fetchData(params);
  const data = await responseToData(response);
  if (data) {
    setUsers(data);
  }
}
