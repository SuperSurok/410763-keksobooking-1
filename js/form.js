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

  var fieldset = document.querySelectorAll('fieldset');
  var avatar = document.querySelector('#avatar');
  var images = document.querySelector('#images');


  // делаем неактивными поля загруки файлов
  avatar.setAttribute('disabled', 'disabled');
  images.setAttribute('disabled', 'disabled');

  // делаем неактивными поля формы
  fieldset.forEach(function (elem) {
    elem.setAttribute('disabled', 'disabled');
  });

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

  var form = document.querySelector('.notice__form');
  form.addEventListener('submit', function (e) {
    window.backend.upLoad(new FormData(form), function (response) {
      form.classList.add('notice__form--disabled');
    });
    e.preventDefault();
  });

  window.form = {
    fieldset: fieldset,
    avatar: avatar,
    images: images
  }
})();
