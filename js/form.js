'use strict';
(function () {
  var FORM_CHECKINS = ['12:00', '13:00', '14:00'];
  var FORM_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FORM_TYPES = ['bungalo', 'flat', 'house', 'palace'];
  var FORM_TYPES_MIN_PRICES = [0, 1000, 5000, 10000];
  var FORM_ROOM_NUMBERS = ['1', '2', '3', '100'];
  var FORM_ROOM_CAPACITIES = [[1], [1, 2], [1, 2, 3], [0]];

  var DEFAULT_AVATAR = 'img/muffin.png';

  // Макс и мин количество символов для описания
  var DESCRIPTION_MIN_SYMBOLS = 30;
  var DESCRIPTION_MAX_SYMBOLS = 100;

  // Макс значение стоимости квартиры
  var MAX_PRICE_FLAT = 1000000;

  // Поля формы
  var form = document.querySelector('.notice__form');
  var formTypeFlat = form.querySelector('#type');
  var formPriceFlat = form.querySelector('#price');
  var formTimein = form.querySelector('#timein');
  var formTimeout = form.querySelector('#timeout');
  var formRoomNumber = form.querySelector('#room_number');
  var formRoomCapacity = form.querySelector('#capacity');
  var formAddress = form.querySelector('#address');
  var formTitle = form.querySelector('#title');
  var formPhotoContainer = form.querySelector('.form__photo-container');

  var fieldset = form.querySelectorAll('fieldset');
  var userAvatar = form.querySelector('#avatar');
  var images = form.querySelector('#images');


  // активация формы
  var disable = function (isDisable) {
    if (isDisable) {
      form.classList.add('notice__form--disabled');
    } else {
      form.classList.remove('notice__form--disabled');
    }
    for (var i = 0; i < fieldset.length; i++) {
      fieldset[i].disabled = isDisable;
    }
  };
  disable(true);


  window.syncFields.syncFormControls(formTimein, formTimeout, FORM_CHECKINS, FORM_CHECKOUTS, window.syncFields.syncFormControlValues);
  window.syncFields.syncFormControls(formTimeout, formTimein, FORM_CHECKOUTS, FORM_CHECKINS, window.syncFields.syncFormControlValues);
  window.syncFields.syncFormControls(formTypeFlat, formPriceFlat, FORM_TYPES, FORM_TYPES_MIN_PRICES, window.syncFields.syncFormControlMinValues);
  window.syncFields.syncFormControls(formRoomNumber, formRoomCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, window.syncFields.setAllowedOptions);


  var clearForm = function () {
    form.reset();
  };

  var errorDataShow = function (field, error) {
    field.style.border = (error) ? '1px solid red' : 'none';
  };


  var messageErrorHandle = function (message) {
    var el = document.createElement('DIV');
    el.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; color: white; font-size: 20px; position: fixed; left: 0; top: 0; width: 100%; padding: 10px;';
    el.textContent = 'Ошибка отправки формы: ' + message;
    document.body.insertAdjacentElement('afterbegin', el);
  };


  var resetAvatar = function () {
    var oldAvatar = document.querySelector('.notice__preview img');
    var newAvatar = oldAvatar.cloneNode(true);
    newAvatar.src = DEFAULT_AVATAR;
    oldAvatar.remove();
    document.querySelector('.notice__preview').appendChild(newAvatar);
  };


  var showImagePreview = function (image, file) {
    var reader = new FileReader();
    reader.onload = function (evt) {
      image.src = evt.target.result;
    };
    reader.readAsDataURL(file);
  };

  var clearPhotoThumbnail = function () {
    var formThumbnails = formPhotoContainer.querySelectorAll('.thumbnail');
    for (var i = 0; i < formThumbnails.length; i++) {
      formThumbnails[i].remove();
    }
  };

  // валидация формы
  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var errors = [];

    // проверка поля адреса
    if (formAddress.value === '') {
      errorDataShow(formAddress, true);
      errors.push(['formAddress', 'Заполните это поле']);
    } else {
      errorDataShow(formAddress, false);
    }

    // проверка поля описания
    if (formTitle.value.length < DESCRIPTION_MIN_SYMBOLS || formTitle.value.length > DESCRIPTION_MAX_SYMBOLS) {
      errorDataShow(formTitle, true);
      errors.push(['formTitle', 'Заголовок должен быть не меньше 30 и не больше 100 символов']);
    } else {
      errorDataShow(formTitle, false);
    }

    // проверка поля цены
    if (parseInt(formPriceFlat.value, 10) < formPriceFlat.min || parseInt(formPriceFlat.value, 10) > MAX_PRICE_FLAT || isNaN(parseInt(formPriceFlat.value, 10))) {
      errorDataShow(formPriceFlat, true);
      errors.push(['formPriceFlat', 'Цена должна быть не меньше ' + formPriceFlat.min + ' или не больше ' + MAX_PRICE_FLAT]);
    } else {
      errorDataShow(formPriceFlat, false);
    }

    if (!errors.length) {
      window.backend.upLoad(new FormData(form), clearForm, messageErrorHandle);
    }
  });


  userAvatar.addEventListener('change', function () {
    if (userAvatar.files && userAvatar.files[0]) {
      showImagePreview(document.querySelector('.notice__preview img'), userAvatar.files[0]);
    }
  });

  images.addEventListener('change', function () {
    clearPhotoThumbnail();
    [].forEach.call(images.files, (function (elem) {
      var imageThumbnailContainer = document.createElement('div');
      imageThumbnailContainer.classList.add('thumbnail');
      imageThumbnailContainer.style.border = '1px solid silver';
      imageThumbnailContainer.style.borderRadius = '5px';
      imageThumbnailContainer.style.height = '100px';
      imageThumbnailContainer.style.padding = '5px';
      imageThumbnailContainer.style.float = 'left';
      imageThumbnailContainer.style.margin = '5px 5px 0px 0';
      var imageThumbnail = document.createElement('img');
      imageThumbnail.style.maxHeight = '100%';
      showImagePreview(imageThumbnail, elem);
      imageThumbnailContainer.appendChild(imageThumbnail);
      formPhotoContainer.appendChild(imageThumbnailContainer);
    }));
  });

  form.addEventListener('reset', function () {
    resetAvatar();
    clearPhotoThumbnail();
  });

  window.form = {
    fieldset: fieldset,
    userAvatar: userAvatar,
    images: images,
    disable: disable
  };
})();

