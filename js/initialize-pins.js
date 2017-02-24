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

  // СОЗДАЕМ ФИЛЬТР
  // Определяем переменные для фильтра
  var pinFilter = document.querySelector('.tokyo__filters-container');
  var filterType = pinFilter.querySelector('#housing_type');
  var filterPrice = pinFilter.querySelector('#housing_price');
  var filterRooms = pinFilter.querySelector('#housing_room-number');
  var filterGuests = pinFilter.querySelector('#housing_guests-number');
  var filterFeatures = pinFilter.querySelector('#housing_features');
  var filterFeatureWifi = filterFeatures.querySelector('[value=wifi]');
  var filterFeatureDishwacher = filterFeatures.querySelector('[value=dishwasher]');
  var filterFeatureParking = filterFeatures.querySelector('[value=parking]');
  var filterFeatureWasher = filterFeatures.querySelector('[value=washer]');
  var filterFeatureElevator = filterFeatures.querySelector('[value=elevator]');
  var filterFeatureConditioner = filterFeatures.querySelector('[value=conditioner]');

  // Определяем объект для хранения переменных фильтра
  var filterParametrs = {};

  // Определяем функцию обновление фильтра
  var updateFilters = function () {
    filterParametrs = {
      'type': filterType.value,
      'price': filterPrice.value,
      'rooms': filterRooms.value,
      'guests': filterGuests.value,
      'features': {
        'wifi': filterFeatureWifi.checked,
        'dishwasher': filterFeatureDishwacher.checked,
        'parking': filterFeatureParking.checked,
        'washer': filterFeatureWasher.checked,
        'elevator': filterFeatureElevator.checked,
        'conditioner': filterFeatureConditioner.checked
      }
    };
  };

  // Запишем в объект существующие параметры
  updateFilters();

  // Запускаем ожидание изменения параметров фильтра
  pinFilter.addEventListener('change', function () {
    var dialog = document.querySelector('.dialog');

    updateFilters();
    if (dialog) {
      dialog.remove();
    }
    renderPins(window.similarApartments.length, parentElement);
  });

  // Создадим массив с данными отрисованных пинов
  var dialogData = [];

  // ФУНКЦИЯ ОТРИСОВКИ ПИНОВ ИЗ ШАБЛОНА
  var renderPins = function (amount, array) {
    // Находим шаблон
    var templateElement = document.querySelector('#pin-template');
    // То, что будем копировать в шаблоне
    var elementToClone = templateElement.content.querySelector('.pin');

    // Удаляем все ранее созданные элементы
    var pins = parentElement.querySelectorAll('.pin');

    if (pins) {
      var elementsArray = document.querySelectorAll('.pin');

      for (var k = 1; k < elementsArray.length; k++) {
        elementsArray[k].remove();
      }
    }

    // Определим функцию на проверку валидности пина
    var validPin = function (index) {
      var apartmentsDataIndex = window.similarApartments[index];
      return (
        // Проверка соответсвия по типу
          (filterParametrs.type === 'any' || filterParametrs.type === apartmentsDataIndex.offer.type) &&
        // Проверка соответсвия по стоимости
          (
            (filterParametrs.price === 'low' && apartmentsDataIndex.offer.price < 10000) ||
            (filterParametrs.price === 'middle' && apartmentsDataIndex.offer.price >= 10000 && apartmentsDataIndex.offer.price <= 50000) ||
            (filterParametrs.price === 'hight' && apartmentsDataIndex.offer.price > 50000)
          ) &&
          // Проверка соответсвия по количеству комнат
          (filterParametrs.rooms === 'any' || +filterParametrs.rooms === apartmentsDataIndex.offer.rooms) &&
          // Проверка соответсвия по количеству гостей
          (filterParametrs.guests === 'any' || +filterParametrs.guests === apartmentsDataIndex.offer.guests) &&
          // Проверка соответсвия по удобствам
          (!filterParametrs.features.wifi || filterParametrs.features && apartmentsDataIndex.offer.features.indexOf('wifi') !== -1) &&
          (!filterParametrs.features.dishwasher || filterParametrs.features && apartmentsDataIndex.offer.features.indexOf('dishwasher') !== -1) &&
          (!filterParametrs.features.parking || filterParametrs.features && apartmentsDataIndex.offer.features.indexOf('parking') !== -1) &&
          (!filterParametrs.features.washer || filterParametrs.features && apartmentsDataIndex.offer.features.indexOf('washer') !== -1) &&
          (!filterParametrs.features.elevator || filterParametrs.features && apartmentsDataIndex.offer.features.indexOf('elevator') !== -1) &&
          (!filterParametrs.features.conditioner || filterParametrs.features && apartmentsDataIndex.offer.features.indexOf('conditioner') !== -1)
        );
    };

    // Обнулим массив с данными
    dialogData = [];

    // Создаем цикл, чтобы пройтись по пинам
    for (var i = 0, j = 0; i < amount; i++) {
      // Определим валидность пина
      validPin(i);

      var apartmentsDataIndex = window.similarApartments[i];

      // Проверяем можно ли данный пин отрисовывать в DOM
      if (validPin(i)) {
        // клонируем новый пин из шаблона
        var newPin = elementToClone.cloneNode(true);
        var imageOfPin = newPin.querySelector('.rounded');

        // Изменение аватарки пина
        imageOfPin.src = apartmentsDataIndex.author.avatar;

        // Значения координат из data
        newPin.style.left = apartmentsDataIndex.location.x + 'px';
        newPin.style.top = apartmentsDataIndex.location.y + 'px';

        // Добавляем информацию об отрисованном элементе в созданный ранее массив
        dialogData[j] = apartmentsDataIndex;
        j++;

        // Вставляем пин в DOM
        array.appendChild(newPin);
      }
    }
    return dialogData;
  };

  // СОЗДАЕМ ФУНКЦИЮ ПЕРЕТАСКИВАНИЯ ГЛАВНОГО ПИНА
  (function () {
    var pinMain = document.querySelector('.pin__main');
    var pinMainParent = document.querySelector('.tokyo');
    var startPoint;

    // Определим координаты окна родителя и дополнительные координаты для расчета пределов перемещения элемента
    var pinMainCoordinates = pinMain.getBoundingClientRect();
    var pinMainParentCoordinates = pinMainParent.getBoundingClientRect();

    // Определим предел перемещения элемента
    var moveLimitX = pinMainParentCoordinates.width - pinMainCoordinates.width / 2;
    var moveLimitY = pinMainParentCoordinates.height - pinMainCoordinates.height;

    // Добавим функцию обработки движения мыши
    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();

      var shift = {
        x: startPoint.x - moveEvent.clientX,
        y: startPoint.y - moveEvent.clientY
      };

      // Зададим ограничение на перемещение элемента
      if (pinMain.offsetLeft - shift.x > moveLimitX) {
        pinMain.style.left = moveLimitX + 'px';
      } else if (pinMain.offsetLeft - shift.x < (0 - pinMainCoordinates.width / 2)) {
        pinMain.style.left = (0 - pinMainCoordinates.width / 2) + 'px';
      } else {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

      if (pinMain.offsetTop - shift.y > moveLimitY) {
        pinMain.style.top = moveLimitY + 'px';
      } else if (pinMain.offsetTop - shift.y < (0 - pinMainCoordinates.height * 0.8)) {
        pinMain.style.top = (0 - pinMainCoordinates.height * 0.8) + 'px';
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      startPoint = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      var pinMainCoordinatesXY = document.querySelector('#address');
      pinMainCoordinatesXY.value = 'x:' + startPoint.x + ' y:' + startPoint.y;
    };

    // Уберем лишнее навешивание обработчиков, для этого объявим переменную проверки перетаскивания
    var isDragging = false;

    // Снимем обработчик нажатия на мышь
    var onMouseUp = function (upEvent) {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      // При снятии нажатия, переменная проверки перетаскивания получит значение false;
      isDragging = false;
    };

    // Навешиваем обработчик нажатия мыши на аватар диалога.
    pinMain.addEventListener('mousedown', function (event) {
      event.preventDefault();

      pinMain.style.zIndex = 101;

      // Проверим, не перетаскиваем ли мы диалог и если да, то снимем старые обработчики нажатия на мышь
      if (isDragging) {
        onMouseUp();
      }

      // При нажатии переменная проверки перетаскивания получит значение true;
      isDragging = true;

      // Сохраним начальные координаты
      startPoint = {
        x: event.clientX,
        y: event.clientY
      };

      // Включим обработчики действий с мышью
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  })();

  // НАВЕШИВАНИЕ ОЖИДАНИЯ НА ПИНЫ
  // Определяем теги для поиска нужных пинов и настроек
  var className = 'pin';
  var classNameActive = 'pin--active';

  var ENTER_KEY_CODE = 13;

  // Определяем функцию активирования пинов
  function activateElement(event, parentEl) {
    window.activeElement = event.target;
    var activeElement = window.activeElement;

    // Выполним проверку при нажатии, является ли данный пин главным, если нет, то выполняем активацию
    if (!activeElement.classList.contains('pin__main') && !activeElement.parentNode.classList.contains('pin__main')) {
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
            window.showCard(dialogData);
          }
          return;
        }
        activeElement = activeElement.parentNode;
      }
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

  // Возвращаем в глобальную область функцию проверки нажатия клавишии
  return {
    isActivationEvent: isActivationEvent,

    deactivateElements: deactivateElements
  };
})();
