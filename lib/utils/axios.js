"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _message2 = _interopRequireDefault(require("antd/lib/message"));
require("core-js/modules/es.array.push.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));
var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));
var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));
var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));
var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));
var _axios = _interopRequireDefault(require("axios"));
var _index = require("./index.js");
var _history = _interopRequireDefault(require("./history.js"));
var _reactRouterDom = require("react-router-dom");
function ownKeys(e, r) {
  var t = (0, _keys.default)(e);
  if (_getOwnPropertySymbols.default) {
    var o = (0, _getOwnPropertySymbols.default)(e);
    r && (o = (0, _filter.default)(o).call(o, function (r) {
      return (0, _getOwnPropertyDescriptor.default)(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0, _defineProperty2.default)(e, r, t[r]);
    }) : _getOwnPropertyDescriptors.default ? Object.defineProperties(e, (0, _getOwnPropertyDescriptors.default)(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, (0, _getOwnPropertyDescriptor.default)(t, r));
    });
  }
  return e;
}
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
    (0, _classCallCheck2.default)(this, Request);
    (0, _defineProperty2.default)(this, "onFulfilledRequest", function (config) {
      return _objectSpread(_objectSpread({}, config), {}, {
        signal: abortController.signal,
        headers: {
          Authorization: (0, _index.getLocalStorage)('TOKEN') || 'Bearer Token'
        }
      });
    });
    (0, _defineProperty2.default)(this, "onRejectedRequest", function (error) {
      return _promise.default.reject(error);
    });
    (0, _defineProperty2.default)(this, "onFulfilledResponse", function (response) {
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
        return _promise.default.resolve(_objectSpread(_objectSpread({}, data), {}, {
          fileName: fileName
        }));
      }
      if (data.code === ResponseCode.overdueCode) {
        _message2.default.error('登录已过期，请重新登录');
        window.localStorage.clear();
        abortRequest();
        _this.redirectionToLogin();
        return _promise.default.reject(data);
      }
      if (typeof data.code !== 'undefined' && data.code !== ResponseCode.successCode) {
        data.message && _message2.default.error(data.message);
        return _promise.default.reject(data);
      }
      return _promise.default.resolve(data);
    });
    (0, _defineProperty2.default)(this, "onRejectedResponse", function (error) {
      if (error.response) {
        _this.checkStatus(error.response.status);
      } else if (!window.navigator.onLine) {
        _message2.default.error('网络连接失败');
      } else if (error.code === 'ERR_CANCELED') {
        // 请求被取消
        console.log(error.stack);
      } else {
        _message2.default.error('请求失败，请联系管理员');
      }
      return _promise.default.reject(null);
    });
    this.instance = _axios.default.create(_objectSpread(_objectSpread({}, defaultRequestConfig), _config));
    this.instance.interceptors.request.use(this.onFulfilledRequest, this.onRejectedRequest);
    this.instance.interceptors.response.use(this.onFulfilledResponse, this.onRejectedResponse);
  }
  return (0, _createClass2.default)(Request, [{
    key: "checkStatus",
    value:
    // 校验状态码
    function checkStatus(status) {
      switch (status) {
        case 401:
        case 403:
          abortRequest();
          _message2.default.error('用户请登录');
          window.localStorage.clear();
          this.redirectionToLogin();
          break;
        default:
          _message2.default.error(statusCode[status]);
          break;
      }
    }
    // 重定向到登录页
  }, {
    key: "redirectionToLogin",
    value: function redirectionToLogin() {
      var _context;
      var location = _history.default.location,
        push = _history.default.push;
      if ((0, _startsWith.default)(_context = location.pathname).call(_context, '/login')) return;
      var querystring = window.encodeURIComponent((0, _reactRouterDom.createPath)(location));
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
var axios = exports.default = new Request();