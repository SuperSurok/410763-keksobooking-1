'use strict';
(function () {
  var CODE_SUCCESS = 200;
  var TIME_OUT = 4000;
  function init (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIME_OUT;

    xhr.addEventListener('load', function () {
      if (xhr.status = CODE_SUCCESS) {
        onSuccess(xhr.response);
      } else {
        onError('Error ' + xhr.status);
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Запорс не выполнился за ' + xhr.timeout + 'мс');
    });
    return xhr;
  }

  // отправить на сервер
  function upLoad(data, onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking';
    var xhr = init(onLoad, onError);
    xhr.open('POST', URL);
    xhr.send(data);
  }

  // получение данных с сервера
  function load(onLoad, onError) {
    var URL = 'https://js.dump.academy/keksobooking/data';
    var xhr = init(onLoad, onError);
    xhr.open('GET', URL + '/data');
    xhr.send();
  }

  function getOffersFromServer(callback) {
    load(function (data) {
      window.flats = data;
      if (callback !== 'undefined') {
        callback();
      }
    });
  }


  window.backend = {
    upLoad: upLoad,
    load: load,
    getOffersFromServer: getOffersFromServer
  }
})();
