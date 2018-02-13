'use strict';
(function () {
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'hose', 'palace'];
  var FORM_TYPES_MIN_PRICES = [1000, 0, 5000, 10000];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = ['1', '2', '3', '0'];

  // Поля формы
  var formTypeFlat = document.querySelector('#type');
  var formPriceFlat = document.querySelector('#price');
  var formTimein = document.querySelector('#timein');
  var formTimeout = document.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formRoomCapacity = document.querySelector('#capacity');
  var button = document.querySelector('.form__submit');

  // Синхронизация атрибутов value
  function syncFormControlValues(element, value) {
    element.value = value;
  }

  // Задаём значение с минимальной ценой для типа квартиры
  function syncFormControlMinValues(element, value) {
    element.min = value;
  }


  // Синохронизируем поля формы
  function syncFormControls(firstControl, secondControl, firstOptions, secondOptions, callBackFunction) {
    function syncFormControlsClickHandler() {
      var indexOfValue = firstOptions.indexOf(firstControl.value);
      callBackFunction(secondControl, secondOptions[indexOfValue]);
    }

    firstControl.addEventListener('change', syncFormControlsClickHandler);
  }

  syncFormControls(formTimein, formTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues);
  syncFormControls(formTimeout, formTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues);
  syncFormControls(formTypeFlat, formPriceFlat, FORM_TYPES, FORM_TYPES_MIN_PRICES, syncFormControlMinValues);
  syncFormControls(formRoomNumber, formRoomCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncFormControlValues);
  syncFormControls(formRoomCapacity, formRoomNumber, FORM_ROOM_CAPACITIES, FORM_ROOM_NUMBERS, syncFormControlValues);

  // очистка формы после отправки данных на сервер
  form.addEventListener('submit', function (e) {
    form.reset();
    e.preventDefault();
  });
})();

