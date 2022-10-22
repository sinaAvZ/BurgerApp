"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationHandler = void 0;

var validationHandler = function validationHandler(value, rules) {
  var isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

exports.validationHandler = validationHandler;