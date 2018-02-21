'use strict';
(function () {
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['flat', 'bungalo', 'hose', 'palace'];
  var FORM_TYPES_MIN_PRICES = [1000, 0, 5000, 10000];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = ['1', '2', '3', '0'];

  // Поля формы
  var form = document.querySelector('.notice__form');
  var formTypeFlat = document.querySelector('#type');
  var formPriceFlat = document.querySelector('#price');
  var formTimein = document.querySelector('#timein');
  var formTimeout = document.querySelector('#timeout');
  var formRoomNumber = document.querySelector('#room_number');
  var formRoomCapacity = document.querySelector('#capacity');
  var formAddress = document.querySelector('#address');
  var formTitle = document.querySelector('#title');

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

  var fieldsSync = function (addListener) {
    syncFormControls(formTimein, formTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues, addListener);
    syncFormControls(formTimeout, formTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues, addListener);
    syncFormControls(formTypeFlat, formPriceFlat, FORM_TYPES, FORM_TYPES_MIN_PRICES, syncFormControlMinValues, addListener);
    syncFormControls(formRoomNumber, formRoomCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncFormControlValues, addListener);
    syncFormControls(formRoomCapacity, formRoomNumber, FORM_ROOM_CAPACITIES, FORM_ROOM_NUMBERS, syncFormControlValues, addListener);
  };

  fieldsSync(true);

  var errorData = function (field, error) {
    field.style.border = (error) ? '1px solid red' : 'none';
  };


  function errorHandle(message) {
    var el = document.createElement('DIV');
    el.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    el.textContent = 'Ошибка отправки формы: ' + message;
    document.body.insertAdjacentElement('afterbegin', el);
  }

  function clearForm() {
    form.reset();
  }

  // валидация формы
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var errors = [];

    // проверка поля адреса
    if (form.value === '') {
      errorData(formAddress, true);
      errors.push(['formAddress', 'Заполните это поле']);
    } else {
      errorData(formAddress, false);
    }

    // проверка поля описания
    if (formTitle.value.length < 30 || formTitle.value.length > 100) {
      errorData(formTitle, true);
      errors.push(['formTitle', 'Заголовок должен быть не меньше 30 и не больше 100 символов']);
    } else {
      errorData(formTitle, false);
    }

    // проверка поля цены
    if (parseInt(formPriceFlat.value, 10) < formPriceFlat.min || parseInt(formPriceFlat.value, 10) > 1000000 || isNaN(parseInt(formPriceFlat.value, 10))) {
      errorData(formPriceFlat, true);
      errors.push(['formPriceFlat', 'Цена должна быть не меньше ' + formPriceFlat.min + ' или не больше ' + 1000000]);
    } else {
      errorData(formPriceFlat, false);
    }

    if (!errors.length) {
      window.backend.upLoad(new FormData(form), clearForm, errorHandle);
    }
  });


  window.form = {
    fieldset: fieldset,
    avatar: avatar,
    images: images
  };
})();

