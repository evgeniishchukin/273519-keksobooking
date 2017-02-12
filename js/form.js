'use strict';

window.initializeForm = (function () {
  var noticeTimeIn = document.querySelector('#time');
  var noticeTimeOut = document.querySelector('#timeout');
  var noticeTimesIn = ['12', '13', '14'];
  var noticeTimesOut = ['12', '13', '14'];

  var noticeRoomNumber = document.querySelector('#room_number');
  var noticeCapacity = document.querySelector('#capacity');
  var noticeRoomNumbers = ['1', '2', '100'];
  var noticeCapacities = ['0', '3', '3'];

  var noticeType = document.querySelector('#type');
  var noticePrice = document.querySelector('#price');
  var noticeTypes = ['flat', 'shack', 'palace'];
  var noticePrices = ['1000', '500', '10000'];

  var noticeTitle = document.querySelector('#title');
  var noticeAddress = document.querySelector('#address');

  // Синхнонизация времени заезда и выезда
  window.synchronizeFields(noticeTimeIn, noticeTimeOut, noticeTimesIn, noticeTimesOut, 'value');

  // Синхнонизация количества комнат и количества мест
  window.synchronizeFields(noticeRoomNumber, noticeCapacity, noticeRoomNumbers, noticeCapacities, 'value');

  // Синхронизация типа жилья и цены
  window.synchronizeFields(noticeType, noticePrice, noticeTypes, noticePrices, 'value');

  // Изменение параметров у элементов в HTML
  noticeTitle.required = true;
  noticeTitle.minLength = 30;
  noticeTitle.maxLength = 100;

  noticePrice.type = 'number';
  noticePrice.min = 1000;
  noticePrice.max = 1000000;
  noticePrice.placeholder = 'от 1000';

  noticeAddress.required = true;
})();
