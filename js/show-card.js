'use strict';

// ФУНКЦИЯ ОТРИСОВКИ ДИАЛОГОВОГО ОКНА
window.showCard = function () {
  var parentDialog = document.querySelector('.tokyo');  // определяем блок, куда будем вставлять шаблон
  var templateDialog = document.querySelector('#dialog-template'); // находим шаблон
  var dialogToClone = templateDialog.content.querySelector('.dialog'); // то что будем копировать в шаблоне

  // Описываем функцию отрисовки диалога
  function renderDialog() {
    // Проверяем есть ли открытые диалоги и если они есть - удаляем
    if (document.querySelector('.dialog')) {
      document.querySelector('.dialog').remove();
    }

    // Определяем номер активного пина, для того, чтобы соотнести с нужным диалогом
    var elementsArray = document.querySelectorAll('.pin');
    var classNameActive = 'pin--active';

    for (var i = 0; i < elementsArray.length; i++) {
      if (elementsArray[i].classList.contains(classNameActive)) {
        var elementIndex = i;
      }
    }

    // Копируем диалог из шаблона
    var newDialog = dialogToClone.cloneNode(true);

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


    dialogAvatar.src = window.similarApartments[elementIndex - 1].author.avatar;
    dialogTitle.innerText = window.similarApartments[elementIndex - 1].offer.title;
    dialogAddress.innerText = window.similarApartments[elementIndex - 1].offer.address;
    dialogPrice.innerText = window.similarApartments[elementIndex - 1].offer.price;
    dialogType.innerText = window.similarApartments[elementIndex - 1].offer.type;
    dialogRoomsAndGuests.innerText = 'Комнат: ' + window.similarApartments[elementIndex - 1].offer.rooms + ', Мест: ' + window.similarApartments[elementIndex - 1].offer.guests;
    dialogCheckinTime.innerHTML = 'Время заезда: ' + window.similarApartments[elementIndex - 1].offer.checkin + '<br>' + 'Время выезда: ' + window.similarApartments[elementIndex - 1].offer.checkout;

    for (i = 0; i < window.similarApartments[elementIndex - 1].offer.features.length; i++) {
      var featureImage = document.createElement('span');

      featureImage.classList.add('feature__image');
      featureImage.classList.add('feature__image--' + window.similarApartments[elementIndex - 1].offer.features[i]);

      dialogFeatures.appendChild(featureImage);
    }

    dialogDescription.innerText = window.similarApartments[elementIndex - 1].offer.description;

    for (i = 0; i < window.similarApartments[elementIndex - 1].offer.photos.length; i++) {
      var dialogPhoto = document.createElement('img');

      dialogPhoto.setAttribute('width', '52');
      dialogPhoto.setAttribute('height', '42');
      dialogPhoto.setAttribute('alt', 'Фотография места');
      dialogPhoto.setAttribute('src', window.similarApartments[elementIndex - 1].offer.photos[i]);

      dialogPhotos.appendChild(dialogPhoto);
    }

    // Вставляем получившийся диалог в указанный блок
    parentDialog.appendChild(newDialog);
  }

  // Запускаем отрисовку диалога
  renderDialog();

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

    window.activeElement.focus();
    document.querySelector('.dialog').remove();
  };

  // Навешиваем обработчик по клику
  dialogNameClose.addEventListener('click', clickHandler);

  // Показываем диалоговое окно
  // dialogName.style.display = 'block';
};
