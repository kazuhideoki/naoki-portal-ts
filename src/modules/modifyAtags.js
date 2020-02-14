export const modifyAtags = getAndShowLinkPage => {
         setTimeout(() => {
           let atags = document.getElementsByTagName("a");

           Array.prototype.forEach.call(atags, element => {
             const href = element.getAttribute("href");

             let cutHref = href ? href.match(/(?<=naokihair\.com\/).+/) : null;
             const slug = cutHref ? cutHref.toString().replace(/\//, "") : null;

             if (slug) {
               console.log(slug);
               element.onclick = () => getAndShowLinkPage(slug);
               element.removeAttribute("href");
             } else {
               element.onclick = () => alert("slug はundifined");
               element.removeAttribute("href");
             }
           });
         }, 400);
       };
