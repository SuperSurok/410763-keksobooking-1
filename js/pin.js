'use strict';
(function () {
  var MAP_PIN_SIZES = {
    width: 62,
    height: 96
  };

  var COORDS_LIMITS = {
    top: 200,
    bottom: 700
  };

  var MAIN_PIN_TOP_OFFSET = 48;
  var PARSE_INT_RADIX = 10;

  var PINS_LIMIT = 5;
  var DEBOUNCE_TIMEOUT_DEFAULT = 500;

  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var mapPin = document.querySelectorAll('.map__pin');
  var map = document.querySelector('.map'); // карта
  var mapPinsCard = document.querySelector('.map__pins'); // блок в котром будут отображены сгенерированные элементы

  var lastTimeout = null;

  var filterForm = document.querySelector('.map__filters');
  var filterType = filterForm.querySelector('#housing-type');
  var filterPrice = filterForm.querySelector('#housing-price');
  var filterRooms = filterForm.querySelector('#housing-rooms');
  var filterGuests = filterForm.querySelector('#housing-guests');
  var featuresFieldSet = filterForm.querySelector('#housing-features');

  var dragPinLimits = {
    minX: 200,
    maxX: map.clientWidth - 200,
    minY: COORDS_LIMITS.top - MAP_PIN_SIZES.height / 2,
    maxY: COORDS_LIMITS.bottom - MAP_PIN_SIZES.height / 2
  };


  var makeActive = function (elements, isActive) {
    for (var i = 0; i < elements.length; i++) {
      if (isActive) {
        elements[i].classList.add('map__pin--active');
      } else {
        elements[i].classList.remove('map__pin--active');
      }
    }
  };

  var pinBindHandler = function (marker, offer) {
    makeActive(document.querySelectorAll('.map__pin.map__pin--active'), false);
    makeActive(marker, true);
    window.showCard.removeCard();
    window.showCard.showCard(offer);
  };

  var pinBind = function (marker, offer) {
    marker.addEventListener('click', function () {
      pinBindHandler([marker], offer);
    });
  };

  // функция создания меток
  function renderMapPinsCard(pinsList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsList.length && i < PINS_LIMIT; i++) {
      var pin = pinsList[i];
      var marker = document.createElement('button');
      marker.style.left = pin.location.x - 4 + 'px';
      marker.style.top = pin.location.y - 40 + 'px';
      marker.className = 'map__pin';
      marker.innerHTML = '<img src="' + pin.author.avatar + '" width="40" height="40" draggable="false">';
      pinBind(marker, pin);
      fragment.appendChild(marker);
    }
    mapPinsCard.appendChild(fragment);
  }


  function mapPinMainHandle(evt) {
    evt.preventDefault();

    // начальные координаты
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {};
    var markerCoords = {};

    // функция перермещения метки
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      // координаты остановки метки
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      markerCoords = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };

      markerCoords.x = (markerCoords.x < dragPinLimits.minX) ? dragPinLimits.minX : markerCoords.x;
      markerCoords.x = (markerCoords.x > dragPinLimits.maxX) ? dragPinLimits.maxX : markerCoords.x;
      markerCoords.y = (markerCoords.y < dragPinLimits.minY - MAIN_PIN_TOP_OFFSET) ? dragPinLimits.minY - MAIN_PIN_TOP_OFFSET : markerCoords.y;
      markerCoords.y = (markerCoords.y > dragPinLimits.maxY - MAIN_PIN_TOP_OFFSET) ? dragPinLimits.maxY - MAIN_PIN_TOP_OFFSET : markerCoords.y;

      mapPinMain.style.left = markerCoords.x + 'px';
      mapPinMain.style.top = markerCoords.y + 'px';
    }


    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var address = document.querySelector('#address');
      address.value = 'x: ' + parseInt(mapPinMain.offsetLeft, PARSE_INT_RADIX) + ', ' + 'y: ' + (parseInt(mapPinMain.offsetTop, PARSE_INT_RADIX) + MAP_PIN_SIZES.height);
      window.map.init();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  }

  mapPinMain.addEventListener('mousedown', mapPinMainHandle);

  // удаляем пины

  var removePins = function () {
    var pins = mapPinsCard.querySelectorAll('.map__pin:not(.map__pin--main)');
    window.showCard.removeCard();
    for (var i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  function debounce(callback, timeout) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(callback, timeout);
  }


  function filterByType(offer, filter) {
    return (filter.type === offer.offer.type);
  }

  function filterByPrice(offer, filter) {
    var result = true;
    switch (filter.price) {
      case 'middle':
        // 10000 - 50000₽
        if (offer.offer.price < 10000 || offer.offer.price > 50000) {
          result = false;
        }
        break;
      case 'low':
        // до 10000₽
        if (offer.offer.price > 10000) {
          result = false;
        }
        break;
      case 'high':
        // от 50000₽
        if (offer.offer.price < 50000) {
          result = false;
        }
        break;
    }
    return result;
  }

  function filterByRooms(offer, filter) {
    return (parseInt(filter.rooms, 10) === parseInt(offer.offer.rooms, 10));
  }

  function filterByGuests(offer, filter) {
    return (parseInt(filter.guests, 10) === parseInt(offer.offer.guests, 10));
  }

  function filterByFeatures(offer, filter) {
    var result = true;
    filter.features.forEach(function (feature) {
      if (offer.offer.features.indexOf(feature) < 0) {
        result = false;
      }
    });
    return result;
  }

  filterForm.addEventListener('change', function () {

    debounce(function () {
      removePins();

      var filters = {
        'type': filterType.value,
        'price': filterPrice.value,
        'rooms': filterRooms.value,
        'guests': filterGuests.value,
        'features': []
      };

      var selectedFeatures = featuresFieldSet.querySelectorAll('input[type=checkbox]:checked');
      selectedFeatures.forEach(function (feature) {
        filters.features.push(feature.value);
      });

      var offers = window.data.flats;
      var filteredOffers = offers;

      if (filters.type !== 'any') {
        filteredOffers = filteredOffers.filter(function (offer) {
          return filterByType(offer, filters);
        });
      }

      if (filters.price !== 'any') {
        filteredOffers = filteredOffers.filter(function (offer) {
          return filterByPrice(offer, filters);
        });
      }

      if (filters.rooms !== 'any') {
        filteredOffers = filteredOffers.filter(function (offer) {
          return filterByRooms(offer, filters);
        });
      }

      if (filters.guests !== 'any') {
        filteredOffers = filteredOffers.filter(function (offer) {
          return filterByGuests(offer, filters);
        });
      }

      if (filters.features.length > 0) {
        filteredOffers = filteredOffers.filter(function (offer) {
          return filterByFeatures(offer, filters);
        });
      }

      renderMapPinsCard(filteredOffers);
    }, DEBOUNCE_TIMEOUT_DEFAULT);

  });
  window.pin = {
    renderMapPinsCard: renderMapPinsCard,
    makeActive: makeActive,
    mapPin: mapPin
  };

})();
