'use strict';

// МОДУЛЬ ЗАГРУЗКИ ДАННЫХ С СЕРВЕРА
window.load = function(url, onLoad) {
  // Определяем функцию http запроса
  var xhr = new XMLHttpRequest();

  // Устанвливаем конфигурацию запроса (get запрос на url aдрес)
  xhr.open('GET', url);

  // Запускаем обработчик вызова
  xhr.addEventListener('load', function (event) {
   if (event.target.status >= 200) {
     var data = JSON.parse(event.target.response);
     // При вызове функции onLoad в её единственный параметр передается набор полученных данных.
     onLoad(data);
   }
  });

  // Отправка запроса
  xhr.send();
 };
