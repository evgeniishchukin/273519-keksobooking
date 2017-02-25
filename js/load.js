'use strict';

// МОДУЛЬ ЗАГРУЗКИ ДАННЫХ С СЕРВЕРА
(function () {
  window.load = function (url, onLoad) {
    // Определяем функцию http запроса
    var xhr = new XMLHttpRequest();

    // Устанвливаем конфигурацию запроса (get запрос на url aдрес)
    xhr.open('GET', url);

    var serverResponse = 200;

    // Запускаем обработчик вызова
    xhr.addEventListener('load', function (event) {
      if (event.target.status >= serverResponse) {
        var data = JSON.parse(event.target.response);
        // При вызове функции onLoad в её единственный параметр передается набор полученных данных.
        onLoad(data);
      }
    });

    // Отправка запроса
    xhr.send();
  };
})();
