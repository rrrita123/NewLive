'use strict';

var Mob = {
  WIDTH: 768,
  TERMINS_PAGE: 5,
  TOP: 360
}

var pageMobile = 1;
var contentsElement = document.querySelector('.contents');
var contentsElementCollection = contentsElement.querySelectorAll('.contents__item');
var terminologyElement = document.querySelector('.terminology');
var terminologyWrapperElement = document.querySelector('.terminology__wrapper');
var terminologyElementCollection = terminologyWrapperElement.querySelectorAll('.terminology__link')
var btnMoreTerminology = document.querySelector('.button-main--terminology');
var originalPosition = 0;

var getOffset = function (elem) {
  if (elem.getBoundingClientRect) {
      // "правильный" вариант
      return getOffsetRect(elem)
  } else {
      // пусть работает хоть как-то
      return getOffsetSum(elem)
  }
}

var getOffsetSum = function (elem) {
  var top=0, left=0
  while(elem) {
      top = top + parseInt(elem.offsetTop)
      left = left + parseInt(elem.offsetLeft)
      elem = elem.offsetParent
  }

  return {top: top, left: left}
}

var getOffsetRect = function (elem) {
  // (1)
  var box = elem.getBoundingClientRect()

  // (2)
  var body = document.body
  var docElem = document.documentElement

  // (3)
  var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
  var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft

  // (4)
  var clientTop = docElem.clientTop || body.clientTop || 0
  var clientLeft = docElem.clientLeft || body.clientLeft || 0

  // (5)
  var top  = box.top +  scrollTop - clientTop
  var left = box.left + scrollLeft - clientLeft

  return { top: Math.round(top), left: Math.round(left) }
}

var getPositionY = function (elem) {
  return getOffset(elem).top - window.innerHeight;
}


var filterCollection = function (letter) {
  letter = letter || 'всё';

  return Array.from(terminologyElementCollection).filter(function (element) {
    if (letter === 'всё') {
      return true;
    } else {
      var letterElement = element.querySelector('h2').textContent[0].toLowerCase();
      var letterElementInt = parseInt(letterElement);

      if ((letterElementInt >= 0 && 9 >= letterElementInt && letter === '123') || letterElement === letter) {
        return true;
      } else {
        return false
      }
    }
  });
}

// Разбиение на страницы - обрезание массива до нужной длины
var perPage = function (arr) {
  var sliceArr = arr.slice(0, pageMobile * Mob.TERMINS_PAGE);

  if (sliceArr.length === arr.length) {
    btnMoreTerminology.classList.add('hidden');
  } else {
    btnMoreTerminology.classList.remove('hidden');
  }
  return sliceArr;
};

// Отрисовка терминов
var renderTermins = function (terminsArr) {
  terminologyWrapperElement.innerHTML = ''; // очищаем все термины

  if (window.innerWidth < Mob.WIDTH) {
    terminsArr = perPage(terminsArr);
  }

  terminsArr.forEach(function (element) {
    terminologyWrapperElement.appendChild(element);
  });

  // перезаписываем координату блока терминов для фиксированного состояния
  contentsElement.classList.remove('fixed');
  originalPosition = getPositionY(contentsElement);
}

// Клик по букве в содержании
var contentsElementClickHandler = function (evt) {
  evt.preventDefault();

  if (evt.target.localName === 'a' && evt.target.getAttribute('class') != 'disabled' && evt.target.getAttribute('class') != 'active') {
    pageMobile = 1; // обнуляем счетчик страниц для мобильной версии
    // установка активной буквы в содержании
    if (contentsElement.querySelector('.active')) {
      contentsElement.querySelector('.active').classList.remove('active');
    }
    evt.target.classList.add('active');

    // скролл до начала списка терминов
    window.scroll(0, getOffset(terminologyElement).top);

    // рендер отфильтрованных терминов по букве
    renderTermins(filterCollection(evt.target.textContent));
  }
};

// Клик по кнопке "показать еще"
var btnMoreTerminologyClickHandler = function (evt) {
  pageMobile++;
  renderTermins(filterCollection(contentsElement.querySelector('.active').textContent));
};


renderTermins(Array.from(terminologyElementCollection));

contentsElement.addEventListener('click', contentsElementClickHandler);

// Проверка всех карточек на принадлежность к буквам, если нет то disabled
Array.from(contentsElementCollection).forEach(function (element) {
  var letter = element.querySelector('a').textContent;
  var letterArr = filterCollection(letter);
  if (letterArr.length === 0) {
    element.querySelector('a').classList.add('disabled');
  }
});

if (window.innerWidth < Mob.WIDTH) {
  btnMoreTerminology.addEventListener('click', btnMoreTerminologyClickHandler);
} else {
  btnMoreTerminology.classList.add('hidden');
}


originalPosition = getPositionY(contentsElement);

window.addEventListener('scroll', function(evt) {
  console.log(terminologyWrapperElement.children.length);
  if (window.scrollY > Mob.TOP && window.scrollY < originalPosition && terminologyWrapperElement.children.length > 2) {
    contentsElement.classList.add('fixed');
  } else {
    contentsElement.classList.remove('fixed');
  }
});
