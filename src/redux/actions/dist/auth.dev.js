"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setAuthPath = exports.authCheckState = exports.authenticate = exports.authLogout = exports.authStart = void 0;

var _axios = _interopRequireDefault(require("axios"));

var actionType = _interopRequireWildcard(require("./actionTypes"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authStart = function authStart() {
  return {
    type: actionType.AUTH_START
  };
};

exports.authStart = authStart;

var authSucces = function authSucces(tokenId, userId) {
  return {
    type: actionType.AUTH_SUCCESS,
    tokenId: tokenId,
    userId: userId
  };
};

var authFail = function authFail(error) {
  return {
    type: actionType.AUTH_FAIL,
    error: error
  };
};

var authLogout = function authLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('expresTime');
  localStorage.removeItem('userId');
  return {
    type: actionType.AUTH_LOGOUT
  };
};

exports.authLogout = authLogout;

var authTimeOut = function authTimeOut(time) {
  return function (dispatch) {
    setTimeout(function () {
      dispatch(authLogout());
    }, time * 1000);
  };
};

var authenticate = function authenticate(email, password, isSignIn) {
  var authData = {
    email: email,
    password: password,
    returnSecureToken: true
  };
  return function (dispatch) {
    dispatch(authStart());
    var url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBCzDT9RcJ6PwhOqOwqdctKvr3oziUFiAY';

    if (isSignIn) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBCzDT9RcJ6PwhOqOwqdctKvr3oziUFiAY';
    }

    _axios["default"].post(url, authData).then(function (res) {
      var date = new Date(new Date().getTime() + res.data.expiresIn * 1000);
      localStorage.setItem('token', res.data.idToken);
      localStorage.setItem('expresTime', date);
      localStorage.setItem('userId', res.data.localId);
      dispatch(authTimeOut(res.data.expiresIn));
      return dispatch(authSucces(res.data.idToken, res.data.localId));
    })["catch"](function (err) {
      return dispatch(authFail(err.message));
    });
  };
};

exports.authenticate = authenticate;

var authCheckState = function authCheckState() {
  return function (dispatch) {
    var token = localStorage.getItem('token');

    if (!token) {
      dispatch(authLogout());
    } else {
      var expirationDate = new Date(localStorage.getItem('expresTime'));

      if (expirationDate <= new Date()) {
        dispatch(authLogout());
      } else {
        var userId = localStorage.getItem('userId');
        dispatch(authSucces(token, userId));
        dispatch(authTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
    }
  };
};

exports.authCheckState = authCheckState;

var setAuthPath = function setAuthPath(path) {
  return {
    type: actionType.AUTH_PATH,
    path: path
  };
};

exports.setAuthPath = setAuthPath;