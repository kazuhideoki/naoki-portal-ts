
export function fetchSinglePost(articles, setArticles, slug) {
         const params = "?slug=" + slug;

         console.log(params);
         fetch(`https://naokihair.com/wp-json/wp/v2/posts${params}`).then(
           function(response) {
             response
               .json()
               .then(data => {
                 console.log(data);
                 let allArticles = [];
                allArticles.push(...articles)

                 data.forEach(index => {
                   allArticles.push({
                     title: index.title.rendered,
                     excerpt: index.excerpt.rendered,
                     content: index.content.rendered,
                     link: index.link,
                     featuredImg: index.jetpack_featured_media_url
                   });
                 });
                 console.log(allArticles);
                 setArticles(allArticles);
               })
               .catch(error => {
                 console.log("catch errorだよ " + error);
               });
           }
         );
       }
