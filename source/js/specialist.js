const {tns} = require("tiny-slider/src/tiny-slider");

const specialists = document.querySelectorAll(`.specialist__list > div`);
const specialistsMoreBtn = document.querySelector(`.button-main--orange-specialist`);

if (window.innerWidth < 768) {
  let articlesGraySlider = tns({
    mode: `carousel`,
    container: `.articles--gray .articles-list`,
    navContainer: `.articles--gray .dots--indent`,
    items: 1,
    controls: false
  });

  let articlesGreenSlider = tns({
    mode: `carousel`,
    container: `.articles--green .articles-list`,
    navContainer: `.articles--green .dots--indent`,
    items: 1,
    controls: false
  });

  for (let i = 0; i < 3; i++) {
    specialists[i].style.display = `block`;
  }

  specialistsMoreBtn.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    for (let i = 3; i < specialists.length; i++) {
      specialists[i].style.display = `block`;
    }
  });
}

if (window.innerWidth > 1279) {
  let specialistSlider = tns({
    // mode: `carousel`,
    container: `.specialist__list`,
    navContainer: `.dots--specialist`,
    items: 0,
    // controls: true,
    // nav: true,
    center: true,
    controlsContainer: `.specialist__nav--wrapper`,
    fixedWidth: 380,
    // viewportMax: 5000
    gutter: 20,
    // edgePadding: 0,
    startIndex: 1
    // autoWidth: true
  });
}

