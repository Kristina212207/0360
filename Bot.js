// ==UserScript==
// @name         My New B_Bot
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Kristina Stalidzans
// @match        https://www.bing.com/*
// @match        https://napli.ru/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

let links = document.links;
let search = document.getElementsByName("search")[0];
let keywords = ["10 самых популярных шрифтов от Google",
                "Отключение редакций и ревизий в WordPress",
                "Вывод произвольных типов записей и полей в WordPress",
                "Взаимодействие PHP и MySQL", "сервис от Mario Rantfl",
                "Как использовать DevTools браузера"];
let keyword = keywords[getRandom(0, keywords.length)];

let bingInput = document.getElementsByName("q")[0];

//Работаем на главной странице
if (search != undefined) {
  let i = 0;
  let timerId = setInterval(function() {
    bingInput.value += keyword[i];
    i++;
    if (i == keyword.length) {
      clearInterval(timerId);
      search.click();
    }
  }, 950);
  //Работаем на целевом сайте, случайным образом уходим обратно в поиск
} else if (location.hostname == "napli.ru") {
  setInterval(()=>{
    let index = getRandom(0, links.length);
    if (getRandom(0, 101) >= 70) {
      location.href = "https://www.bing.com/";
    }
    if (links[index].href.indexOf("napli.ru") != -1) links[index].click();
  }, getRandom(3000, 5000));
  //Работаем на странице поисковой выдачи, ищем целевой сайт
} else {
  let nextBingPage = true;
  for(let i = 0; i < links.length; i++) {
    if (links[i].href.indexOf("napli.ru") != -1) {
      let link = links[i];
      nextBingPage = false;
      console.log("Нашел строку " + link);

      setTimeout(()=> {
        link.click();
      }, getRandom(2500, 4000));

      break;
    }
  }
  //Проверяем, что кнопка следующая страница существует и если да, то проверяем, что она 7-я
  let buttonExist = setInterval(()=>{
    let element = document.querySelector(".sb_pagS");
    if (element != null) {
      if (document.querySelector(".sb_pagS").innerText == "7") {
        nextBingPage = false;
        location.href = "https://www.bing.com/";
      }
      clearInterval(buttonExist);
    }
  }, 100);

  //Клик на кнопку следующей страницы
  if (nextBingPage) {
    setTimeout(()=>{
      //Есть ID кнопки у поисковика
      document.getElementsByClassName("sw_next")[0].click();
    }, getRandom(3000, 5500));

  }
}

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
