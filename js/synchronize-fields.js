'use strict';

window.synchronizeFields = function (formElement1, formElement2, formElementsArray1, formElementsArray2, property, callback) {
  formElement1.addEventListener('change', function () {
    callback(formElement1, formElement2, formElementsArray1, formElementsArray2, property);
  });
};
