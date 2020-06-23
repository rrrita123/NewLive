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

function clickButtonClose(popupElement) {
  var buttonClose = popupElement.querySelector('.popup-mailing__button-close');

  function buttonCloseClickHandler() {
    setCookie('subscribe', 'disabled');
    popupElement.classList.add('hidden');

    window.removeEventListener('scroll', windowScrollHandler);
    buttonClose.removeEventListener('click', buttonCloseClickHandler);
  }

  buttonClose.addEventListener('click', buttonCloseClickHandler);
};

function showPopup() {
  var popupElement = document.querySelector('.popup-mailing');
  if (popupElement.classList.contains('hidden')) {
    popupElement.classList.remove('hidden');
    clickButtonClose(popupElement);
  }
}

function windowScrollHandler(evt) {
  countScroll++;
  if (countScroll > SCROLL_LIMIT) {
    showPopup();
  }
}

function initPopup() {
  if (!getCookie('subscribe')) {
    setCookie('subscribe', 'show');
  }
  if (getCookie('subscribe') === 'show') {
    setTimeout(function() {
      window.addEventListener('scroll', windowScrollHandler);
    }, 3000);

    setTimeout(function() {
      console.log(countScroll);
      if (countScroll === 0) {
        setTimeout(showPopup, 1000);
      }
    }, 5000);
  }
};

initPopup();
