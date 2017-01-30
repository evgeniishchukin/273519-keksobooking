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
var pins = document.querySelectorAll('.pin');

noticeTitle.required = true;
noticeTitle.minLength = 30;
noticeTitle.maxLength = 100;

noticePrice.type = 'number';
noticePrice.min = 1000;
noticePrice.max = 1000000;
noticePrice.placeholder = 'от 1000';

noticeAddress.required = true;

addValueToOptions();

for (var i = 0; i < pins.length; i++) {
  pins[i].addEventListener('click', function (event) {

    var pin = event.currentTarget;

    if (pin.classList.contains('pin--active')) {
      pin.classList.remove('pin--active');
      closeDialog();
    } else {
      deletePinsActive();
      openDialog();
      pin.classList.add('pin--active');
    }
  });
}

dialogClose.addEventListener('click', function (event) {
  closeDialog();
  deletePinsActive();
});

noticeTimeIn.addEventListener('change', function () {
  noticeTimeOut.value = noticeTimeIn.value;
});

noticeTimeOut.addEventListener('change', function () {
  noticeTimeIn.value = noticeTimeOut.value;
});

noticeType.addEventListener('change', function () {
  var i = 0;

  switch(noticeType.value) {
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

function deletePinsActive() {
  for (i = 0; i < pins.length; i++) {
    pins[i].classList.remove('pin--active');
  }
}

function closeDialog() {
  dialog.style.display = 'none';
}

function openDialog() {
  dialog.style.display = 'block';
}

function addNoticeTimeInOutOptions() {
  for (var i = 0, j = 12; i < noticeTimeInOptions.length; i++, j++) {
    noticeTimeInOptions[i].value = j;
    noticeTimeInOptions[i].text = 'После ' + j;
  }

  for (i = 0, j = 12; i < noticeTimeOutOptions.length; i++, j++) {
    noticeTimeOutOptions[i].value = j;
    noticeTimeOutOptions[i].text = 'Выезд до ' + j;
  }
}

function addNoticeTypeOptions() {
  for (i = 0; i < noticeTypeOptions.length; i++) {
    noticeTypeOptions[i].value = noticeTypes[i];
  }
}

function addNoticeRoomNumberOptions() {
  for (i = 0; i < noticeRoomNumberOptions.length; i++) {
    noticeRoomNumberOptions[i].value = noticeRoomNumbers[i];
  }
}

function addNoticeCapacityOptions() {
  for (i = 0; i < noticeCapacityOptions.length; i++) {
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
