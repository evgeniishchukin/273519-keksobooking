'use strict'

window.initializePins = (function () {
  var parentElement = document.querySelector('.tokyo__pin-map');

  parentElement.addEventListener('click', function (event) {
    window.utils.activateElement(event, parentElement);
  });

  parentElement.addEventListener('keydown', function (event) {
    if (window.utils.isActivationEvent(event)) {
      window.utils.activateElement(event, parentElement);
    }
  });

})();
