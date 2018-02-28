'use strict';
// модуль синхронизации полей
(function () {
  var syncFormControls = function (firstControl, secondControl, firstOptions, secondOptions, callbackFunctions) {
    var syncFormControlsClickHandler = function () {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callbackFunctions(secondControl, secondOptions[indexOfValue]);
    };

    firstControl.addEventListener('change', syncFormControlsClickHandler);
  };

  window.syncFields = {
    syncFormControls: syncFormControls
  };
})();
