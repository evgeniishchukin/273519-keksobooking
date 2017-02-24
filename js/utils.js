'use strict';

window.utils = (function () {
  var dialogName = document.querySelector('.dialog');
  var dialogNameClose = document.querySelector('.dialog__close');
  var className = 'pin';
  var classNameActive = 'pin--active';


  var ENTER_KEY_CODE = 13;

  var isActivationEvent = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  var clickHandler = function () {
    dialogClose();
    deactivateElements();
  };

  var keyHandler = function () {
    if (isActivationEvent(event)) {
      dialogClose(function () {
        window.activeElement.focus();
      });
      deactivateElements();
    }
  };

  dialogNameClose.addEventListener('click', clickHandler);

  function deactivateElements() {
    var elementsArray = document.querySelectorAll('.pin');

    for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].classList.remove(classNameActive);
      elementsArray[i].setAttribute('aria-pressed', false);
    }

  }

  function dialogClose(callback) {
    dialogName.style.display = 'none';
    dialogNameClose.removeEventListener('click', clickHandler);
    dialogNameClose.removeEventListener('keydown', keyHandler);

    if (typeof callback === 'function') {
      callback();
    }
  }

  function dialogOpen() {
    if (dialogName) {
      dialogClose();
    }
    window.showCard();
    dialogNameClose.addEventListener('click', clickHandler);
    dialogNameClose.addEventListener('keydown', keyHandler);
    dialogNameClose.focus();
  }

  return {
    isActivationEvent: isActivationEvent,

    activateElement: function (event, parentElement) {
      window.activeElement = event.target;
      var activeElement = window.activeElement;

      while (activeElement !== parentElement) {
        if (activeElement.classList.contains(className)) {
          if (activeElement.classList.contains(classNameActive)) {
            activeElement.classList.remove(classNameActive);
            dialogClose();
            activeElement.setAttribute('aria-pressed', false);
          } else {
            deactivateElements();
            activeElement.classList.add(classNameActive);
            activeElement.setAttribute('aria-pressed', true);
            dialogOpen();
          }
          return;
        }
        activeElement = activeElement.parentNode;
      }
    }
  };

})();
