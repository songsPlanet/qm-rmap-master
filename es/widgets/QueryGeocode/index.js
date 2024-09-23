import _asyncToGenerator from '@babel/runtime-corejs3/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime-corejs3/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime-corejs3/regenerator';
import _concatInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/concat';
import _JSON$stringify from '@babel/runtime-corejs3/core-js-stable/json/stringify';
import _filterInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/filter';
import _mapInstanceProperty from '@babel/runtime-corejs3/core-js-stable/instance/map';
import _parseFloat from '@babel/runtime-corejs3/core-js-stable/parse-float';
import 'core-js/modules/es.array.join.js';
import 'core-js/modules/es.array.push.js';
import { Form, message, Modal, Row, Col, Spin, Select, Input, Space, Button } from 'antd';
import { GISToolHelper } from 'qm-map-wrapper';
import React, { memo, useRef, useState } from 'react';
import MapWidget from '../MapWidget/index.js';
import axios from 'axios';

var QueryGeocode = function QueryGeocode(props) {
  var region = props.region,
    tdtkey = props.tdtkey,
    image = props.image,
    open = props.open,
    mapSetting = props.mapSetting,
    mapOptions = props.mapOptions,
    onOk = props.onOk,
    onCancel = props.onCancel;
  var _Form$useForm = Form.useForm(),
    _Form$useForm2 = _slicedToArray(_Form$useForm, 1),
    form = _Form$useForm2[0];
  var mapR = useRef();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    loading = _useState2[0],
    setLoading = _useState2[1];
  var _useState3 = useState(''),
    _useState4 = _slicedToArray(_useState3, 2),
    location = _useState4[0],
    setLocation = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
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
  var fetchSearchDataByKeyWord = GISToolHelper.debounce(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _context, _form$getFieldsValue, _location, params, url, searchData, pois;
    return _regeneratorRuntime.wrap(function _callee$(_context2) {
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
          url = _concatInstanceProperty(_context = "http://api.tianditu.gov.cn/v2/search?type=query&postStr=".concat(_JSON$stringify(params), "&tk=")).call(_context, tdtkey);
          _context2.next = 6;
          return axios.get(url);
        case 6:
          searchData = _context2.sent;
          if (searchData.data) setLoading(false);
          pois = searchData.data.pois;
          if (!pois) {
            message.warning('当前区域没有查询到结果');
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
    var geo = GISToolHelper.createPointFeatureCollection(lonlat, {});
    if (image) {
      var _mapR$current3;
      (_mapR$current3 = mapR.current) === null || _mapR$current3 === void 0 || _mapR$current3.selectSymbolIconFeature(geo, 'queryGeoIcon', 'icon-location');
    } else {
      var _mapR$current4;
      (_mapR$current4 = mapR.current) === null || _mapR$current4 === void 0 || _mapR$current4.selectCircleFeature(geo, 'queryGeoIcon');
    }
  };
  var fetchSearchDataByLonLat = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime.mark(function _callee2(point) {
      var _context3, params, url, searchData, _searchData$data$resu, lon, lat, _location2, resObject;
      return _regeneratorRuntime.wrap(function _callee2$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            params = {
              lon: point.lng,
              lat: point.lat,
              ver: 1 // 接口版本
            };
            url = _concatInstanceProperty(_context3 = "http://api.tianditu.gov.cn/geocoder?type=geocode&postStr=".concat(_JSON$stringify(params), "&tk=")).call(_context3, tdtkey);
            _context4.next = 5;
            return axios.get(url);
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
    var selectPois = _filterInstanceProperty(searchResultPois).call(searchResultPois, function (d) {
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
    var lonlatArray = _mapInstanceProperty(lonlatStr).call(lonlatStr, _parseFloat);
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
  return /*#__PURE__*/React.createElement(Modal, {
    open: open,
    width: 1200,
    okText: "\u63D0\u4EA4",
    title: "\u5730\u56FE\u9875\u9762",
    destroyOnClose: true,
    maskClosable: false,
    footer: false,
    closable: false
  }, /*#__PURE__*/React.createElement(Form, {
    form: form,
    layout: "horizontal",
    onFinish: handleOk
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '16px',
      color: '#584B4B',
      fontWeight: 'bold',
      marginBottom: '20px'
    }
  }, "\u83B7\u53D6\u7ECF\u7EAC\u5EA6\u548C\u5730\u5740 \uFF1A"), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    offset: 1,
    span: 6
  }, /*#__PURE__*/React.createElement(Form.Item, {
    name: "location",
    label: "\u8BF7\u8F93\u5165:",
    rules: [{
      required: true,
      message: '请选择地址!'
    }]
  }, /*#__PURE__*/React.createElement(Spin, {
    spinning: loading
  }, /*#__PURE__*/React.createElement(Select, {
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
    options: _mapInstanceProperty(searchResultPois).call(searchResultPois, function (d) {
      return {
        value: d.hotPointID,
        label: d.name
      };
    })
  }))))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    offset: 1,
    span: 6
  }, /*#__PURE__*/React.createElement(Form.Item, {
    name: "longitude",
    label: "\u4E1C\u7ECF\uFF1A",
    rules: [{
      required: true,
      message: '请选择地址!'
    }]
  }, /*#__PURE__*/React.createElement(Input, null))), /*#__PURE__*/React.createElement(Col, {
    offset: 1,
    span: 6
  }, /*#__PURE__*/React.createElement(Form.Item, {
    name: "latitude",
    label: "\u5317\u7EAC\uFF1A",
    rules: [{
      required: true,
      message: '请选择地址!'
    }]
  }, /*#__PURE__*/React.createElement(Input, null)))), /*#__PURE__*/React.createElement(Row, null, /*#__PURE__*/React.createElement(Col, {
    offset: 1,
    span: 23
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: 400,
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement(MapWidget, {
    mapLayerSettting: mapSetting,
    mapOptions: mapOptions,
    onMapLoad: mapLoadHandle
  })))), /*#__PURE__*/React.createElement(Form.Item, {
    wrapperCol: {
      offset: 21
    }
  }, /*#__PURE__*/React.createElement(Space, {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Button, {
    type: "primary",
    htmlType: "submit"
  }, "\u786E\u5B9A"), /*#__PURE__*/React.createElement(Button, {
    htmlType: "button",
    onClick: handleCancel
  }, "\u53D6\u6D88")))));
};
var index = /*#__PURE__*/memo(QueryGeocode);

export { index as default };
