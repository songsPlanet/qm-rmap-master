import 'core-js/modules/es.object.to-string.js';
import 'core-js/modules/web.dom-collections.for-each.js';
import _Object$keys from '@babel/runtime-corejs3/core-js-stable/object/keys';
import _Object$getOwnPropertySymbols from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _Object$getOwnPropertyDescriptor from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor';
import _Object$getOwnPropertyDescriptors from '@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors';
import _classCallCheck from '@babel/runtime-corejs3/helpers/classCallCheck';
import _createClass from '@babel/runtime-corejs3/helpers/createClass';
import _defineProperty from '@babel/runtime-corejs3/helpers/defineProperty';
import 'core-js/modules/es.array.push.js';
import 'core-js/modules/es.regexp.exec.js';
import _Promise from '@babel/runtime-corejs3/core-js-stable/promise';
import _startsWithInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/starts-with';
import axios from 'axios';
import { message } from 'antd';
import { getLocalStorage } from './index.js';
import history from './history.js';
import { createPath } from 'react-router-dom';

function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? Object.defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
var abortController = new AbortController();
function abortRequest() {
  if (abortController) {
    abortController.abort();
    abortController = new AbortController();
  } else {
    abortController = new AbortController();
  }
}
var statusCode = {
  200: '200 OK',
  400: '400 Bad Request',
  401: '401 Unauthorized',
  403: '403 Forbidden',
  404: '404 Not Found',
  405: '405 Method Not Allowed',
  408: '408 Request Timeout',
  500: '500 Internal Server Error',
  501: '501 Not Implemented',
  502: '502 Bad Gateway',
  503: '503 Service Unavailable',
  504: '504 Gateway Timeout',
  505: '505 HTTP Version Not Supported',
  510: '510 Not Extended',
  511: '511 Network Authentication Required'
};
var ResponseCode;
(function (ResponseCode) {
  ResponseCode[ResponseCode["successCode"] = 0] = "successCode";
  ResponseCode[ResponseCode["overdueCode"] = 401] = "overdueCode";
})(ResponseCode || (ResponseCode = {}));
var defaultRequestConfig = {
  baseURL: '',
  timeout: 60000,
  withCredentials: true
};
var Request = /*#__PURE__*/function () {
  function Request(_config) {
    var _this = this;
    _classCallCheck(this, Request);
    _defineProperty(this, "instance", void 0);
    _defineProperty(this, "onFulfilledRequest", function (config) {
      return _objectSpread(_objectSpread({}, config), {}, {
        signal: abortController.signal,
        headers: {
          Authorization: getLocalStorage('TOKEN') || 'Bearer Token'
        }
      });
    });
    _defineProperty(this, "onRejectedRequest", function (error) {
      return _Promise.reject(error);
    });
    _defineProperty(this, "onFulfilledResponse", function (response) {
      var data = response.data,
        headers = response.headers,
        responseType = response.request.responseType;
      // 下载文件，blob 直接用于文件的下载
      if (responseType === 'blob') {
        var _headers$contentDisp;
        var fileName = (_headers$contentDisp = headers['content-disposition']) !== null && _headers$contentDisp !== void 0 ? _headers$contentDisp : '';
        var matched = /^attachment;\s*filename\*?=(?:utf-8'')?([^,]+)/.exec(fileName);
        if (matched === null) {
          fileName = 'defaultName';
        } else {
          fileName = decodeURIComponent(matched[1]);
        }
        return _Promise.resolve(_objectSpread(_objectSpread({}, data), {}, {
          fileName: fileName
        }));
      }
      if (data.code === ResponseCode.overdueCode) {
        message.error('登录已过期，请重新登录');
        window.localStorage.clear();
        abortRequest();
        _this.redirectionToLogin();
        return _Promise.reject(data);
      }
      if (typeof data.code !== 'undefined' && data.code !== ResponseCode.successCode) {
        data.message && message.error(data.message);
        return _Promise.reject(data);
      }
      return _Promise.resolve(data);
    });
    _defineProperty(this, "onRejectedResponse", function (error) {
      if (error.response) {
        _this.checkStatus(error.response.status);
      } else if (!window.navigator.onLine) {
        message.error('网络连接失败');
      } else if (error.code === 'ERR_CANCELED') {
        // 请求被取消
        console.log(error.stack);
      } else {
        message.error('请求失败，请联系管理员');
      }
      return _Promise.reject(null);
    });
    this.instance = axios.create(_objectSpread(_objectSpread({}, defaultRequestConfig), _config));
    this.instance.interceptors.request.use(this.onFulfilledRequest, this.onRejectedRequest);
    this.instance.interceptors.response.use(this.onFulfilledResponse, this.onRejectedResponse);
  }
  return _createClass(Request, [{
    key: "checkStatus",
    value:
    // 校验状态码
    function checkStatus(status) {
      switch (status) {
        case 401:
        case 403:
          abortRequest();
          message.error('用户请登录');
          window.localStorage.clear();
          this.redirectionToLogin();
          break;
        default:
          message.error(statusCode[status]);
          break;
      }
    }
    // 重定向到登录页
  }, {
    key: "redirectionToLogin",
    value: function redirectionToLogin() {
      var _context;
      var location = history.location,
        push = history.push;
      if (_startsWithInstanceProperty(_context = location.pathname).call(_context, '/login')) return;
      var querystring = window.encodeURIComponent(createPath(location));
      push('/login?redirection=' + querystring);
    }
  }, {
    key: "get",
    value: function get(url, params) {
      return this.instance.get(url, {
        params: params
      });
    }
  }, {
    key: "getBlob",
    value: function getBlob(url, params) {
      return this.instance.get(url, {
        params: params,
        responseType: 'blob'
      });
    }
  }, {
    key: "postBlob",
    value: function postBlob(url, params) {
      return this.instance.post(url, params, {
        responseType: 'blob'
      });
    }
  }, {
    key: "delete",
    value: function _delete(url, params) {
      return this.instance.delete(url, {
        data: params
      });
    }
  }, {
    key: "post",
    value: function post(url, params, config) {
      return this.instance.post(url, params, config);
    }
  }, {
    key: "put",
    value: function put(url, params, config) {
      return this.instance.put(url, params, config);
    }
  }]);
}();
var request = new Request();

export { request as default };
