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

  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта

  var dragPinLimits = {
    minX: 200,
    maxX: map.clientWidth - 200,
    minY: COORDS_LIMITS.top - MAP_PIN_SIZES.height / 2,
    maxY: COORDS_LIMITS.bottom - MAP_PIN_SIZES.height / 2
  };

  // Скрываем метки после загрузки страницы
  var mapPin = document.querySelectorAll('.map__pin');
  mapPin.forEach(function (t) {
    t.style.display = 'none';
    t.classList.remove('map__pin--active');
  });

  // главная метка видна после загрузки страницы
  mapPinMain.style.display = 'block';


  // добавляем класс метке по клику
  mapPin.forEach(function (t) {
    t.addEventListener('click', function (e) {
      mapPin.forEach(function () {
        mapPinMain.classList.remove('map__pin--active');
        t.className = t.className.replace('map__pin--active', '');
        e.currentTarget.classList.add('map__pin--active');
      });
    });
  });

// добавляем активный класс метке по нажатию ENTER
  mapPin.forEach(function (elem) {
    elem.addEventListener('keydown', function (e) {
      mapPin.forEach(function (t) {
        if (e.keyCode === ENTER_BUTTON) {
          t.className = t.className.replace('map__pin--active', '');
          e.currentTarget.classList.add('map__pin--active');
        }
      });
    });
  });


  // создаём шаблон меток
  var templateMapPin = document.querySelector('template').content.querySelector('.map__pin');

// блок в котром будут отображены сгенерированные элементы
  var mapPinsCard = document.querySelector('.map__pins');

// функция создания меток
  function renderMapPinsCard(pinsList) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pinsList.length && i < PINS_LIMIT; i++) {
      var pin = pinsList[i];
      var marker = document.createElement('button');
      marker.style.left = pin.location.x - 4 + 'px';
      marker.style.top = pin.location.y - 40 + 'px';
      marker.className = 'map__pin';
      marker.innerHTML = '<img src="' + pin.author.avatar +'" width="40" height="40" draggable="false">';
      fragment.appendChild(marker);
    }
    mapPinsCard.appendChild(fragment);
  }


  function mapPinMainHandle(e) {
    e.preventDefault();

    // начальные координаты
    var startCoords = {
      x: e.clientX,
      y: e.clientY
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


    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      var address = document.querySelector('#address');
      address.value = 'x: ' + parseInt(mapPinMain.offsetLeft, PARSE_INT_RADIX) + ', ' + 'y: ' + (parseInt(mapPinMain.offsetTop, PARSE_INT_RADIX) + MAP_PIN_SIZES.height);
      window.map.init();
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  }

  mapPinMain.addEventListener('mousedown', mapPinMainHandle);

  window.pin = {
    renderMapPinsCard: renderMapPinsCard,
    mapPin: mapPin
  }

})();
