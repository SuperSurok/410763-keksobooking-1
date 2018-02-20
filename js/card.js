'use strict';
(function () {

  // функция для генерации новых карточек с информацией

  function renderCardHouse(flat, index) {

    var cardHouse = templateCardHouse.cloneNode(true); // клонируем узел целиком
    var features = cardHouse.querySelector('.popup__features');
    var flatType = cardHouse.querySelector('h4');
    var featuresFragment = document.createDocumentFragment(); // создаём фрагмент документа, куда будем вставлять фичи

    cardHouse.querySelector('.popup__avatar').src = flat.author.avatar;
    cardHouse.querySelector('h3').textContent = flat.offer.title;
    cardHouse.querySelector('small').textContent = flat.offer.address;
    cardHouse.querySelector('.popup__price').innerHTML = flat.offer.price + ' &#x20bd;/ночь';
    cardHouse.querySelector('h4').textContent = flat.offer.type;
    cardHouse.querySelector('.popup__features').innerHTML = '';
    flatType.textContent = HOUSE_TYPES[flat.offer.type];

    flatType.nextElementSibling.textContent = flat.offer.rooms + ' комнаты' + ' для ' + flat.offer.guests + ' гостей';
    flatType.nextElementSibling.nextElementSibling.textContent = 'Заезд после ' + flat.offer.checkin + ' ,' + 'выезд до '
      + flat.offer.checkout;


    for (var k = 0; k < flat.offer.features.length; k++) {
      var li = document.createElement('li');
      li.className = 'feature  feature--' + flat.offer.features[k];
      featuresFragment.appendChild(li);
    }

    features.appendChild(featuresFragment);
    features.nextElementSibling.textContent = flat.offer.description;
    document.querySelector('.map').appendChild(cardHouse);
    cardHouse.setAttribute('rel', index);
    return index.innerHTML;

  }

  window.card = {
    renderCardHouse: renderCardHouse
  }

})();
