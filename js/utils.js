'use strict'

window.utils = (function () {
  var dialogName = document.querySelector('.dialog');
  var dialogNameClose = document.querySelector('.dialog__close');
  var elementsArray = document.querySelectorAll('.pin');
  var className = 'pin';
  var classNameActive = 'pin--active';

  var ENTER_KEY_CODE = 13;

  var isActivationEvent = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  }

  var clickHandler = function () {
    dialogClose();
    deactivateElements();
  };

  var keyHandler = function (event) {
    if (isActivateElement(event)) {
      dialogClose();
      deactivateElements();
    }
  };

  function deactivateElements() {
    for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].classList.remove(classNameActive);
      elementsArray[i].setAttribute('aria-pressed', false);
    }
  };

  function dialogClose() {
    dialogName.style.display = 'none';
    dialogName.classList.add('invisible');
    dialogNameClose.removeEventListener('click', clickHandler);
    dialogNameClose.removeEventListener('click', keyHandler);
  };

  function dialogOpen() {
    dialogName.style.display = 'block';
    dialogName.classList.remove('invisible');
    dialogNameClose.addEventListener('click', clickHandler);
    dialogNameClose.addEventListener('click', keyHandler);
  };

  return {
    isActivationEvent: isActivationEvent,

    activateElement: function (event, parentElement) {
      var activeElement = event.target;

      while (activeElement !== parentElement) {
        if (activeElement.classList.contains(className)) {
          if (activeElement.classList.contains(classNameActive)) {
            activeElement.classList.remove(classNameActive);
            dialogClose();
            activeElement.setAttribute('aria-pressed', false);
          } else {
            deactivateElements();
            dialogOpen();
            activeElement.classList.add(classNameActive);
            activeElement.setAttribute('aria-pressed', true);
          }
          return;
        }
        activeElement = activeElement.parentNode;
      }
    }
  }

})();
