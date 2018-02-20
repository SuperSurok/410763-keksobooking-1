'use strict';
(function () {

// функция для получения уникальных фич квартиры из массива HOUSE_FEATURES

  /* Проходим по массиву со значениями. Добавляем в объект элемент и присваиваем ему единицу.
  Если элементу не присвоена единца - присваиваем. Если встречается дубликат делаем проверку,
  если ключ-значению объекта присвоена единица, то в масиив его больше не добавляем. */

  // function getUniqueFeatures(array) {
  //   var obj = {}; // пустой объект
  //   var resultFeatures = []; // результатирующий массив куда будем складывать полученные значения
  //
  //   // цикл для получения данных
  //   for (var i = 0; i < array.length; i++) {
  //     var item = array[i];
  //     if (obj[item] !== 1) {
  //       obj[item] = 1;
  //       resultFeatures.push(item);
  //     }
  //   }
  //   return resultFeatures;
  // }


// // функция для получения случайных элементов из массива с фичами resultFeatures
//   function getRandomFeatures(array) {
//
//     var randomFeaturesLength = getRandomNumber(1, array.length); // генерим случайную длинну массива
//     var result = []; // результатирующий массив. Равен случайной длинне из строки выше
//
//     for (var j = 0; j < randomFeaturesLength; j++) { // проходимся циклом по этой длинне
//       result.push(getRandItem(array)); // вставляем в результирующий массив случайный элемент массива
//     }
//     return getUniqueFeatures(result);
//   }


// // создаём разные варианты квартир
//   function getVariantFlats() {
//
//     for (var i = 1; i <= 8; i++) {
//
//       var addressesX = window.getRandomNumber(300, 900);
//       var addressesY = getRandomNumber(100, 500);
//
//       flats.push({
//         author: {
//           avatar: 'img/avatars/user' + '0' + i + '.png'
//         },
//         offer: {
//           title: getRandItem(TITLES),
//           address: addressesX + ',' + addressesY,
//           price: getRandomNumber(1000, 1000000),
//           type: getRandItem(TYPES),
//           rooms: getRandomNumber(1, 5),
//           guests: getRandomNumber(1, 10),
//           checkin: getRandItem(TIME_FOR_ARRIVAL_AND_DEPATURE),
//           checkout: getRandItem(TIME_FOR_ARRIVAL_AND_DEPATURE),
//           features: getRandomFeatures(HOUSE_FEATURES),
//           photos: [],
//           description: ''
//         },
//         location: {
//           x: addressesX,
//           y: addressesY
//         }
//       });
//     }
//     return flats;
//   }
//
//   getVariantFlats();

  // // создаём шаблон карточек квартир
  // var templateCardHouse = document.querySelector('template').content.querySelector('.map__card');


  // создаём объект с типами квартир
  var HOUSE_TYPES = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  // массив куда будем записывать все данные
  var flats = [];

  var checkInCheckOut = ['12:00', '13:00', '14:00'];

  function errorHandler(meaasgae) {
    var el = document.createElement('DIV');
    el.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; ' +
      'position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    el.textContent = 'Ошибка отправки формы: ' + meaasgae;
    document.body.insertAdjacentHTML('afterbegin', el);
  }

  function getOffersFromServer(callback) {
    window.backend.load(function (data) {
      window.data.offers = data;
      if (callback !== 'undefinde') {
        callback();
      }
    }, function (message) {
      errorHandler(message);
    });
  }

  window.data = {
    getOffersFromServer: getOffersFromServer,
    flats: flats,
    HOUSE_TYPES: HOUSE_TYPES,
    checkInCheckOut: checkInCheckOut
  }

})();
