'use strict';
(function () {

  var IMG_WIDTH = 70;
  var IMG_HEIGHT = 70;

  // функция для генерации новых карточек с информацией
  var renderCardHouse = function (data, cardElement) {

    var cardTitle = cardElement.querySelector('h3');
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardAddress = cardElement.querySelector('small');
    var cardPrice = cardElement.querySelector('.popup__price');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardFlatType = cardElement.querySelector('h4');

    cardTitle.textContent = data.offer.title;
    cardPrice.innerHTML = data.offer.price + ' &#x20bd;/ночь';
    cardAddress.textContent = data.offer.address;
    cardFlatType.textContent = window.data.HoseTypes[data.offer.type];

    cardFlatType.nextElementSibling.textContent = data.offer.rooms + ' комнаты' + ' для ' + data.offer.guests + ' гостей';
    cardFlatType.nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + data.offer.checkin + ' ,' + 'выезд до '
      + data.offer.checkout;

    var featuresFragment = document.createDocumentFragment(); // создаём фрагмент документа, куда будем вставлять фичи

    data.offer.features.forEach(function (elem) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + elem;
      featuresFragment.appendChild(li);
    });

    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(featuresFragment);
    cardFeatures.nextElementSibling.textContent = data.offer.description;
    cardAvatar.src = data.author.avatar;
    return cardElement.innerHTML;

  };

  // вставляем фото в карточку с информацией
  var paintPictures = function (data, cardElement) {

    var pictures = cardElement.querySelector('.popup__pictures');

    var picturesFragment = document.createDocumentFragment();
    for (var j = 0; j < data.offer.photos.length; j++) {
      var picturesEl = document.createElement('li');
      var img = document.createElement('img');
      img.width = IMG_WIDTH;
      img.height = IMG_HEIGHT;
      picturesEl.appendChild(img);
      img.src = data.offer.photos[j];
      picturesEl.src = data.offer.photos;
      picturesFragment.appendChild(picturesEl);
    }
    pictures.innerHTML = '';
    pictures.appendChild(picturesFragment);
    return cardElement.innerHTML;
  };


  window.card = {
    renderCardHouse: renderCardHouse,
    paintPictures: paintPictures
  };

})();
