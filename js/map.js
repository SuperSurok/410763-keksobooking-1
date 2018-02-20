'use strict';
(function () {

// Элементы разметки
  var form = document.querySelector('.notice__form'); // форма
  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта


// активируем карту
  mapPinMain.addEventListener('mouseup', function () {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');

    // отображаем метки и карточки квартир на экране
    window.pin.mapPin.forEach(function (elem) {
      elem.style.display = 'block';
      elem.addEventListener('click', function (e) {
        var index = e.target.getAttribute('rel');
        if (index) {
          window.card.renderCardHouse(window.data.flats[index]);
        }
      });
    });
    window.form.fieldset.forEach(function (elem) {
      elem.removeAttribute('disabled');
    });
    // делаем неактивными поля загруки файлов
    window.form.avatar.removeAttribute('disabled');
    window.form.images.removeAttribute('disabled');
  });

  var mapInited = false;

  function init() {
    if (!mapInited) {
      var map = document.querySelector('.map');
      map.classList.remove('map--fadded');
      window.data.getOffersFromServer(function () {
        window.pin.renderMapPinsCard(window.data.flats);
      });
      mapInited = true;
    }
  }

  window.map = {
    init: init
  }

})();
