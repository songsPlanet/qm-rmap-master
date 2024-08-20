'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const axios_1 = __importDefault(require('axios'));
const antd_1 = require('antd');
const utils_1 = require('@/utils');
const history_1 = __importDefault(require('@/utils/history'));
const react_router_dom_1 = require('react-router-dom');
let abortController = new AbortController();
function abortRequest() {
  if (abortController) {
    abortController.abort();
    abortController = new AbortController();
  } else {
    abortController = new AbortController();
  }
}
const statusCode = {
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
  511: '511 Network Authentication Required',
};
var ResponseCode;
(function (ResponseCode) {
  ResponseCode[(ResponseCode['successCode'] = 0)] = 'successCode';
  ResponseCode[(ResponseCode['overdueCode'] = 401)] = 'overdueCode';
})(ResponseCode || (ResponseCode = {}));
const defaultRequestConfig = {
  baseURL: '',
  timeout: 60000,
  withCredentials: true,
};
class Request {
  instance;
  constructor(config) {
    this.instance = axios_1.default.create({ ...defaultRequestConfig, ...config });
    this.instance.interceptors.request.use(this.onFulfilledRequest, this.onRejectedRequest);
    this.instance.interceptors.response.use(this.onFulfilledResponse, this.onRejectedResponse);
  }
  onFulfilledRequest = (config) => {
    return {
      ...config,
      signal: abortController.signal,
      headers: {
        Authorization: (0, utils_1.getLocalStorage)('TOKEN') || 'Bearer Token',
      },
    };
  };
  onRejectedRequest = (error) => {
    return Promise.reject(error);
  };
  onFulfilledResponse = (response) => {
    const {
      data,
      headers,
      request: { responseType },
    } = response;
    // 下载文件，blob 直接用于文件的下载
    if (responseType === 'blob') {
      let fileName = headers['content-disposition'] ?? '';
      const matched = /^attachment;\s*filename\*?=(?:utf-8'')?([^,]+)/.exec(fileName);
      if (matched === null) {
        fileName = 'defaultName';
      } else {
        fileName = decodeURIComponent(matched[1]);
      }
      return Promise.resolve({ ...data, fileName: fileName });
    }
    if (data.code === ResponseCode.overdueCode) {
      antd_1.message.error('登录已过期，请重新登录');
      window.localStorage.clear();
      abortRequest();
      this.redirectionToLogin();
      return Promise.reject(data);
    }
    if (typeof data.code !== 'undefined' && data.code !== ResponseCode.successCode) {
      data.message && antd_1.message.error(data.message);
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  };
  onRejectedResponse = (error) => {
    if (error.response) {
      this.checkStatus(error.response.status);
    } else if (!window.navigator.onLine) {
      antd_1.message.error('网络连接失败');
    } else if (error.code === 'ERR_CANCELED') {
      // 请求被取消
      console.log(error.stack);
    } else {
      antd_1.message.error('请求失败，请联系管理员');
    }
    return Promise.reject(null);
  };
  // 校验状态码
  checkStatus(status) {
    switch (status) {
      case 401:
      case 403:
        abortRequest();
        antd_1.message.error('用户请登录');
        window.localStorage.clear();
        this.redirectionToLogin();
        break;
      default:
        antd_1.message.error(statusCode[status]);
        break;
    }
  }
  // 重定向到登录页
  redirectionToLogin() {
    const { location, push } = history_1.default;
    if (location.pathname.startsWith('/login')) return;
    const querystring = window.encodeURIComponent((0, react_router_dom_1.createPath)(location));
    push('/login?redirection=' + querystring);
  }
  get(url, params) {
    return this.instance.get(url, { params });
  }
  getBlob(url, params) {
    return this.instance.get(url, { params, responseType: 'blob' });
  }
  postBlob(url, params) {
    return this.instance.post(url, params, { responseType: 'blob' });
  }
  delete(url, params) {
    return this.instance.delete(url, { data: params });
  }
  post(url, params, config) {
    return this.instance.post(url, params, config);
  }
  put(url, params, config) {
    return this.instance.put(url, params, config);
  }
}
exports.default = new Request();
