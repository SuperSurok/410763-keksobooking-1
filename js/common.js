'use strict';
(function () {
  // генерим случайное число
  window.getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };


// получить случайный элемент массива
  window.getRandItem = function (array) {
    var randItem = Math.floor(Math.random() * array.length);
    return array[randItem];
  };

})();
