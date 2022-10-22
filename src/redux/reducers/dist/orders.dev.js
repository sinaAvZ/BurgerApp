"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var importAction = _interopRequireWildcard(require("../actions/actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initialize = {
  data: [],
  order: [],
  loading: false,
  error: false,
  loadingOrder: false,
  errOrder: null
};

var reducerOrder = function reducerOrder() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialize;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case importAction.SET_INGREDIENTS_ORDER:
      {
        var Data = _objectSpread({}, action.data, {
          id: action.data.contactData.email
        });

        return _objectSpread({}, state, {
          order: state.order.concat(Data),
          loading: false
        });
      }

    case importAction.SETINGREDIENTSLOADINGFALSE:
      {
        return _objectSpread({}, state, {
          loading: false
        });
      }

    case importAction.SETLOADINGINGREDIENTSTRUE:
      {
        return _objectSpread({}, state, {
          loading: true
        });
      }

    case importAction.GET_INGREDIENTS_ORDER:
      {
        console.log(action.order);
        return _objectSpread({}, state, {
          data: action.order,
          loadingOrder: false
        });
      }

    case importAction.GET_INGREDIENTS_ORDER_FAILED:
      {
        return _objectSpread({}, state, {
          errOrder: action.errOrder
        });
      }
  }

  return state;
};

var _default = reducerOrder;
exports["default"] = _default;