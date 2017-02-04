'use strict';

var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var noticeAddress = document.querySelector('#address');
var noticeCapacity = document.querySelector('#capacity');
var noticeCapacityOptions = noticeCapacity.getElementsByTagName('option');
var noticeCapacities = [
  '3',
  '0'
];
var noticePrice = document.querySelector('#price');
var noticeRoomNumber = document.querySelector('#room_number');
var noticeRoomNumberOptions = noticeRoomNumber.getElementsByTagName('option');
var noticeRoomNumbers = [
  '1',
  '2',
  '100'
];
var noticeTimeIn = document.querySelector('#time');
var noticeTimeOut = document.querySelector('#timeout');
var noticeTimeInOptions = noticeTimeIn.getElementsByTagName('option');
var noticeTimeOutOptions = noticeTimeOut.getElementsByTagName('option');
var noticeTitle = document.querySelector('#title');
var noticeType = document.querySelector('#type');
var noticeTypeOptions = noticeType.getElementsByTagName('option');
var noticeTypes = [
  'flat',
  'shack',
  'palace'
];
var pinMap = document.querySelector('.tokyo__pin-map');
var pins = document.querySelectorAll('.pin');

var ENTER_KEY_CODE = 13;

noticeTitle.required = true;
noticeTitle.minLength = 30;
noticeTitle.maxLength = 100;

noticePrice.type = 'number';
noticePrice.min = 1000;
noticePrice.max = 1000000;
noticePrice.placeholder = 'от 1000';

noticeAddress.required = true;

addValueToOptions();

pinMap.addEventListener('click', function (event) {
  pinActiveHandler(event);
});

pinMap.addEventListener('keydown', function (event) {
  if (isActivateElement(event)) {
    pinActiveHandler(event);
  }
});

noticeTimeIn.addEventListener('change', function () {
  noticeTimeOut.value = noticeTimeIn.value;
});

noticeTimeOut.addEventListener('change', function () {
  noticeTimeIn.value = noticeTimeOut.value;
});

noticeType.addEventListener('change', function () {
  var i = 0;

  switch (noticeType.value) {
    case noticeTypes[i]:
      noticePrice.min = 1000;
      noticePrice.placeholder = 'от 1000';
      break;
    case noticeTypes[i + 1]:
      noticePrice.min = 0;
      noticePrice.placeholder = 'от 0';
      break;
    case noticeTypes[i + 2]:
      noticePrice.min = 1000000;
      noticePrice.placeholder = 'от 1000000';
      break;
  }
});

noticeRoomNumber.addEventListener('change', function () {
  if (noticeRoomNumber.value === noticeRoomNumbers[1] || noticeRoomNumber.value === noticeRoomNumbers[2]) {
    noticeCapacity.value = noticeCapacities[0];
  } else {
    noticeCapacity.value = noticeCapacities[1];
  }
});

// Перечень функций
var dialogCloseClickHandler = function () {
  closeDialog();
  deletePinsActive();
};

var dialogCloseKeydownHandler = function (event) {
  if (isActivateElement(event)) {
    closeDialog();
    deletePinsActive();
  }
};

function pinActiveHandler () {
  var pin = event.target;

  while (pin != pinMap) {
    if (pin.classList.contains('pin')) {
      if (pin.classList.contains('pin--active')) {
        pin.classList.remove('pin--active');
        closeDialog();
        pin.setAttribute('aria-pressed', false);
      } else {
        deletePinsActive();
        openDialog();
        pin.classList.add('pin--active');
        pin.setAttribute('aria-pressed', true);
      }
      console.log(pin);
      return;
    }
    pin = pin.parentNode;
  }
}

function isActivateElement(event) {
  return event.keyCode && event.keyCode === ENTER_KEY_CODE;
};

function deletePinsActive() {
  for (var i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
    pins[i].setAttribute('aria-pressed', false);
  }
}

function closeDialog() {
  dialog.style.display = 'none';
  dialogClose.removeEventListener('click', dialogCloseClickHandler);
  dialogClose.removeEventListener('keydown', dialogCloseKeydownHandler);
}

function openDialog() {
  dialog.style.display = 'block';
  dialogClose.addEventListener('click', dialogCloseClickHandler);
  dialogClose.addEventListener('keydown', dialogCloseKeydownHandler);
}

function addNoticeTimeInOutOptions() {
  for (var i = 0, j = 12; i < noticeTimeInOptions.length; i++, j++) {
    noticeTimeInOptions[i].value = j;
    noticeTimeInOptions[i].text = 'После ' + j;
  }

  for (var i = 0, j = 12; i < noticeTimeOutOptions.length; i++, j++) {
    noticeTimeOutOptions[i].value = j;
    noticeTimeOutOptions[i].text = 'Выезд до ' + j;
  }
}

function addNoticeTypeOptions() {
  for (var i = 0; i < noticeTypeOptions.length; i++) {
    noticeTypeOptions[i].value = noticeTypes[i];
  }
}

function addNoticeRoomNumberOptions() {
  for (var i = 0; i < noticeRoomNumberOptions.length; i++) {
    noticeRoomNumberOptions[i].value = noticeRoomNumbers[i];
  }
}

function addNoticeCapacityOptions() {
  for (var i = 0; i < noticeCapacityOptions.length; i++) {
    noticeCapacityOptions[i].value = noticeCapacities[i];
  }
  noticeCapacityOptions[0].selected = false;
  noticeCapacityOptions[1].selected = true;
}

function addValueToOptions() {
  addNoticeTimeInOutOptions();
  addNoticeTypeOptions();
  addNoticeRoomNumberOptions();
  addNoticeCapacityOptions();
}
