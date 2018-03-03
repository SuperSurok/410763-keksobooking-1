'use strict';
(function () {
  // создаём объект с типами квартир
  var HoseTypes = {
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'palace': 'Дворец'
  };

  var flats = [];

  var photos = [];

  var errorHandler = function (message) {
    var el = document.createElement('DIV');
    el.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    el.textContent = 'Ошибка отправки формы: ' + message;
    document.body.insertAdjacentHTML('afterbegin', el);
  };

  var getOffersFromServer = function (callback) {
    window.backend.load(function (data) {
      window.data.flats = data;
      window.data.photos = data;
      if (typeof (callback) === 'function') {
        callback();
      }
    }, function (message) {
      errorHandler(message);
    });
  };

  window.data = {
    getOffersFromServer: getOffersFromServer,
    flats: flats,
    HoseTypes: HoseTypes,
    photos: photos
  };
})();
