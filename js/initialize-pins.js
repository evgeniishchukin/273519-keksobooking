'use strict';

var ENTER_KEY_CODE = 13;

window.initializePins = function (parentElement, elementsArray, className, classNameActive, dialogName, dialogNameClose) {
  parentElement.addEventListener('click', function (event) {
    activeHandler(event);
  });

  parentElement.addEventListener('keydown', function (event) {
    if (isActivateElement(event)) {
      activeHandler(event);
    }
  });

  var activeHandler = function (event) {
    var activeElement = event.target;

    while (activeElement !== parentElement) {
      if (activeElement.classList.contains(className)) {
        if (activeElement.classList.contains(classNameActive)) {
          activeElement.classList.remove(classNameActive);
          dialogClose();
          activeElement.setAttribute('aria-pressed', false);
        } else {
          activeElementsDelete();
          dialogOpen();
          activeElement.classList.add(classNameActive);
          activeElement.setAttribute('aria-pressed', true);
        }
        return;
      }
      activeElement = activeElement.parentNode;
    }
  };

  var isActivateElement = function (event) {
    return event.keyCode && event.keyCode === ENTER_KEY_CODE;
  };

  var dialogClose = function () {
    dialogName.style.display = 'none';
    dialogNameClose.removeEventListener('click', clickHandler);
    dialogNameClose.removeEventListener('click', keyHandler);
  };

  var dialogOpen = function () {
    dialogName.style.display = 'block';
    dialogNameClose.addEventListener('click', clickHandler);
    dialogNameClose.addEventListener('click', keyHandler);
  };

  var clickHandler = function () {
    dialogClose();
    activeElementsDelete();
  };

  var keyHandler = function (event) {
    if (isActivateElement(event)) {
      dialogClose();
      activeElementsDelete();
    }
  };

  var activeElementsDelete = function () {
    for (var i = 0; i < elementsArray.length; i++) {
      elementsArray[i].classList.remove(classNameActive);
      elementsArray[i].setAttribute('aria-pressed', false);
    }
  };

};
