import { WpData } from "./Store";

export type SortDataPosts = {
    title: string
    excerpt: string,
    content: string,
    link: string,
    date: string
    authorId: string | number,
    authorName: string | null
    featuredImg: string
}[]
type datas = WpData["articles"] | WpData["articlesImportantEn"] | WpData["articlesImportantJa"]

export function sortDataPosts(data: datas) {
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
        let item: UserData = { authorId: '', authorName: '' }
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

export function formatDate(articles: SortDataPosts) {
    const formatedDateData = articles.map((value, index) => {
        const date = value.date
        const dateObj = new Date(date)
        const day = dateObj.getDate()
        const month = dateObj.getMonth() + 1
        const year = dateObj.getFullYear()
        return { ...value, date: `${day}/${month}/${year}` }
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