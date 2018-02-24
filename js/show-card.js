'use strict';
(function () {

  var ESC_BUTTON = 27;
  // var ENTER_BUTTON = 13;


  var popupClose = document.querySelectorAll('.popup__close');
  var popups = document.querySelectorAll('.popup');
  var OFFER_TEMPLATE = document.querySelector('template').content;

  // скрываем карточки
  var removeCard = function () {
    for (var i = 0; i < popups.length; i++) {
      var popup = popups[i];
      popupClose.addEventListener('click', removeCard);
      popupClose.addEventListener('keydown', popupCloseCrossHandler);
      popup.remove();
    }
    window.pin.makeActive(document.querySelectorAll('.map__pin.map__pin--active'), false);
  };

  popupClose.forEach(function (t) {
    t.addEventListener('click', function () {
      popups.forEach(function (elem) {
        elem.remove();
      });
      window.pin.mapPin.forEach(function (elem) {
        elem.classList.remove('map__pin--active');
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    });
  });

  // удаляем карточку квартиры по нажатию ESCAPE
  var popupCloseCrossHandler = function (e) {
    if (e.keyCode === ESC_BUTTON) {
      popups.forEach(function (elem) {
        elem.remove();
      });
      document.removeEventListener('keydown', popupCloseCrossHandler);
    }
  };

  document.addEventListener('keydown', popupCloseCrossHandler);

  // отображаем метки и карточки квартир на экране
  function showCard(offer) {
    // генерация карточки
    var offerElement = OFFER_TEMPLATE.querySelector('article.map__card').cloneNode(true);

    offerElement.innerHTML = window.card.renderCardHouse(offer, offerElement);

    // добавить в дом элемент карточки с данными
    var mapPins = document.querySelector('.map__pins');
    mapPins.insertAdjacentHTML('afterend', offerElement.outerHTML);

    var closeButton = document.querySelector('.popup__close');

    // повесить бинды
    closeButton.addEventListener('click', removeCard);
    document.addEventListener('keydown', popupCloseCrossHandler);
    // closeButton.addEventListener('keydown', onClosePressEnter);
  }

  window.showCard = {
    showCard: showCard,
    removeCard: removeCard
  };
})();
