export default class Categories {
  constructor() {
    this.keyApi = "AIzaSyB1Q2BtGLb6h_d2i7GGLki5_X40Cx1qx5I";
    this.categoriesArr = [
      {
        name: "Architecture",
        url: "Architecture",
      },
      {
        name: "Art & Fashion",
        url: "Art",
      },
      {
        name: "Biography",
        url: "Biography & Autobiography",
      },
      {
        name: "Business",
        url: "Business",
      },
      {
        name: "Crafts & Hobbies",
        url: "Crafts & Hobbies",
      },
      {
        name: "Drama",
        url: "Drama",
      },
      {
        name: "Fiction",
        url: "Fiction",
      },
      {
        name: "Food & Drink",
        url: "Cooking",
      },
      {
        name: "Health & Wellbeing",
        url: "Health & Fitness",
      },
      {
        name: "History & Politics",
        url: "History",
      },
      {
        name: "Humor",
        url: "Humor",
      },
      {
        name: "Poetry",
        url: "Poetry",
      },
      {
        name: "Psychology",
        url: "Psychology",
      },
      {
        name: "Science",
        url: "Science",
      },
      {
        name: "Technology",
        url: "Technology",
      },
      {
        name: "Travel & Maps",
        url: "Travel",
      },
    ];
    this.category = 0;
    this.startIndex = 0;
    this.maxResults = 6;
    this.categories = document.querySelector(".shopfront__nav");
    this.link;
    this.booksCards = document.querySelector(".shopfront__cards");
  }

  //создаем запрос на сервер
  async request() {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q="subject:${
          this.categoriesArr[this.category].url
        }"&key=${this.keyApi}&printType=books&startIndex=${
          this.startIndex
        }&maxResults=${this.maxResults}&langRestrict=ru`
      );
      const data = await response.json();
      console.log(data);
      return (this.result = data);
    } catch {
      console.log("error");
    }
  }

  //создаем блок с категориями
  booksCategoriesLink() {
    this.categoriesArr.forEach((element, index) => {
      this.link = `<div
       class="categories__list">
      <div class="categories__dot n${index} ${
        index == 0 ? "active" : ""
      }" data-index=${index}></div>
      <h2 class="categories__link n${index} ${
        index == 0 ? "active" : ""
      }" data-index=${index}>${element.name}
      </h2>
      </div>`;
      this.categories.innerHTML += this.link; 
    });
    this.links = document.querySelectorAll(".categories__link"); 
    this.links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault(); 
        this.linkActive(link.dataset.index);
        if (+this.category !== +link.dataset.index) {
          this.category = link.dataset.index;
          this.startIndex = 0;
          this.booksCards.innerHTML = "";
          this.startRequest();
        }
      });
    });
  }

  //удаляем и добавляем active
  linkActive(index) {
    this.categories.querySelectorAll(".active").forEach((element) => {
      element.classList.remove("active");
    });
    this.categories.querySelectorAll(`.n${index}`).forEach((element) => {
      element.classList.add("active");
    });
  }
}
