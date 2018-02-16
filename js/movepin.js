'use strict';
window.map = (function () {
  var MAP_PIN_SIZES = {
    width: 62,
    height: 92
  };

  var COORDS_LIMITS = {
    top: 200,
    bottom: 700
  };

  var mapPinMain = document.querySelector('.map__pin--main'); // главная метка
  var map = document.querySelector('.map'); // карта


  function mapPinMainHandle(e) {
    e.preventDefault();

    // координаты курсора на объекте
    var startCoords = {
      x: e.clientX,
      y: e.clientY
    };

    // функция перермещения метки
    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var dragPinLimits = {
        minX: 0,
        minY: COORDS_LIMITS.top - MAP_PIN_SIZES.height / 2,
        maxX: map.clientWidth,
        maxY: COORDS_LIMITS.bottom - MAP_PIN_SIZES.height / 2
      };

      // координаты остановки метки
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // пермещение метки
      if ((startCoords.x >= dragPinLimits.minX && startCoords.x <= dragPinLimits.maxX) &&
        (startCoords.y >= dragPinLimits.minY && startCoords.y <= dragPinLimits.maxY)) {

        mapPinMain.style.left = startCoords.x + 'px';
        mapPinMain.style.top = startCoords.y + 'px';

        var address = document.querySelector('#address');
        address.value = 'x: ' + startCoords.x + ', ' + 'y: ' + (startCoords.y + MAP_PIN_SIZES.height / 2);

      }
    }


    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  }

  mapPinMain.addEventListener('mousedown', mapPinMainHandle);
})();
