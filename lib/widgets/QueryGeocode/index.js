"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");
var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");
var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");
var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.push.js");
var _button = _interopRequireDefault(require("antd/lib/button"));
var _space = _interopRequireDefault(require("antd/lib/space"));
var _input = _interopRequireDefault(require("antd/lib/input"));
var _select = _interopRequireDefault(require("antd/lib/select"));
var _spin = _interopRequireDefault(require("antd/lib/spin"));
var _col = _interopRequireDefault(require("antd/lib/col"));
var _row = _interopRequireDefault(require("antd/lib/row"));
var _modal = _interopRequireDefault(require("antd/lib/modal"));
var _message2 = _interopRequireDefault(require("antd/lib/message"));
var _form = _interopRequireDefault(require("antd/lib/form"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));
var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs3/regenerator"));
var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));
var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));
var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));
var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));
var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-float"));
var _react = _interopRequireWildcard(require("react"));
var _GISToolHelper = _interopRequireDefault(require("../../GISToolHelper.js"));
var _index = _interopRequireDefault(require("../MapWidget/index.js"));
var _axios = _interopRequireDefault(require("axios"));
function _getRequireWildcardCache(e) { if ("function" != typeof _WeakMap) return null; var r = new _WeakMap(), t = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && _Object$getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? _Object$getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
var QueryGeocode = function QueryGeocode(props) {
  var region = props.region,
    tdtkey = props.tdtkey,
    image = props.image,
    open = props.open,
    mapSetting = props.mapSetting,
    mapOptions = props.mapOptions,
    onOk = props.onOk,
    onCancel = props.onCancel;
  var _Form$useForm = _form.default.useForm(),
    _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
    form = _Form$useForm2[0];
  var mapR = (0, _react.useRef)();
  var _useState = (0, _react.useState)(false),
    _useState2 = (0, _slicedToArray2.default)(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = (0, _react.useState)(''),
    _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
    location = _useState4[0],
    setLocation = _useState4[1];
  var _useState5 = (0, _react.useState)([]),
    _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
    searchResultPois = _useState6[0],
    setSearchResultPois = _useState6[1];
  var handleRest = function handleRest() {
    setLoading(false);
    setLocation('');
    form.resetFields();
  };
  var handleOk = function handleOk(value) {
    onOk === null || onOk === void 0 || onOk(value);
    handleRest();
  };
  var handleCancel = function handleCancel() {
    onCancel === null || onCancel === void 0 || onCancel();
    handleRest();
  };
  var fetchSearchDataByKeyWord = _GISToolHelper.default.debounce(/*#__PURE__*/(0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee() {
    var _context, _form$getFieldsValue, _location, params, url, searchData, pois;
    return _regenerator.default.wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _form$getFieldsValue = form.getFieldsValue(), _location = _form$getFieldsValue.location;
          params = {
            keyWord: _location,
            // 关键字
            mapBound: (region === null || region === void 0 ? void 0 : region.bounds.join(',')) || '-180,-90,180,90',
            // 查询范围(“minx,miny,maxx,maxy”)
            level: 18,
            // 查询级别
            start: 0,
            // 返回结果起始位
            count: 10,
            // 返回结果的条数
            queryType: 1,
            // 1-普通搜索，7-地名搜索
            specify: (region === null || region === void 0 ? void 0 : region.code) || undefined // 行政区国标码
          };
          url = (0, _concat.default)(_context = "http://api.tianditu.gov.cn/v2/search?type=query&postStr=".concat((0, _stringify.default)(params), "&tk=")).call(_context, tdtkey);
          _context2.next = 6;
          return _axios.default.get(url);
        case 6:
          searchData = _context2.sent;
          if (searchData.data) setLoading(false);
          pois = searchData.data.pois;
          if (!pois) {
            _message2.default.warning('当前区域没有查询到结果');
          } else {
            setSearchResultPois(pois);
          }
          _context2.next = 16;
          break;
        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          setLoading(false);
          console.error('请求失败:', _context2.t0);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee, null, [[0, 12]]);
  })), 1000);
  var addLocationLayer = function addLocationLayer(lonlat) {
    var _mapR$current, _mapR$current2;
    (_mapR$current = mapR.current) === null || _mapR$current === void 0 || _mapR$current.setCenter(lonlat);
    (_mapR$current2 = mapR.current) === null || _mapR$current2 === void 0 || _mapR$current2.setZoom(15);
    var geo = _GISToolHelper.default.createPointFeatureCollection(lonlat, {});
    if (image) {
      var _mapR$current3;
      (_mapR$current3 = mapR.current) === null || _mapR$current3 === void 0 || _mapR$current3.selectSymbolIconFeature(geo, 'queryGeoIcon', 'icon-location');
    } else {
      var _mapR$current4;
      (_mapR$current4 = mapR.current) === null || _mapR$current4 === void 0 || _mapR$current4.selectCircleFeature(geo, 'queryGeoIcon');
    }
  };
  var fetchSearchDataByLonLat = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)(/*#__PURE__*/_regenerator.default.mark(function _callee2(point) {
      var _context3, params, url, searchData, _searchData$data$resu, lon, lat, _location2, resObject;
      return _regenerator.default.wrap(function _callee2$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            params = {
              lon: point.lng,
              lat: point.lat,
              ver: 1 // 接口版本
            };
            url = (0, _concat.default)(_context3 = "http://api.tianditu.gov.cn/geocoder?type=geocode&postStr=".concat((0, _stringify.default)(params), "&tk=")).call(_context3, tdtkey);
            _context4.next = 5;
            return _axios.default.get(url);
          case 5:
            searchData = _context4.sent;
            if (searchData.data) setLoading(false);
            _searchData$data$resu = searchData.data.result.location, lon = _searchData$data$resu.lon, lat = _searchData$data$resu.lat;
            _location2 = searchData.data.result['formatted_address'];
            resObject = {
              location: _location2,
              longitude: lon,
              latitude: lat
            };
            setLocation(_location2);
            form.setFieldsValue(resObject);
            addLocationLayer([lon, lat]);
            _context4.next = 19;
            break;
          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](0);
            console.error('请求失败:', _context4.t0);
            setLoading(false);
          case 19:
          case "end":
            return _context4.stop();
        }
      }, _callee2, null, [[0, 15]]);
    }));
    return function fetchSearchDataByLonLat(_x) {
      return _ref2.apply(this, arguments);
    };
  }();
  var handleSearch = function handleSearch(value) {
    setSearchResultPois([]);
    if (value && mapR.current) {
      setLoading(true);
      fetchSearchDataByKeyWord();
    } else {
      setSearchResultPois([]);
    }
  };
  var handleChange = function handleChange(value) {
    var selectPois = (0, _filter.default)(searchResultPois).call(searchResultPois, function (d) {
      return d.hotPointID === value;
    });
    // select清除状态
    if (selectPois.length === 0) {
      var _mapR$current5;
      setLocation('');
      form.resetFields();
      (_mapR$current5 = mapR.current) === null || _mapR$current5 === void 0 || _mapR$current5.clearSelect("queryGeoIcon");
      return;
    }
    var _selectPois$ = selectPois[0],
      name = _selectPois$.name,
      lonlat = _selectPois$.lonlat;
    var lonlatStr = lonlat.split(',');
    var lonlatArray = (0, _map.default)(lonlatStr).call(lonlatStr, _parseFloat2.default);
    var resObject = {
      location: name,
      longitude: lonlatArray[0],
      latitude: lonlatArray[1]
    };
    setLocation(name);
    form.setFieldsValue(resObject);
    addLocationLayer(lonlatArray);
  };
  var mapLoadHandle = function mapLoadHandle(map) {
    mapR.current = map;
    map.images.push(image);
    map.on('click', function (e) {
      setLoading(true);
      fetchSearchDataByLonLat(e.lngLat);
    });
  };
  return /*#__PURE__*/_react.default.createElement(_modal.default, {
    open: open,
    width: 1200,
    okText: "\u63D0\u4EA4",
    title: "\u5730\u56FE\u9875\u9762",
    destroyOnClose: true,
    maskClosable: false,
    footer: false,
    closable: false
  }, /*#__PURE__*/_react.default.createElement(_form.default, {
    form: form,
    layout: "horizontal",
    onFinish: handleOk
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: '16px',
      color: '#584B4B',
      fontWeight: 'bold',
      marginBottom: '20px'
    }
  }, "\u83B7\u53D6\u7ECF\u7EAC\u5EA6\u548C\u5730\u5740 \uFF1A"), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_col.default, {
    offset: 1,
    span: 6
  }, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    name: "location",
    label: "\u8BF7\u8F93\u5165:",
    rules: [{
      required: true,
      message: '请选择地址!'
    }]
  }, /*#__PURE__*/_react.default.createElement(_spin.default, {
    spinning: loading
  }, /*#__PURE__*/_react.default.createElement(_select.default, {
    allowClear: true,
    showSearch: true,
    filterOption: false,
    placeholder: "\u8BF7\u8F93\u5165\u5730\u540D",
    style: {
      width: '400px'
    },
    defaultActiveFirstOption: false,
    value: location,
    onChange: handleChange,
    onSearch: handleSearch,
    options: (0, _map.default)(searchResultPois).call(searchResultPois, function (d) {
      return {
        value: d.hotPointID,
        label: d.name
      };
    })
  }))))), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_col.default, {
    offset: 1,
    span: 6
  }, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    name: "longitude",
    label: "\u4E1C\u7ECF\uFF1A",
    rules: [{
      required: true,
      message: '请选择地址!'
    }]
  }, /*#__PURE__*/_react.default.createElement(_input.default, null))), /*#__PURE__*/_react.default.createElement(_col.default, {
    offset: 1,
    span: 6
  }, /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    name: "latitude",
    label: "\u5317\u7EAC\uFF1A",
    rules: [{
      required: true,
      message: '请选择地址!'
    }]
  }, /*#__PURE__*/_react.default.createElement(_input.default, null)))), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_col.default, {
    offset: 1,
    span: 23
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      height: 400,
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_index.default, {
    mapLayerSettting: mapSetting,
    mapOptions: mapOptions,
    onMapLoad: mapLoadHandle
  })))), /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    wrapperCol: {
      offset: 21
    }
  }, /*#__PURE__*/_react.default.createElement(_space.default, {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "primary",
    htmlType: "submit"
  }, "\u786E\u5B9A"), /*#__PURE__*/_react.default.createElement(_button.default, {
    htmlType: "button",
    onClick: handleCancel
  }, "\u53D6\u6D88")))));
};
var index = exports.default = /*#__PURE__*/(0, _react.memo)(QueryGeocode);