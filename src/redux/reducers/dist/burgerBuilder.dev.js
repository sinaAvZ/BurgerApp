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
  ingredients: null,
  totalPrice: 4,
  error: false,
  loading: false,
  building: false
};
var INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}; // const addIngredient = (state, action) => {
//     return {
//         ...state,
//         ingredients: {
//             ...state.ingredients,
//             [action.igName]: state.ingredients[action.igName] + 1
//         },
//         totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName]
//     }
// }
// const removeIngredient = (state, action) => {
//     return {
//         ...state,
//         ingredients: {
//             ...state.ingredients,
//             [action.igName]: state.ingredients[action.igName] - 1
//         },
//         totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igName]
//     }
// }
// const propsDefault = (state, action) => {
//     return {
//         ...state,
//         ingredients: {
//             salad: 0,
//             cheese: 0,
//             meat: 0,
//             bacon: 0
//         },
//         totalPrice: 4,
//     }
// }
// const fetchIngredients=(state,action)=>{
//      return {
//                 ...state,
//                 ingredients: action.ingredients,
//                 error: false,
//                 totalPrice: 4
//             }
// }
// const fetchIngredientsFailed=(state,action)=>{
//     return {
//                 ...state,
//                 error: true
//             }
// }
// const reducer = (state = initialize, action) => {
//     switch (action.type) {
//         case importAction.ADD_INGREDIENT: return addIngredient(state, action)
//         case importAction.REMOVE_INGREDIENT: return removeIngredient(state, action)
//         case importAction.PROPS_DEFAULT: return propsDefault(state, action)
//         case importAction.FETCHINGREDIENTS: return fetchIngredients(state,action)
//         case importAction.FETCH_INGREDIENTS_FAILED: fetchIngredientsFailed(state,action)
//         default:
//             return state;
//     }
// }

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialize;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case importAction.ADD_INGREDIENT:
      {
        return _objectSpread({}, state, {
          ingredients: _objectSpread({}, state.ingredients, _defineProperty({}, action.igName, state.ingredients[action.igName] + 1)),
          totalPrice: state.totalPrice + INGREDIENT_PRICES[action.igName],
          building: true
        });
      }
      ;

    case importAction.REMOVE_INGREDIENT:
      {
        return _objectSpread({}, state, {
          ingredients: _objectSpread({}, state.ingredients, _defineProperty({}, action.igName, state.ingredients[action.igName] - 1)),
          totalPrice: state.totalPrice - INGREDIENT_PRICES[action.igName],
          building: true
        });
      }
      ;

    case importAction.PROPS_DEFAULT:
      {
        return {
          ingredients: null,
          totalPrice: 4,
          error: false,
          loading: false,
          building: false
        };
      }

    case importAction.FETCHINGREDIENTS:
      {
        return _objectSpread({}, state, {
          ingredients: action.ingredients,
          error: false,
          totalPrice: 4
        });
      }

    case importAction.FETCH_INGREDIENTS_FAILED:
      {
        return _objectSpread({}, state, {
          error: true
        });
      }

    default:
      return state;
  }
};

var _default = reducer;
exports["default"] = _default;