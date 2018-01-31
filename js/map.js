// исходные данные

var HOSE_HOST = [];

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
  'bungalo'
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
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg'
];

// сюда поместим квартиры
var flats = [];

// функция генерации случайного числа
var getRandomNumber = function (min, max) {
  var RandomNumber = Math.floor(min + Math.random() * (max + 1 - min));
  return RandomNumber;
};

// получить случайный элемент массива
var getRandomItem = function (array) {
  var randomNumber = Math.floor(Math.random() * array.length);
  return randomNumber;
};

// функция получения уникальных фич HOSE_FEATURES
/* Проходим по массиву со значениями. Добавляем в объект элемент и присваиваем ему единицу.
Если элементу не присвоена единица - присваиваем. Если встречается дубликат, делаем проверку.
Если ключ:значению присвоена единица, то в массив его больше не добавляем. Понадобятся пустой объект и пустой массив. */

var getUniqueFeatures = function (array) {
  var uniqueFeatures = {}; // новый объект
  var resultUniqueFeatures = []; // массив для новых фич
  for (var i = 0; i < array.length; i++) {
    var key = array[i];
    if (uniqueFeatures[key] !== 1) {
      uniqueFeatures[key] = 1;
      resultUniqueFeatures.push(key);
    }
  }
  return resultUniqueFeatures;
};


// функция для получения случайных фич из массива resultUniqueFeatures
var getRandomFeatures = function (array) {
  var randomFeatures = getRandomNumber(1, array.length); // генерим случаное количество фич
  var randomFeaturesList = []; // массив куда сложим фичи из строки выше
  for (var i = 0; i < randomFeatures; i++) { // проходимся по количеству фич
    randomFeaturesList.push(getRandomItem(array)); // вставляем в массив фич случаный элемент
  }
  return getUniqueFeatures(randomFeaturesList);
};


// создаём разные варианты квартир

var getVariantsFlats = function () {
  for (var i = 0; i < 8; i++) {
    var addressX = getRandomNumber(300, 900);
    var addressY = getRandomNumber(150, 500);

    flats.push({
      author: {
        avatar: 'img/avatar/user' + '0' + i + 'png'
      },
      offer: {
        title: getRandomItem(HOUSE_TILES),
        address: addressX + ',' + addressY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomItem(HOUSE_TYPE),
        rooms: getRandomNumber(1, 5),
        guests: getRandomNumber(1.10),
        checkin: getRandomItem(HOUSE_CHECKIN_CHECKOUT),
        checkout: getRandomItem(HOUSE_CHECKIN_CHECKOUT),
        features: getRandomFeatures(HOUSE_FEATURES),
        description: '',
        photos: HOSE_PHOTOS
      },
      location: {
        x: getRandomNumber(300, 900),
        y: getRandomNumber(150, 500)
      }
    })
  }
  return flats;
};

getVariantsFlats();


// активируем карту
var map = document.querySelector('.map');
map.classList.remove('map--faded');


// записываем данные карточки в разметку
var templateCardHouse = document.querySelector('template').content.querySelector('.map__card');

var renderCardHouse = function (flat, index) {
  var cardHouse = templateCardHouse.cloneNode(true);
  var features = cardHouse.querySelector('.popup__features');
  var flatType = cardHouse.querySelector('h4');
  var popupClose = cardHouse.querySelector('.popup__close');

  cardHouse.querySelector('.popup__avatar').textContent = flat.author.avatar;
  cardHouse.querySelector('h3').textContent = flat.offer.title;
  cardHouse.querySelector('small').textContent = flat.offer.address;
  cardHouse.querySelector('.popup__price').textContent = flat.offer.price + ' &#x20bd;/ночь';
  cardHouse.querySelector('h4').textContent = flat.offer.type;
  cardHouse.querySelector('.popup__features').innerHTML = '';
  cardHouse.querySelector('.popup__pictures').innerHTML = '';
  cardHouse.querySelector();

  var fragment = document.createDocumentFragment();
};
