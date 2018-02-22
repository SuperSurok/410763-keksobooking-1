'use strict';
// модуль синхронизации полей
(function () {
  function syncFormControls(firstControl, secondControl, firstOptions, secondOptions, callbackFunctions) {
    function syncFormControlsClickHandler() {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callbackFunctions(secondControl, secondOptions[indexOfValue]);
    }

    firstControl.addEventListener('change', syncFormControlsClickHandler);
  }

  window.syncFields = {
    syncFormControls: syncFormControls
  };
})();
