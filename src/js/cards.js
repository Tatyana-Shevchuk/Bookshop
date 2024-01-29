import Categories from "./categories";
import lozad from "lozad"; //ленивая загрузка с помощью библиотеки JS
const observer = lozad();

export class Cards extends Categories {
  constructor() {
    super();
    this.placeholder = "../img/placeholder.png";
    this.buttonLoad = document.querySelector(".floor_btn");
    this.shopBag = document.querySelector(".header__shopbag-counter");
    this.quantityBooks = localStorage.length;
  }

  // стартовая функция
  addCards() {
    this.startRequest();
    this.booksCategoriesLink();
    this.loadMore();
    this.shopBagActive();
  }

   async startRequest() {
    this.result = await this.request();
    this.createCards(this.result.items);
  }

  //создаем карточку книги
  createCards(booksArr) {
    if (!booksArr) return;

    booksArr.forEach((element, index) => {
      let book = element;
      let idBook = book.id;
      let image = book.volumeInfo.imageLinks?.thumbnail;
      let author = book.volumeInfo.authors;
      let title = book.volumeInfo.title;
      let raiting = book.volumeInfo.averageRating;
      let raitingCount = book.volumeInfo.ratingsCount;
      let description = book.volumeInfo.description?.slice(0, 76);
      let price = book.saleInfo.retailPrice;
      let priceN = `${price?.amount ? price.amount : ""} ${
        price?.currencyCode ? price.currencyCode : ""
      }`;
      let flagButton = false;

      //проверка есть-ли книга в корзине
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) === idBook) {
          flagButton = true;
        }
      }

      //отображение звездочек рейтинга
      let raitingStarActive = "";
      if (raiting) {
        for (let i = 0; i < raiting; i++) {
          let starActive = `<img class="raiting-star_active" src="../img/Star_a.svg" alt="звезда" />`;
          raitingStarActive += starActive;
        }
      }
      let raitingStarNoActive = "";
      for (let i = 0; i < 5; i++) {
        let starNoActive = `<img src="../img/Star.svg" alt="звезда" />`;
        raitingStarNoActive += starNoActive;
      }

      // создание html карточки книги
      let newCard = `
  <div class="cards__card" id='${idBook}' attr = "${
        flagButton === true ? "buy" : "not-buy"
      }">
      <img  data-src="${
        image ? image : this.placeholder
      }" class="lozad cards__card__img" src="${
        image ? image : this.placeholder
      }" alt="обложка">
      <div class="cards__card__info">
        <div>
          <p class="cards__card__info_author">${author ? author : ""}</p>
          <h2 class="cards__card__info_title">${title}</h2>
          <div class="cards__card__info_raiting">
              <div class="cards__card__info_raiting-star">
                  ${raiting ? raitingStarNoActive + raitingStarActive : ""}
              </div>
          <p class="cards__card__info_raiting-text">${
            raitingCount ? raitingCount + " review" : ""
          }</p>
          </div>
          <p class="cards__card__info_description">${
            description === undefined ? "" : description + "..."
          }</p>
          <p class="cards__card__info_price">${priceN}</p>
        </div>
        <button class="cards__card__info_button ${
          flagButton === true ? "in-the-cart" : ""
        }">${flagButton === true ? "in the cart" : "buy now"}</button>
      </div>
  </div>`;
      this.booksCards.innerHTML += newCard;
    });
    observer.observe();
    this.buttonPutShopBag();
  }

  // обработчик на кнопку купить
  buttonPutShopBag() {
    this.buttons = document.querySelectorAll(".cards__card__info_button");
    this.buttons.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        this.putShopBag(element);
      });
    });
  }

  // логика добавления товаров в корзину
  putShopBag(element) {
    let book = document.getElementById(element.parentElement.parentElement.id);
    if (book.getAttribute("attr") === "not-buy") {
      book.setAttribute("attr", "buy");
      book
        .querySelector(".cards__card__info_button")
        .classList.toggle("in-the-cart");
      book.querySelector(".cards__card__info_button").textContent =
        "in the cart";
      this.addLocalStorage(book, element.parentElement.parentElement.id);
      this.shopBagActive();
    } else {
      book.setAttribute("attr", "not-buy");
      book
        .querySelector(".cards__card__info_button")
        .classList.toggle("in-the-cart");
      book.querySelector(".cards__card__info_button").textContent = "buy now";
      localStorage.removeItem(element.parentElement.parentElement.id);
      this.shopBagActive();
    }
  }

  //состояние корзины
  shopBagActive() {
    this.quantityBooks = localStorage.length;
    this.shopBag.innerHTML = this.quantityBooks;
    if (this.quantityBooks > 0) {
      this.shopBag.classList.add("active");
    } else {
      this.shopBag.classList.remove("active");
    }
  }

  //сохраняем в памяти книги добавленные в корзину
  addLocalStorage(book, id) {
    this.booksArr = {
      id: id,
      author: book.children[1].children[0].children[0].textContent,
      title: book.children[1].children[0].children[1].textContent,
      description: book.children[1].children[0].children[3].textContent,
      price: book.children[1].children[0].children[4].textContent,
    };
    this.booksArrJson = JSON.stringify(this.booksArr);
    localStorage.setItem(id, this.booksArrJson);
  }

  //  обработчик и подзагрузка элементов по клику по кнопке load more
  loadMore() {
    this.buttonLoad.addEventListener("click", async () => {
      this.startIndex += 6;
      this.startRequest();
    });
  }
}
const cards = new Cards();
document.addEventListener("DOMContentLoaded", cards.addCards());
