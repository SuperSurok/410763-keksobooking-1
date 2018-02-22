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
  var formPhotoContainer = document.querySelector('.form__photo-container');

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

  var initFieldSync = function () {
    window.syncFields.syncFormControls(formTimein, formTimeout, FORM_CHECKINS, FORM_CHECKOUTS, syncFormControlValues);
    window.syncFields.syncFormControls(formTimeout, formTimein, FORM_CHECKOUTS, FORM_CHECKINS, syncFormControlValues);
    window.syncFields.syncFormControls(formTypeFlat, formPriceFlat, FORM_TYPES, FORM_TYPES_MIN_PRICES, syncFormControlMinValues);
    window.syncFields.syncFormControls(formRoomNumber, formRoomCapacity, FORM_ROOM_NUMBERS, FORM_ROOM_CAPACITIES, syncFormControlValues);
    window.syncFields.syncFormControls(formRoomCapacity, formRoomNumber, FORM_ROOM_CAPACITIES, FORM_ROOM_NUMBERS, syncFormControlValues);
  };

  initFieldSync();

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

  var showImagePreview = function (image, file) {
    var reader = new FileReader();
    reader.onload = function (e) {
      image.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  var clearPhotoThumbnail = function () {
    formPhotoContainer.querySelectorAll('.thumbnail').forEach(function (thumbnail) {
      thumbnail.remove();
    })
  };

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


  avatar.addEventListener('change', function () {
    if (avatar.files && avatar.files[0]) {
      showImagePreview(document.querySelector('.notice__preview img'), avatar.files[0]);
    }
  });

  images.addEventListener('change', function () {
    clearPhotoThumbnail();
    if (images.files.length > 0) {
      for (var i = 0; i < images.files.length; i++) {
        var imageThumbnailContainer = document.createElement('div');
        imageThumbnailContainer.classList.add('thumbnail');
        imageThumbnailContainer.style.border = '1px solid silver';
        imageThumbnailContainer .style.borderRadius = '5px';
        imageThumbnailContainer .style.height = '100px';
        imageThumbnailContainer .style.padding = '5px';
        imageThumbnailContainer .style.float = 'left';
        imageThumbnailContainer .style.margin = '5px 5px 0px 0';
        var imageThumbnail = document.createElement('img');
        imageThumbnail.style.maxHeight = '100%';
        showImagePreview(imageThumbnail, images.files[i]);
        imageThumbnailContainer.appendChild(imageThumbnail);
        formPhotoContainer.appendChild(imageThumbnailContainer);
      }
    }
  });

  form.addEventListener('reset', function () {
    clearPhotoThumbnail();
    setTimeout(function () {
      initFieldSync(false)
    }, 100);
  });

  window.form = {
    fieldset: fieldset,
    avatar: avatar,
    images: images
  };
})();

