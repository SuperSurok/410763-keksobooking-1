'use strict';
window.showCard = (function () {
  // отображаем метки и карточки квартир на экране
  function showCard(e) {
    var index = e.target.getAttribute('rel');
    if (index) {
      window.card.renderCardHouse(window.data.flats[index]);
    }
  }
  return {
    showCard: showCard
  };
})();
