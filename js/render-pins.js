'use strict';

// отрисовка пинов из шаблона

window.renderPins = function (amount, array) {
  var templateElement = document.querySelector('#pin-template'); // находим шаблон
  var elementToClone = templateElement.content.querySelector('.pin'); // то что будем копировать в шаблоне



  // создаем цикл, чтоб пройтись по пинам
  for (var i = 0; i < amount; i++) {
    var newPin = elementToClone.cloneNode(true); // клонируем новый пин из шаблона
    var imageOfPin = newPin.querySelector('.rounded');


    imageOfPin.src = window.similarApartments[i].author.avatar;
    // var imageOfElement = newPin.content.querySelector('.rounded');
    // console.log(imageOfElement);

    // значения координат из data
    newPin.style.left = window.similarApartments[i].location.x + 'px';
    newPin.style.top = window.similarApartments[i].location.y + 'px';

    array.appendChild(newPin); // вставляем пин в DOM
  }
};
