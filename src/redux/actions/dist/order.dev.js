"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCustomerOrder = exports.saveIngredients = exports.setLoadingIngredientsTrue = void 0;

var actionTypes = _interopRequireWildcard(require("./actionTypes"));

var _axios = _interopRequireDefault(require("../../axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var setIngredientsOrder = function setIngredientsOrder(order) {
  return {
    type: actionTypes.SET_INGREDIENTS_ORDER,
    data: order
  };
};

var setIngredientLoadingfalse = function setIngredientLoadingfalse() {
  return {
    type: actionTypes.SETINGREDIENTSLOADINGFALSE
  };
};

var setLoadingIngredientsTrue = function setLoadingIngredientsTrue() {
  return {
    type: actionTypes.SETLOADINGINGREDIENTSTRUE
  };
};

exports.setLoadingIngredientsTrue = setLoadingIngredientsTrue;

var saveIngredients = function saveIngredients(data, history) {
  return function (dispatch, getState) {
    _axios["default"].post('/customer.json?auth=' + getState().auth.tokenId, data).then(function (res) {
      dispatch(setIngredientsOrder(data));
      history.push('/');
    })["catch"](function (err) {
      dispatch(setIngredientLoadingfalse());
    });
  };
};

exports.saveIngredients = saveIngredients;

var getCustomerFunc = function getCustomerFunc(data) {
  return {
    type: actionTypes.GET_INGREDIENTS_ORDER,
    order: data
  };
};

var getCustomerFunErr = function getCustomerFunErr(err) {
  return {
    type: actionTypes.GET_INGREDIENTS_ORDER_FAILED,
    errOrder: err
  };
};

var getCustomerOrder = function getCustomerOrder(token, userId) {
  return function (dispatch) {
    var queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';

    _axios["default"].get('/customer.json' + queryParams).then(function (res) {
      var fetchedOrders = [];

      for (var key in res.data) {
        fetchedOrders.push(_objectSpread({}, res.data[key], {
          id: key
        }));
      }

      console.log(fetchedOrders);
      dispatch(getCustomerFunc(fetchedOrders));
    })["catch"](function (err) {
      dispatch(getCustomerFunErr(err.message));
    });
  };
};

exports.getCustomerOrder = getCustomerOrder;