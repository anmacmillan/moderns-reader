"use strict";
async function installStarterLibrary(){
  if(localStorage.getItem("moderns_public_domain_v1")==="done")return;
  for(const item of window.PUBLIC_DOMAIN_BOOKS||[]){
    try{
      if((await all()).some(book=>book.title===item.title&&book.author===item.author))continue;
      const response=await fetch(item.file),blob=await response.blob(),file=new File([blob],item.title+".epub",{type:"application/epub+zip"});
      const book=await parse(file);book.title=item.title;book.author=item.author;book.language=item.language;book.source=item.source;await put(book);
    }catch(error){console.error("Starter book import failed:",item.title,error);return}
  }
  localStorage.setItem("moderns_public_domain_v1","done");await renderLibrary();
}
addEventListener("load",()=>setTimeout(installStarterLibrary,500));
