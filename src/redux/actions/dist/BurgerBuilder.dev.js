"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPropsToDefault = exports.removeIngredient = exports.addIngredients = exports.fetchIngredients = void 0;

var _axios = _interopRequireDefault(require("../../axios"));

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var fetchIngredientsFailed = function fetchIngredientsFailed() {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED
  };
};

var saveIngridientsInState = function saveIngridientsInState(ing) {
  return {
    type: actionTypes.FETCHINGREDIENTS,
    ingredients: ing
  };
};

var fetchIngredients = function fetchIngredients() {
  return function (dispatch) {
    _axios["default"].get('/ingredients.json').then(function (res) {
      return dispatch(saveIngridientsInState(res.data));
    })["catch"](function (err) {
      dispatch(fetchIngredientsFailed());
    });
  };
};

exports.fetchIngredients = fetchIngredients;

var addIngredients = function addIngredients(igName) {
  return {
    type: actionTypes.ADD_INGREDIENT,
    igName: igName
  };
};

exports.addIngredients = addIngredients;

var removeIngredient = function removeIngredient(igName) {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    igName: igName
  };
};

exports.removeIngredient = removeIngredient;

var setPropsToDefault = function setPropsToDefault() {
  return {
    type: actionTypes.PROPS_DEFAULT
  };
};

exports.setPropsToDefault = setPropsToDefault;