/*! For license information please see main.js.LICENSE.txt */
(()=>{var __webpack_modules__={"./node_modules/lozad/dist/lozad.min.js":function(module){eval('/*! lozad.js - v1.16.0 - 2020-09-06\n* https://github.com/ApoorvSaxena/lozad.js\n* Copyright (c) 2020 Apoorv Saxena; Licensed MIT */\n!function(t,e){ true?module.exports=e():0}(this,function(){"use strict";\n/**\n   * Detect IE browser\n   * @const {boolean}\n   * @private\n   */var g="undefined"!=typeof document&&document.documentMode,f={rootMargin:"0px",threshold:0,load:function(t){if("picture"===t.nodeName.toLowerCase()){var e=t.querySelector("img"),r=!1;null===e&&(e=document.createElement("img"),r=!0),g&&t.getAttribute("data-iesrc")&&(e.src=t.getAttribute("data-iesrc")),t.getAttribute("data-alt")&&(e.alt=t.getAttribute("data-alt")),r&&t.append(e)}if("video"===t.nodeName.toLowerCase()&&!t.getAttribute("data-src")&&t.children){for(var a=t.children,o=void 0,i=0;i<=a.length-1;i++)(o=a[i].getAttribute("data-src"))&&(a[i].src=o);t.load()}t.getAttribute("data-poster")&&(t.poster=t.getAttribute("data-poster")),t.getAttribute("data-src")&&(t.src=t.getAttribute("data-src")),t.getAttribute("data-srcset")&&t.setAttribute("srcset",t.getAttribute("data-srcset"));var n=",";if(t.getAttribute("data-background-delimiter")&&(n=t.getAttribute("data-background-delimiter")),t.getAttribute("data-background-image"))t.style.backgroundImage="url(\'"+t.getAttribute("data-background-image").split(n).join("\'),url(\'")+"\')";else if(t.getAttribute("data-background-image-set")){var d=t.getAttribute("data-background-image-set").split(n),u=d[0].substr(0,d[0].indexOf(" "))||d[0];// Substring before ... 1x\nu=-1===u.indexOf("url(")?"url("+u+")":u,1===d.length?t.style.backgroundImage=u:t.setAttribute("style",(t.getAttribute("style")||"")+"background-image: "+u+"; background-image: -webkit-image-set("+d+"); background-image: image-set("+d+")")}t.getAttribute("data-toggle-class")&&t.classList.toggle(t.getAttribute("data-toggle-class"))},loaded:function(){}};function A(t){t.setAttribute("data-loaded",!0)}var m=function(t){return"true"===t.getAttribute("data-loaded")},v=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:document;return t instanceof Element?[t]:t instanceof NodeList?t:e.querySelectorAll(t)};return function(){var r,a,o=0<arguments.length&&void 0!==arguments[0]?arguments[0]:".lozad",t=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},e=Object.assign({},f,t),i=e.root,n=e.rootMargin,d=e.threshold,u=e.load,g=e.loaded,s=void 0;"undefined"!=typeof window&&window.IntersectionObserver&&(s=new IntersectionObserver((r=u,a=g,function(t,e){t.forEach(function(t){(0<t.intersectionRatio||t.isIntersecting)&&(e.unobserve(t.target),m(t.target)||(r(t.target),A(t.target),a(t.target)))})}),{root:i,rootMargin:n,threshold:d}));for(var c,l=v(o,i),b=0;b<l.length;b++)(c=l[b]).getAttribute("data-placeholder-background")&&(c.style.background=c.getAttribute("data-placeholder-background"));return{observe:function(){for(var t=v(o,i),e=0;e<t.length;e++)m(t[e])||(s?s.observe(t[e]):(u(t[e]),A(t[e]),g(t[e])))},triggerLoad:function(t){m(t)||(u(t),A(t),g(t))},observer:s}}});\n\n\n//# sourceURL=webpack://my-bookshop/./node_modules/lozad/dist/lozad.min.js?')},"./src/style/index.scss":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://my-bookshop/./src/style/index.scss?")},"./src/index.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_index_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/index.scss */ "./src/style/index.scss");\n/* harmony import */ var _js_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slider */ "./src/js/slider.js");\n/* harmony import */ var _js_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/cards */ "./src/js/cards.js");\n\n\n\n\n\n//# sourceURL=webpack://my-bookshop/./src/index.js?')},"./src/js/cards.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Cards: () => (/* binding */ Cards)\n/* harmony export */ });\n/* harmony import */ var _categories__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./categories */ "./src/js/categories.js");\n/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lozad */ "./node_modules/lozad/dist/lozad.min.js");\n/* harmony import */ var lozad__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lozad__WEBPACK_IMPORTED_MODULE_1__);\n\n //ленивая загрузка с помощью библиотеки JS\nconst observer = lozad__WEBPACK_IMPORTED_MODULE_1___default()();\n\nclass Cards extends _categories__WEBPACK_IMPORTED_MODULE_0__["default"] {\n  constructor() {\n    super();\n    this.placeholder = "../img/placeholder.png";\n    this.buttonLoad = document.querySelector(".floor_btn");\n    this.shopBag = document.querySelector(".header__shopbag-counter");\n    this.quantityBooks = localStorage.length;\n  }\n\n  // стартовая функция\n  addCards() {\n    this.startRequest();\n    this.booksCategoriesLink();\n    this.loadMore();\n    this.shopBagActive();\n  }\n\n   async startRequest() {\n    this.result = await this.request();\n    this.createCards(this.result.items);\n  }\n\n  //создаем карточку книги\n  createCards(booksArr) {\n    if (!booksArr) return;\n\n    booksArr.forEach((element, index) => {\n      let book = element;\n      let idBook = book.id;\n      let image = book.volumeInfo.imageLinks?.thumbnail;\n      let author = book.volumeInfo.authors;\n      let title = book.volumeInfo.title;\n      let raiting = book.volumeInfo.averageRating;\n      let raitingCount = book.volumeInfo.ratingsCount;\n      let description = book.volumeInfo.description?.slice(0, 76);\n      let price = book.saleInfo.retailPrice;\n      let priceN = `${price?.amount ? price.amount : ""} ${\n        price?.currencyCode ? price.currencyCode : ""\n      }`;\n      let flagButton = false;\n\n      //проверка есть-ли книга в корзине\n      for (let i = 0; i < localStorage.length; i++) {\n        if (localStorage.key(i) === idBook) {\n          flagButton = true;\n        }\n      }\n\n      //отображение звездочек рейтинга\n      let raitingStarActive = "";\n      if (raiting) {\n        for (let i = 0; i < raiting; i++) {\n          let starActive = `<img class="raiting-star_active" src="../img/Star_a.svg" alt="звезда" />`;\n          raitingStarActive += starActive;\n        }\n      }\n      let raitingStarNoActive = "";\n      for (let i = 0; i < 5; i++) {\n        let starNoActive = `<img src="../img/Star.svg" alt="звезда" />`;\n        raitingStarNoActive += starNoActive;\n      }\n\n      // создание html карточки книги\n      let newCard = `\n  <div class="cards__card" id=\'${idBook}\' attr = "${\n        flagButton === true ? "buy" : "not-buy"\n      }">\n      <img  data-src="${\n        image ? image : this.placeholder\n      }" class="lozad cards__card__img" src="${\n        image ? image : this.placeholder\n      }" alt="обложка">\n      <div class="cards__card__info">\n        <div>\n          <p class="cards__card__info_author">${author ? author : ""}</p>\n          <h2 class="cards__card__info_title">${title}</h2>\n          <div class="cards__card__info_raiting">\n              <div class="cards__card__info_raiting-star">\n                  ${raiting ? raitingStarNoActive + raitingStarActive : ""}\n              </div>\n          <p class="cards__card__info_raiting-text">${\n            raitingCount ? raitingCount + " review" : ""\n          }</p>\n          </div>\n          <p class="cards__card__info_description">${\n            description === undefined ? "" : description + "..."\n          }</p>\n          <p class="cards__card__info_price">${priceN}</p>\n        </div>\n        <button class="cards__card__info_button ${\n          flagButton === true ? "in-the-cart" : ""\n        }">${flagButton === true ? "in the cart" : "buy now"}</button>\n      </div>\n  </div>`;\n      this.booksCards.innerHTML += newCard;\n    });\n    observer.observe();\n    this.buttonPutShopBag();\n  }\n\n  // обработчик на кнопку купить\n  buttonPutShopBag() {\n    this.buttons = document.querySelectorAll(".cards__card__info_button");\n    this.buttons.forEach((element) => {\n      element.addEventListener("click", (e) => {\n        e.preventDefault();\n        this.putShopBag(element);\n      });\n    });\n  }\n\n  // логика добавления товаров в корзину\n  putShopBag(element) {\n    let book = document.getElementById(element.parentElement.parentElement.id);\n    if (book.getAttribute("attr") === "not-buy") {\n      book.setAttribute("attr", "buy");\n      book\n        .querySelector(".cards__card__info_button")\n        .classList.toggle("in-the-cart");\n      book.querySelector(".cards__card__info_button").textContent =\n        "in the cart";\n      this.addLocalStorage(book, element.parentElement.parentElement.id);\n      this.shopBagActive();\n    } else {\n      book.setAttribute("attr", "not-buy");\n      book\n        .querySelector(".cards__card__info_button")\n        .classList.toggle("in-the-cart");\n      book.querySelector(".cards__card__info_button").textContent = "buy now";\n      localStorage.removeItem(element.parentElement.parentElement.id);\n      this.shopBagActive();\n    }\n  }\n\n  //состояние корзины\n  shopBagActive() {\n    this.quantityBooks = localStorage.length;\n    this.shopBag.innerHTML = this.quantityBooks;\n    if (this.quantityBooks > 0) {\n      this.shopBag.classList.add("active");\n    } else {\n      this.shopBag.classList.remove("active");\n    }\n  }\n\n  //сохраняем в памяти книги добавленные в корзину\n  addLocalStorage(book, id) {\n    this.booksArr = {\n      id: id,\n      author: book.children[1].children[0].children[0].textContent,\n      title: book.children[1].children[0].children[1].textContent,\n      description: book.children[1].children[0].children[3].textContent,\n      price: book.children[1].children[0].children[4].textContent,\n    };\n    this.booksArrJson = JSON.stringify(this.booksArr);\n    localStorage.setItem(id, this.booksArrJson);\n  }\n\n  //  обработчик и подзагрузка элементов по клику по кнопке load more\n  loadMore() {\n    this.buttonLoad.addEventListener("click", async () => {\n      this.startIndex += 6;\n      this.startRequest();\n    });\n  }\n}\nconst cards = new Cards();\ndocument.addEventListener("DOMContentLoaded", cards.addCards());\n\n\n//# sourceURL=webpack://my-bookshop/./src/js/cards.js?')},"./src/js/categories.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   "default": () => (/* binding */ Categories)\n/* harmony export */ });\nclass Categories {\n  constructor() {\n    this.keyApi = "AIzaSyB1Q2BtGLb6h_d2i7GGLki5_X40Cx1qx5I";\n    this.categoriesArr = [\n      {\n        name: "Architecture",\n        url: "Architecture",\n      },\n      {\n        name: "Art & Fashion",\n        url: "Art",\n      },\n      {\n        name: "Biography",\n        url: "Biography & Autobiography",\n      },\n      {\n        name: "Business",\n        url: "Business",\n      },\n      {\n        name: "Crafts & Hobbies",\n        url: "Crafts & Hobbies",\n      },\n      {\n        name: "Drama",\n        url: "Drama",\n      },\n      {\n        name: "Fiction",\n        url: "Fiction",\n      },\n      {\n        name: "Food & Drink",\n        url: "Cooking",\n      },\n      {\n        name: "Health & Wellbeing",\n        url: "Health & Fitness",\n      },\n      {\n        name: "History & Politics",\n        url: "History",\n      },\n      {\n        name: "Humor",\n        url: "Humor",\n      },\n      {\n        name: "Poetry",\n        url: "Poetry",\n      },\n      {\n        name: "Psychology",\n        url: "Psychology",\n      },\n      {\n        name: "Science",\n        url: "Science",\n      },\n      {\n        name: "Technology",\n        url: "Technology",\n      },\n      {\n        name: "Travel & Maps",\n        url: "Travel",\n      },\n    ];\n    this.category = 0;\n    this.startIndex = 0;\n    this.maxResults = 6;\n    this.categories = document.querySelector(".shopfront__nav");\n    this.link;\n    this.booksCards = document.querySelector(".shopfront__cards");\n  }\n\n  //создаем запрос на сервер\n  async request() {\n    try {\n      const response = await fetch(\n        `https://www.googleapis.com/books/v1/volumes?q="subject:${\n          this.categoriesArr[this.category].url\n        }"&key=${this.keyApi}&printType=books&startIndex=${\n          this.startIndex\n        }&maxResults=${this.maxResults}&langRestrict=ru`\n      );\n      const data = await response.json();\n      console.log(data);\n      return (this.result = data);\n    } catch {\n      console.log("error");\n    }\n  }\n\n  //создаем блок с категориями\n  booksCategoriesLink() {\n    this.categoriesArr.forEach((element, index) => {\n      this.link = `<div\n       class="categories__list">\n      <div class="categories__dot n${index} ${\n        index == 0 ? "active" : ""\n      }" data-index=${index}></div>\n      <h2 class="categories__link n${index} ${\n        index == 0 ? "active" : ""\n      }" data-index=${index}>${element.name}\n      </h2>\n      </div>`;\n      this.categories.innerHTML += this.link; \n    });\n    this.links = document.querySelectorAll(".categories__link"); \n    this.links.forEach((link) => {\n      link.addEventListener("click", (e) => {\n        e.preventDefault(); \n        this.linkActive(link.dataset.index);\n        if (+this.category !== +link.dataset.index) {\n          this.category = link.dataset.index;\n          this.startIndex = 0;\n          this.booksCards.innerHTML = "";\n          this.startRequest();\n        }\n      });\n    });\n  }\n\n  //удаляем и добавляем active\n  linkActive(index) {\n    this.categories.querySelectorAll(".active").forEach((element) => {\n      element.classList.remove("active");\n    });\n    this.categories.querySelectorAll(`.n${index}`).forEach((element) => {\n      element.classList.add("active");\n    });\n  }\n}\n\n\n//# sourceURL=webpack://my-bookshop/./src/js/categories.js?')},"./src/js/slider.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";eval('__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Slider: () => (/* binding */ Slider)\n/* harmony export */ });\n// массив с исходными картинками для слайдера\nlet images = [\n  {\n    url: "img/banner1.png",\n  },\n  {\n    url: "img/banner2.png",\n  },\n  {\n    url: "img/banner3.png",\n  },\n];\nclass Slider {\n  constructor(images) {\n    this.images = images;\n    this.autoplayInterval = 5000;\n    this.curIndex = 0;\n  }\n\n  initSlider() {\n    if (!this.images || !this.images.length) return; \n\n    let sliderImages = document.querySelector(".slider__images"); //находим место куда будем отрисовывать картинки слайдера\n    let sliderDots = document.querySelector(".slider__dots"); //находим место куда будем отрисовывать точки слайдера\n\n    this.initImages(sliderImages);\n    this.initDots(sliderDots);\n    this.initAutoplay();\n  }\n\n// перебираем массив картинок, добавляем класс с индексом, если индекс 0 добавляем activ и вставляем в документ\n  initImages(sliderImages) {\n    this.images.forEach((image, index) => {\n      let elementImg = `<img class="slider__img n${index} \n      ${index === 0 ? "active" : ""}\n      "style="background-image:url(${\n        images[index].url\n      });" data-index="${index}">`;\n      sliderImages.innerHTML += elementImg;\n    });\n  }\n\n// также для точек\n  initDots(sliderDots) {\n    this.images.forEach((image, index) => {\n      let dots = `<div class="slider__dot-item n${index} ${\n        index === 0 ? "active" : ""\n      }" data-index=\'${index}\'></div>`;\n      sliderDots.innerHTML += dots;\n    });\n\n    //навешиваем прослушиватель события по клику \n    sliderDots.querySelectorAll(".slider__dot-item").forEach((dot) => {\n      dot.addEventListener("click", () => {\n        this.moveSlider(dot.dataset.index); \n      });\n    });\n  }\n\n//автоперелистывание по кругу\ninitAutoplay() {\n  setInterval(() => {\n    this.nextIndex =\n      this.curIndex === images.length - 1 ? 0 : this.curIndex + 1;\n    this.moveSlider(this.nextIndex);\n  }, this.autoplayInterval);\n}\n\n// перелистование слайда, добавление и удаление active\n  moveSlider(index) {\n    let sliderImages = document.querySelector(".slider__images");\n    let sliderDots = document.querySelector(".slider__dots");\n    sliderImages.querySelector(".active").classList.remove("active");\n    sliderImages.querySelector(".n" + index).classList.add("active");\n    sliderDots.querySelector(".active").classList.remove("active");\n    sliderDots.querySelector(".n" + index).classList.add("active");\n    this.curIndex = parseInt(index);\n  }\n}\n\ndocument.addEventListener("DOMContentLoaded", () => {\n  const slider = new Slider(images);\n  slider.initSlider();\n});\n\n\n//# sourceURL=webpack://my-bookshop/./src/js/slider.js?')}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var n=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(n.exports,n,n.exports,__webpack_require__),n.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__=__webpack_require__("./src/index.js")})();