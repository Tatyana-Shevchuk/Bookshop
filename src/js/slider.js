// массив с исходными картинками для слайдера
let images = [
  {
    url: "img/banner1.png",
  },
  {
    url: "img/banner2.png",
  },
  {
    url: "img/banner3.png",
  },
];
export class Slider {
  constructor(images) {
    this.images = images;
    this.autoplayInterval = 5000;
    this.curIndex = 0;
  }

  initSlider() {
    if (!this.images || !this.images.length) return; 

    let sliderImages = document.querySelector(".slider__images"); //находим место куда будем отрисовывать картинки слайдера
    let sliderDots = document.querySelector(".slider__dots"); //находим место куда будем отрисовывать точки слайдера

    this.initImages(sliderImages);
    this.initDots(sliderDots);
    this.initAutoplay();
  }

// перебираем массив картинок, добавляем класс с индексом, если индекс 0 добавляем activ и вставляем в документ
  initImages(sliderImages) {
    this.images.forEach((image, index) => {
      let elementImg = `<img class="slider__img n${index} 
      ${index === 0 ? "active" : ""}
      "style="background-image:url(${
        images[index].url
      });" data-index="${index}">`;
      sliderImages.innerHTML += elementImg;
    });
  }

// также для точек
  initDots(sliderDots) {
    this.images.forEach((image, index) => {
      let dots = `<div class="slider__dot-item n${index} ${
        index === 0 ? "active" : ""
      }" data-index='${index}'></div>`;
      sliderDots.innerHTML += dots;
    });

    //навешиваем прослушиватель события по клику 
    sliderDots.querySelectorAll(".slider__dot-item").forEach((dot) => {
      dot.addEventListener("click", () => {
        this.moveSlider(dot.dataset.index); 
      });
    });
  }

//автоперелистывание по кругу
initAutoplay() {
  setInterval(() => {
    this.nextIndex =
      this.curIndex === images.length - 1 ? 0 : this.curIndex + 1;
    this.moveSlider(this.nextIndex);
  }, this.autoplayInterval);
}

// перелистование слайда, добавление и удаление active
  moveSlider(index) {
    let sliderImages = document.querySelector(".slider__images");
    let sliderDots = document.querySelector(".slider__dots");
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + index).classList.add("active");
    sliderDots.querySelector(".active").classList.remove("active");
    sliderDots.querySelector(".n" + index).classList.add("active");
    this.curIndex = parseInt(index);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const slider = new Slider(images);
  slider.initSlider();
});
