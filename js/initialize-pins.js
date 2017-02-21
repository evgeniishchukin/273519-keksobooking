'use strict';

// МОДУЛЬ ОТРИСОВКИ ПИНОВ И НАВЕШИВАНИЯ НА НИХ ОЖИДАНИЯ ПО КЛИКУ И КЛАВИШАМ
window.initializePins = (function () {
  // Определяем область в к которой будем находить пины
  var parentElement = document.querySelector('.tokyo__pin-map');

  // ЗАГРУЗКА ДАННЫХ С СЕРВЕРА
  window.load('https://intensive-javascript-server-pedmyactpq.now.sh/keksobooking/data', function (data) {
    // Записываем в массив данные, полученные из JSON
    window.similarApartments = data;
    // Вызываем функцию для отрисовки нового пина
    renderPins(window.similarApartments.length, parentElement);
  });

  // ФУНКЦИЯ ОТРИСОВКИ ПИНОВ ИЗ ШАБЛОНА
  var renderPins = function (amount, array) {
    // Находим шаблон
    var templateElement = document.querySelector('#pin-template');
    // То, что будем копировать в шаблоне
    var elementToClone = templateElement.content.querySelector('.pin');

    // Создаем цикл, чтобы пройтись по пинам
    for (var i = 0; i < amount; i++) {
      // клонируем новый пин из шаблона
      var newPin = elementToClone.cloneNode(true);
      var imageOfPin = newPin.querySelector('.rounded');

      // Изменение аватарки пина
      imageOfPin.src = window.similarApartments[i].author.avatar;

      // Значения координат из data
      newPin.style.left = window.similarApartments[i].location.x + 'px';
      newPin.style.top = window.similarApartments[i].location.y + 'px';

      // Вставляем пин в DOM
      array.appendChild(newPin);
    }
  };

  // НАВЕШИВАНИЕ ОЖИДАНИЯ НА ПИНЫ
  // Определяем теги для поиска нужных пинов и настроек
  var className = 'pin';
  var classNameActive = 'pin--active';

  var ENTER_KEY_CODE = 13;

  // Определяем функцию активирования пинов
  function activateElement(event, parentEl) {
    window.activeElement = event.target;
    var activeElement = window.activeElement;

    while (activeElement !== parentEl) {
      if (activeElement.classList.contains(className)) {
        if (activeElement.classList.contains(classNameActive)) {
          activeElement.classList.remove(classNameActive);
          document.querySelector('.dialog').remove();
          activeElement.setAttribute('aria-pressed', false);
        } else {
          deactivateElements();
          activeElement.classList.add(classNameActive);
          activeElement.setAttribute('aria-pressed', true);
          window.showCard();
        }
        return;
      }
      activeElement = activeElement.parentNode;
    }
  }

  // Определяем функцию деактивирования пинов
  var deactivateElements = function () {
    var elementsArray = document.querySelectorAll('.pin');

    for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].classList.remove(classNameActive);
      elementsArray[i].setAttribute('aria-pressed', false);
    }
  };

  // Определяем функцию проверки нажатия клавишы
  var isActivationEvent = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  // Навешиваем ожидание по клику на пины;
  parentElement.addEventListener('click', function (event) {
    activateElement(event, parentElement);
  });

  // Навешиваем ожидание по нажатию на клавишу на пины;
  parentElement.addEventListener('keydown', function (event) {
    if (isActivationEvent(event)) {
      activateElement(event, parentElement);
      document.querySelector('.dialog__close').focus();
    }
  });

  // Возвращаем в глобальную область функцию проверки нажатия клавиши
  return {
    isActivationEvent: isActivationEvent,

    deactivateElements: deactivateElements
  };
})();
