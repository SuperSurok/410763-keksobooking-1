'use strict';
window.showCard = (function () {

  var ESC_BUTTON = 27;
  var ENTER_BUTTON = 13;

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

  // отображаем метки и карточки квартир на экране
  function showCard(e) {
    var index = e.target.getAttribute('rel');
    if (index) {
      window.card.renderCardHouse(window.data.flats[index]);
    }
  }
  return {
    showCard: showCard
  };
})();
