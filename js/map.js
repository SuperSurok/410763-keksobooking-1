'use strict';
(function () {

  var mapInited = false;

  function init() {
    if (!mapInited) {
      var map = document.querySelector('.map');
      map.classList.remove('map--faded');
      window.form.disable(false);
      window.data.getOffersFromServer(function () {
        window.pin.renderMapPinsCard(window.data.flats);
      });
      mapInited = true;
    }
  }

  window.map = {
    init: init
  };

})();
