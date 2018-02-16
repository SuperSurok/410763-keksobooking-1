'use strict';
(function () {


// ------------------------------------------------------------------



// ------------------------------------------------------------------


// удаляем карточку квартиры по клику на крестик
  var popupClose = document.querySelectorAll('.popup__close'); // крестик на карточке
  var popup = document.querySelectorAll('.popup');

  popupClose.forEach(function (t) {
    t.addEventListener('click', function () {
      popup.forEach(function (elem) {
        elem.remove();
      });
      mapPin.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    });
  });

// удаляем карточку квартиры по нажатию ESCAPE
  function popupCloseCrossHandler(e) {
    if (e.keyCode === ESC_BUTTON) {
      popup.forEach(function (elem) {
        elem.remove();
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    }
  }

  document.addEventListener('keydown', popupCloseCrossHandler);


// Задание Подробности
// Обработка событий

var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

// Элементы разметки
var form = document.querySelector('.notice__form'); // форма
var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
var map = document.querySelector('.map'); // карта
var fieldset = document.querySelectorAll('fieldset');
var avatar = document.querySelector('#avatar');
var images = document.querySelector('#images');


// Скрываем метки после загрузки страницы
var mapPin = document.querySelectorAll('.map__pin');
mapPin.forEach(function (t) {
  t.style.display = 'none';
  t.classList.remove('map__pin--active');
});

// главная метка видна после загрузки страницы
mapPinMain.style.display = 'block';

// делаем неактивными поля формы
fieldset.forEach(function (elem) {
  elem.setAttribute('disabled', 'disabled');
});

// делаем неактивными поля загруки файлов
avatar.setAttribute('disabled', 'disabled');
images.setAttribute('disabled', 'disabled');


// Скрываем карточки с инфоормацией
var houseCard = document.querySelectorAll('.popup');
houseCard.forEach(function (t) {
  t.style.display = 'none';
});

// активируем карту
mapPinMain.addEventListener('mouseup', function () {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');

  // отображаем метки и карточки квартир на экране
  mapPin.forEach(function (elem) {
    elem.style.display = 'block';
    elem.addEventListener('click', function (e) {
      var index = e.target.getAttribute('rel');
      if (index) {
        renderCardHouse(window.data.flats[index]);
      }
    });
  });
  fieldset.forEach(function (elem) {
    elem.removeAttribute('disabled');
  });
});

// добавляем класс метке по клику
mapPin.forEach(function (t) {
  t.addEventListener('click', function (e) {
    mapPin.forEach(function () {
      mapPinMain.classList.remove('map__pin--active');
      t.className = t.className.replace('map__pin--active', '');
      e.currentTarget.classList.add('map__pin--active');
    });
  });
});

// добавляем активный класс метке по нажатию ENTER
mapPin.forEach(function (elem) {
  elem.addEventListener('keydown', function (e) {
    mapPin.forEach(function (t) {
      if (e.keyCode === ENTER_BUTTON) {
        t.className = t.className.replace('map__pin--active', '');
        e.currentTarget.classList.add('map__pin--active');
      }
    });
  });
});

})();
