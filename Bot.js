     // ==UserScript==
// @name         My New BingBotHTMLbook
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kristina Stalidzans
// @match        https://www.bing.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let search = document.getElementsByName("search")[0];
let keywords = ["Коды языков", "Атрибут autoplay", "Событие onclick"];
let keyword = keywords[getRandom(0, keywords.length)];

if (search != undefined) {
  document.getElementsByName("q")[0].value = keyword;
  search.click();
} else {
  for(let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("htmlbook.ru") != -1) {
      let link = links[i];
      console.log("Нашел строку " + link);
      link.click();
      break;
    }
  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
