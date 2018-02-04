'use strict';

// исходные данные

var HOUSE_TILES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];

var HOUSE_TYPE = [
  'flat',
  'house',
  'bungalow'
];

var HOUSE_CHECKIN_CHECKOUT = [
  '12.00',
  '13.00',
  '14.00'
];

var HOUSE_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var HOSE_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

// сюда поместим квартиры
var flats = [];

// функция генерации случайного числа
var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// получить случайный элемент массива
var getRandomItem = function (array) {
  var randomItem = Math.floor(Math.random() * array.length);
  return array[randomItem];
};

// функция получения уникальных фич HOSE_FEATURES
/* Проходим по массиву со значениями. Добавляем в объект элемент и присваиваем ему единицу.
Если элементу не присвоена единица - присваиваем. Если встречается дубликат, делаем проверку.
Если ключ:значению присвоена единица, то в массив его больше не добавляем. Понадобятся пустой объект и пустой массив. */

var getUniqueFeatures = function (array) {
  var uniqueFeatures = {}; // новый объект
  var resultUniqueFeatures = []; // массив для новых фич

  for (var i = 0; i < array.length; i++) {
    var item = array[i];
    if (uniqueFeatures[item] !== 1) {
      uniqueFeatures[item] = 1;
      resultUniqueFeatures.push(item);
    }
  }
  return resultUniqueFeatures;
};


// функция для получения случайных фич из массива resultUniqueFeatures
var getRandomFeatures = function (array) {

  var randomFeaturesLength = getRandomNumber(1, array.length); // генерим случаное количество фич

  var result = []; // массив куда сложим фичи из строки выше

  for (var i = 0; i < randomFeaturesLength; i++) { // проходимся по количеству фич
    result.push(getRandomItem(array)); // вставляем в массив фич случаный элемент
  }
  return getUniqueFeatures(result);
};


// Фишер-Йетс для расстановки фото в случайном порядке
var randomizeArray = function (arr) {
  var arrCopy = arr.slice();
  var result = [];
  for (var j = 0; j < arrCopy.length; j++) {
    var randomArrayIndex = Math.floor(Math.random() * arrCopy.length);
    result.push(arrCopy[randomArrayIndex]);
    arrCopy.splice(randomArrayIndex, 1);
    j--;
  }
  return result;
};


// создаём разные варианты квартир

var getVariantsFlats = function () {
  for (var i = 1; i <= 8; i++) {
    var addressX = getRandomNumber(300, 900);
    var addressY = getRandomNumber(150, 500);

    flats.push({
      author: {
        avatar: 'img/avatars/user' + '0' + i + '.png'
      },
      offer: {
        title: getRandomItem(HOUSE_TILES),
        address: addressX + ', ' + addressY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomItem(HOUSE_TYPE),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1, 10),
        checkin: getRandomItem(HOUSE_CHECKIN_CHECKOUT),
        checkout: getRandomItem(HOUSE_CHECKIN_CHECKOUT),
        features: getRandomFeatures(HOUSE_FEATURES),
        description: 'Жильё в центре города',
        photos: randomizeArray(HOSE_PHOTOS)
      },
      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(150, 500)
      }
    });
  }
  return flats;
};

getVariantsFlats();

// -------------------------------------

// активируем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');

// создаём шаблон меток
var templteMapPin = document.querySelector('template').content.querySelector('.map__pin');

// блок в которм будут отображены сгененрированные элементы
var mapPins = document.querySelector('.map__pins');

// функция создания меток
var renderMapPins = function (pin) {
  var newMapPins = templteMapPin.cloneNode(true);
  newMapPins.querySelector('img').src = pin.author.avatar;
  newMapPins.style.left = (pin.location.x) + 'px';
  newMapPins.style.top = (pin.location.y) + 'px';

  return newMapPins;
};

var fragmentPins = document.createDocumentFragment();

for (var i = 0; i < flats.length; i++) {
  fragmentPins.appendChild(renderMapPins(flats[i]));
}

mapPins.appendChild(fragmentPins);

// -------------------------------------

// создаём шаблон карточек квартир
var templateCardHouse = document.querySelector('template').content.querySelector('.map__card');

// объект с типами квартир
var TYPE = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalow': 'Бунгало'
};

// функция для генерации новых карточек с информацией
var renderCardHouse = function (flat) {

  var cardHouse = templateCardHouse.cloneNode(true);
  var features = cardHouse.querySelector('.popup__features');
  var flatType = cardHouse.querySelector('h4');
  var photo = cardHouse.querySelector('.popup__pictures');
  var photoFragment = document.createDocumentFragment();
  var featuresFragment = document.createDocumentFragment();

  cardHouse.querySelector('.popup__avatar').textContent = flat.author.avatar;
  cardHouse.querySelector('h3').textContent = flat.offer.title;
  cardHouse.querySelector('small').innerHTML = flat.offer.address;
  cardHouse.querySelector('.popup__price').innerHTML = flat.offer.price + ' &#x20bd;/ночь';
  cardHouse.querySelector('h4').textContent = flat.offer.type;
  cardHouse.querySelector('.popup__features').innerHTML = '';
  cardHouse.querySelector('.popup__pictures').innerHTML = '';
  cardHouse.querySelector('.popup__features').nextElementSibling.textContent = flat.offer.description;


  flatType.textContent = TYPE[flat.offer.type];

  flatType.nextElementSibling.textContent = flat.offer.rooms = ' комнаты' + ' для ' + flat.offer.guests + ' гостей';
  flatType.nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + flat.offer.checkin + ' ,' + 'выезд до '
    + flat.offer.checkout;


  // вставляем фичи
  for (var k = 0; k < flat.offer.features.length; k++) {
    var li = document.createElement('li');
    li.className = 'feature  feature--' + flat.offer.features[k];
    featuresFragment.appendChild(li);
  }
  features.appendChild(featuresFragment);
  features.nextElementSibling.textContent = flat.offer.description;
  document.querySelector('.map').appendChild(cardHouse);

  // вставляем фотки
  var photoMove = function () {
    for (var j = 0; j < flat.offer.photos.length; j++) {
      var li = document.createElement('li');
      var img = document.createElement('img');
      img.width = 70;
      img.height = 70;
      li.appendChild(img);
      img.src = flat.offer.photos[j];
      // console.log(li.src);
      photoFragment.appendChild(li);
    }
    photo.appendChild(photoFragment);
  };
  photoMove();
};

renderCardHouse(flats[0]);

