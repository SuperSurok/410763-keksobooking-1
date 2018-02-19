'use strict';
(function () {
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
  };

  var fragmentPins = document.createDocumentFragment();

  for (var i = 0; i < window.data.flats.length; i++) {
    fragmentPins.appendChild(renderMapPinsCard(window.data.flats[i], i));
  }
  mapPinsCard.appendChild(fragmentPins);

  window.pin = {
    renderMapPinsCard: renderMapPinsCard
  }

})();
