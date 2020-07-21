'use strict';

var contentsElement = document.querySelector('.contents');
var terminologyElement = document.querySelector('.terminology');
var terminologyElementCollection = terminologyElement.querySelectorAll('.terminology__item');

var contentsElementClickHandler = function (evt) {
  evt.preventDefault();

  if (evt.target.localName === 'a') {

    var letterTarget = evt.target.textContent;
    var terminologyArray = Array.from(terminologyElementCollection);

    terminologyArray.forEach(function (element) {
      if (letterTarget === 'всё') {
        element.classList.remove('hidden');
      } else {
        var letterElement = element.querySelector('h2').textContent[0].toLowerCase();
        var letterElementInt = parseInt(letterElement);

        if ((letterElementInt >= 0 && 9 >= letterElementInt && letterTarget === '123') || letterElement === letterTarget) {
          element.classList.remove('hidden');
        } else {
          element.classList.add('hidden');
        };
      }
    });
  }
};

contentsElement.addEventListener('click', contentsElementClickHandler);
