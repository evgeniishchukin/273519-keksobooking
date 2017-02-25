'use strict';

// ФУНКЦИЯ ОТРИСОВКИ ДИАЛОГОВОГО ОКНА
(function () {
  window.showCard = function (dialogData, activeElement) {
    var parentDialog = document.querySelector('.tokyo');  // определяем блок, куда будем вставлять шаблон
    var templateDialog = document.querySelector('#dialog-template'); // находим шаблон
    var dialogToClone = templateDialog.content.querySelector('.dialog'); // то что будем копировать в шаблоне

    // Описываем функцию отрисовки диалога
    function renderDialog() {
      // Определяем номер активного пина, для того, чтобы соотнести с нужным диалогом
      var elementsArray = document.querySelectorAll('.pin');
      var classNameActive = 'pin--active';

      for (var i = 0; i < elementsArray.length; i++) {
        if (elementsArray[i].classList.contains(classNameActive)) {
          var dialogDataIndex = dialogData[i - 1];
          break;
        }
      }

      // Копируем диалог из шаблона
      var newDialog = dialogToClone.cloneNode(true);

      // Задаем переменную перевода наименования жилья
      var types = {
        'flat': 'Квартира',
        'bungalo': 'Бунгало',
        'house': 'Дом'
      };

      // Наполняем диалог содержимым
      var dialogAvatar = newDialog.querySelector('.dialog__avatar');
      var dialogTitle = newDialog.querySelector('.lodge__title');
      var dialogAddress = newDialog.querySelector('.lodge__address');
      var dialogPrice = newDialog.querySelector('.lodge__price');
      var dialogType = newDialog.querySelector('.lodge__type');
      var dialogRoomsAndGuests = newDialog.querySelector('.lodge__rooms-and-guests');
      var dialogCheckinTime = newDialog.querySelector('.lodge__checkin-time');
      var dialogFeatures = newDialog.querySelector('.lodge__features');
      var dialogDescription = newDialog.querySelector('.lodge__description');
      var dialogPhotos = newDialog.querySelector('.lodge__photos');


      dialogAvatar.src = dialogDataIndex.author.avatar;
      dialogTitle.innerText = dialogDataIndex.offer.title;
      dialogAddress.innerText = dialogDataIndex.offer.address;
      dialogPrice.innerText = dialogDataIndex.offer.price + ' руб./сутки';
      dialogType.innerText = types[dialogDataIndex.offer.type];
      dialogRoomsAndGuests.innerText = 'Комнат: ' + dialogDataIndex.offer.rooms + ', Мест: ' + dialogDataIndex.offer.guests;
      dialogCheckinTime.innerHTML = 'Время заезда: ' + dialogDataIndex.offer.checkin + '<br>' + 'Время выезда: ' + dialogDataIndex.offer.checkout;

      for (i = 0; i < dialogDataIndex.offer.features.length; i++) {
        var featureImage = document.createElement('span');

        featureImage.classList.add('feature__image');
        featureImage.classList.add('feature__image--' + dialogDataIndex.offer.features[i]);

        dialogFeatures.appendChild(featureImage);
      }

      dialogDescription.innerText = dialogDataIndex.offer.description;

      for (i = 0; i < dialogDataIndex.offer.photos.length; i++) {
        var dialogPhoto = document.createElement('img');

        dialogPhoto.setAttribute('width', '52');
        dialogPhoto.setAttribute('height', '42');
        dialogPhoto.setAttribute('alt', 'Фотография места');
        dialogPhoto.setAttribute('src', dialogDataIndex.offer.photos[i]);

        dialogPhotos.appendChild(dialogPhoto);
      }

      // Вставляем получившийся диалог в указанный блок
      parentDialog.appendChild(newDialog);

      // Удаляем старые диалоги
      var dialogs = document.querySelectorAll('.dialog');

      if (dialogs.length > 1) {
        for (i = 0; i < dialogs.length - 1; i++) {
          dialogs[i].remove();
        }
      }
    }

    // Запускаем отрисовку диалога
    renderDialog();

    // СОЗДАЕМ ФУНКЦИЮ ПЕРЕТАСКИВАНИЯ ДИАЛОГА
    (function () {
      var dialog = document.querySelector('.dialog');
      var dialogPanel = dialog.querySelector('.dialog__panel');
      var dialogTitle = dialog.querySelector('.dialog__title');
      var dialogAvatarHandler = dialog.querySelector('.dialog__avatar');
      var startPoint;

      // Определим координаты окна родителя и дополнительные координаты для расчета пределов перемещения элемента
      var dialogParentCoordinates = dialog.parentNode.getBoundingClientRect();
      var dialogCoordinates = dialog.getBoundingClientRect();
      var dialogPanelCoordinates = dialogPanel.getBoundingClientRect();
      var dialogTitleCoordinates = dialogTitle.getBoundingClientRect();

      // Определим предел перемещения элемента
      var moveLimitX = dialogParentCoordinates.width - dialogCoordinates.width;
      var moveLimitY = dialogParentCoordinates.height - (dialogPanelCoordinates.height + dialogTitleCoordinates.height);

      // Добавим функцию обработки движения мыши
      var onMouseMove = function (moveEvent) {
        moveEvent.preventDefault();

        var shift = {
          x: startPoint.x - moveEvent.clientX,
          y: startPoint.y - moveEvent.clientY
        };

        // Зададим ограничение на перемещение элемента
        if (dialog.offsetLeft - shift.x > moveLimitX) {
          dialog.style.left = moveLimitX + 'px';
        } else if (dialog.offsetLeft - shift.x < 0) {
          dialog.style.left = 0;
        } else {
          dialog.style.left = (dialog.offsetLeft - shift.x) + 'px';
        }

        if (dialog.offsetTop - shift.y > moveLimitY) {
          dialog.style.top = moveLimitY + 'px';
        } else if (dialog.offsetTop - shift.y < 0) {
          dialog.style.top = 0;
        } else {
          dialog.style.top = (dialog.offsetTop - shift.y) + 'px';
        }

        startPoint = {
          x: moveEvent.clientX,
          y: moveEvent.clientY
        };
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
      dialogAvatarHandler.addEventListener('mousedown', function (event) {
        event.preventDefault();

        dialog.style.zIndex = 100;

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

    var removeOldDialog = function (oldDialog) {
      if (oldDialog) {
        oldDialog.remove();
      }
    };

    // Определяем элементы для работы с диалогом
    var dialogNameClose = document.querySelector('.dialog__close');

    // Определяем обработчики ожидания
    var clickHandler = function () {
      dialogClose();
      window.initializePins.deactivateElements();
    };

    var keyHandler = function () {
      if (window.initializePins.isActivationEvent(event)) {
        dialogClose();
        window.initializePins.deactivateElements();
      }
    };

    // Определяем функцию закрытия диалога
    var dialogClose = function () {
      dialogNameClose.removeEventListener('click', clickHandler);
      dialogNameClose.removeEventListener('keydown', keyHandler);

      activeElement.focus();
      document.querySelector('.dialog').remove();
    };

    // Навешиваем обработчик по клику
    dialogNameClose.addEventListener('click', clickHandler);
  };
})();
