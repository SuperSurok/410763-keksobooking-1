'use strict';
// модуль синхронизации полей
(function () {

  // Синхронизация атрибутов value
  var syncFormControlValues = function (element, value) {
    element.value = value;
  };

  // Задаём значение с минимальной ценой для типа квартиры
  var syncFormControlMinValues = function (element, value) {
    element.min = value;
  };

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
    setAllowedOptions: setAllowedOptions,
    syncFormControlValues: syncFormControlValues,
    syncFormControlMinValues: syncFormControlMinValues
  };
})();
