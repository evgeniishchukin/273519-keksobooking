'use strict';

var synchronizeFields = function (formElement1, formElement2, formElementsArray1, formElementsArray2, property) {
   formElement1.addEventListener('change', function () {
     formElement2[property] = formElementsArray2[formElementsArray1.indexOf(formElement1.value)];
   });
};
