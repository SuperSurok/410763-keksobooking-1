'use strict';

// Исходные данные

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var TYPES = [
  'flat',
  'house',
  'bungalo'
];

var TIME_FOR_ARRIVAL_AND_DEPATURE = [
  '12:00',
  '13:00',
  '14:00'
];


var HOUSE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

// массив куда будем записывать все данные
var flats = [];


// ------------------------------------------------------------------


// генерим случайное число
function getRandomNumber(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}


// получить случайный элемент массива
function getRandItem(array) {
  var randItem = Math.floor(Math.random() * array.length);
  return array[randItem];
}


// функция для получения уникальных фич квартиры из массива HOUSE_FEATURES

/* Проходим по массиву со значениями. Добавляем в объект элемент и присваиваем ему единицу.
Если элементу не присвоена единца - присваиваем. Если встречается дубликат делаем проверку,
если ключ-значению объекта присвоена единица, то в масиив его больше не добавляем. */

function getUniqueFeatures(array) {
  var obj = {}; // пустой объект
  var resultFeatures = []; // результатирующий массив куда будем складывать полученные значения

  // цикл для получения данных
  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (obj[item] !== 1) {
      obj[item] = 1;
      resultFeatures.push(item);
    }
  }
  return resultFeatures;
}


// функция для получения случайных элементов из массива с фичами resultFeatures
function getRandomFeatures(array) {

  var randomFeaturesLength = getRandomNumber(1, array.length); // генерим случайную длинну массива
  var result = []; // результатирующий массив. Равен случайной длинне из строки выше

  for (var j = 0; j < randomFeaturesLength; j++) { // проходимся циклом по этой длинне
    result.push(getRandItem(array)); // вставляем в результирующий массив случайный элемент массива
  }
  return getUniqueFeatures(result);
}


// создаём разные варианты квартир
function getVariantFlats() {

  for (var i = 1; i <= 8; i++) {

    var addressesX = getRandomNumber(300, 900);
    var addressesY = getRandomNumber(100, 500);

    flats.push({
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png'
      },
      offer: {
        title: getRandItem(TITLES),
        address: addressesX + ',' + addressesY,
        price: getRandomNumber(1000, 1000000),
        type: getRandItem(TYPES),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandItem(TIME_FOR_ARRIVAL_AND_DEPATURE),
        checkout: getRandItem(TIME_FOR_ARRIVAL_AND_DEPATURE),
        features: getRandomFeatures(HOUSE_FEATURES),
        photos: [],
        description: ''
      },
      location: {
        x: addressesX,
        y: addressesY
      }
    });
  }
  return flats;
}

getVariantFlats();


// ------------------------------------------------------------------

// создаём шаблон меток
var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

// блок в котром будут отображены сгенерированные элементы
var mapPinsCard = document.querySelector('.map__pins');

// функция создания меток
function renderMapPinsCard(pin, index) {
  var newMapPinsCard = templateMapPin.cloneNode(true);
  newMapPinsCard.querySelector('img').src = pin.author.avatar;
  newMapPinsCard.querySelector('img').setAttribute('rel', index);
  newMapPinsCard.style.left = (pin.location.x) + 'px';
  newMapPinsCard.style.top = (pin.location.y) + 'px';
  newMapPinsCard.setAttribute('rel', index);
  return newMapPinsCard;
}

var fragmentPins = document.createDocumentFragment();

for (var i = 0; i < flats.length; i++) {
  fragmentPins.appendChild(renderMapPinsCard(flats[i], i));
}
mapPinsCard.appendChild(fragmentPins);


// ------------------------------------------------------------------


// создаём шаблон карточек квартир
var templateCardHouse = document.querySelector('template').content.querySelector('.map__card');

// создаём объект с типами квартир
var HOUSE_TYPES = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

// функция для генерации новых карточек с информацией
function renderCardHouse(flat, index) {

  var cardHouse = templateCardHouse.cloneNode(true); // клонируем узел целиком
  var features = cardHouse.querySelector('.popup__features');
  var flatType = cardHouse.querySelector('h4');
  var featuresFragment = document.createDocumentFragment(); // создаём фрагмент документа, куда будем вставлять фичи

  cardHouse.querySelector('.popup__avatar').src = flat.author.avatar;
  cardHouse.querySelector('h3').textContent = flat.offer.title;
  cardHouse.querySelector('small').textContent = flat.offer.address;
  cardHouse.querySelector('.popup__price').innerHTML = flat.offer.price + ' &#x20bd;/ночь';
  cardHouse.querySelector('h4').textContent = flat.offer.type;
  cardHouse.querySelector('.popup__features').innerHTML = '';

  flatType.textContent = HOUSE_TYPES[flat.offer.type];

  flatType.nextElementSibling.textContent = flat.offer.rooms + ' комнаты' + ' для ' + flat.offer.guests + ' гостей';
  flatType.nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + flat.offer.checkin + ' ,' + 'выезд до '
    + flat.offer.checkout;

  for (var k = 0; k < flat.offer.features.length; k++) {
    var li = document.createElement('li');
    li.className = 'feature  feature--' + flat.offer.features[k];
    featuresFragment.appendChild(li);
  }
  features.appendChild(featuresFragment);

  features.nextElementSibling.textContent = flat.offer.description;

  document.querySelector('.map').appendChild(cardHouse);

  cardHouse.setAttribute('rel', index);

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
}


// ----------------------------------------------
// Задание Подробности
// Обработка событий

var ESC_BUTTON = 27;
var ENTER_BUTTON = 13;

// Элементы разметки
var form = document.querySelector('.notice__form'); // форма
var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
var map = document.querySelector('.map'); // карта


// Скрываем метки после загрузки страницы
var mapPin = document.querySelectorAll('.map__pin');
mapPin.forEach(function (t) {
  t.style.display = 'none';
  t.classList.remove('map__pin--active');
});

// главная метка видна после загрузки страницы
mapPinMain.style.display = 'block';

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
        renderCardHouse(flats[index]);
      }
    });
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

