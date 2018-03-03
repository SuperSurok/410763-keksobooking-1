'use strict';
// модуль синхронизации полей
(function () {
  var syncFormControls = function (firstControl, secondControl, firstOptions, secondOptions, callbackFunctions) {
    if (typeof callbackFunctions === 'function') {
      callbackFunctions(secondControl, secondOptions[firstOptions.indexOf(firstControl.value)]);
    }
    var syncFormControlsClickHandler = function () {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callbackFunctions(secondControl, secondOptions[indexOfValue]);
    };

    firstControl.addEventListener('change', syncFormControlsClickHandler);
  };

  function setAllowedOptions(element, allowedOptions) {

    var options = element.querySelectorAll('option');
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = allowedOptions.indexOf(parseInt(options[i].value, 10)) === -1;
    }
    element.value = allowedOptions[0];
  }

  window.syncFields = {
    syncFormControls: syncFormControls,
    setAllowedOptions: setAllowedOptions
  };
})();
