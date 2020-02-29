import { GetAndShowLinkPage } from "../PArticleModal";

export const bindOnclick = (getAndShowLinkPage: GetAndShowLinkPage, ref:any) => {    
    // setTimeoutをしないと何故かbindできないので
    setTimeout(() => {
        let atags
        console.log(ref);
        if (ref.current) {
            atags = ref.current.getElementsByTagName("a"); 
        }
        console.log(atags);
        
        if(atags) {
            Array.prototype.forEach.call(atags, element => {
                const href = element.getAttribute("href");
    
                // fetchに必要なslugの部分だけ抽出
                let cutHref = href ? href.match(/(?<=naokihair\.com\/).+/) : null;
                // スラッシュや日本語の「ja」などを取り除く
                let slug = cutHref ? cutHref.toString().replace(/\/|ja\//, "") : null;

                if (slug) {
                    console.log(slug);
                    element.onclick = () => getAndShowLinkPage(slug);
                    element.removeAttribute("href");
                } else {
                    console.log("slugじゃない");
                    element.onclick = () => alert("有効なページではありません");
                    element.removeAttribute("href");
                }
            });
        }
    }, 1);
};
