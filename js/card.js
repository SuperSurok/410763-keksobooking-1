'use strict';
(function () {

  // функция для генерации новых карточек с информацией

  var renderCardHouse = function (data, cardElement) {

    var cardTitle = cardElement.querySelector('h3');
    var cardAvatar = cardElement.querySelector('.popup__avatar');
    var cardAddress = cardElement.querySelector('small');
    var cardPrice = cardElement.querySelector('.popup__price');
    var cardFeatures = cardElement.querySelector('.popup__features');
    var cardFlatType = cardElement.querySelector('h4');
    var pictures = cardElement.querySelector('.popup__pictures');


    cardTitle.textContent = data.offer.title;
    cardPrice.innerHTML = data.offer.price + ' &#x20bd;/ночь';
    cardAddress.textContent = data.offer.address;
    cardFlatType.textContent = window.data.HoseTypes[data.offer.type];

    cardFlatType.nextElementSibling.textContent = data.offer.rooms + ' комнаты' + ' для ' + data.offer.guests + ' гостей';
    cardFlatType.nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + data.offer.checkin + ' ,' + 'выезд до '
      + data.offer.checkout;

    var featuresFragment = document.createDocumentFragment(); // создаём фрагмент документа, куда будем вставлять фичи
    for (var k = 0; k < data.offer.features.length; k++) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + data.offer.features[k];
      featuresFragment.appendChild(li);
    }

    var picturesFragment = document.createDocumentFragment();
    for (var j = 0; j < data.offer.photos.length; j++) {
      var picturesEl = document.createElement('li');
      var img = document.createElement('img');
      img.width = 70;
      img.height = 70;
      picturesEl.appendChild(img);
      img.src = data.offer.photos[j];
      picturesEl.src = data.offer.photos;
      picturesFragment.appendChild(picturesEl);
    }
    pictures.innerHTML = '';
    pictures.appendChild(picturesFragment);

    cardFeatures.innerHTML = '';
    cardFeatures.appendChild(featuresFragment);
    cardFeatures.nextElementSibling.textContent = data.offer.description;
    cardAvatar.src = data.author.avatar;
    return cardElement.innerHTML;

  };

  window.card = {
    renderCardHouse: renderCardHouse
  };

})();
