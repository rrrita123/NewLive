const btnTopElement = document.querySelector(`.button-inner--footer-up`);

btnTopElement.addEventListener(`click`, () => {
  // document.querySelector(`body`).scrollIntoView({behavior: `smooth`, block: `start`, inline: `nearest`});
  window.scrollTo({top: 0, behavior: `smooth`});
});
