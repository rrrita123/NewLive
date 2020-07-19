'use strict';

document.querySelector('.popup-mailing__email').classList.remove('error-mail');

var SCROLL_LIMIT = 40;
var countScroll = 0;

function setCookie(name, value, options = {}) {

  options = {
    path: '/',
    'max-age': 3600
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
    updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

function getCookie(name) {
let matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
));
return matches ? decodeURIComponent(matches[1]) : undefined;
}

function deleteCookie(name) {
  setCookie(name, "", {
    'max-age': -1
  })
}

function closePopup(popupElement) {
  var buttonClose = popupElement.querySelector('.popup-mailing__button-close');
  var popupForm = popupElement.querySelector('.popup-mailing__form');

  function hidePopup() {
    setCookie('subscribe', 'disabled');
    popupElement.classList.add('hidden');

    window.removeEventListener('scroll', windowScrollHandler);
    buttonClose.removeEventListener('click', buttonCloseClickHandler);
  }

  function buttonCloseClickHandler() {
    hidePopup();
  }

  function documentKeydownEscHandler(evt) {
    if (evt.keyCode === 27) {
      hidePopup();
    }
  }

  function popupFormSubmitHandler() {
    setCookie('subscribe', 'disabled');
  };

  buttonClose.addEventListener('click', buttonCloseClickHandler);
  document.addEventListener('keydown', documentKeydownEscHandler);
  popupForm.addEventListener('submit', popupFormSubmitHandler);
};

function showPopup() {
  var popupElement = document.querySelector('.popup-mailing');
  if (popupElement.classList.contains('hidden')) {
    popupElement.classList.remove('hidden');
    closePopup(popupElement);
  }
};

function windowScrollHandler(evt) {
  countScroll++;
  if (countScroll > SCROLL_LIMIT) {
    showPopup();
  }
};

function initPopup() {
  if (!getCookie('subscribe')) {
    setCookie('subscribe', 'show');
  }
  if (getCookie('subscribe') === 'show') {
    setTimeout(function() {
      window.addEventListener('scroll', windowScrollHandler, {passive: true});
    }, 8000);

    setTimeout(function() {
      console.log(countScroll);
      if (countScroll === 0) {
        setTimeout(showPopup, 1000);
      }
    }, 10000);
  }
};

initPopup();
