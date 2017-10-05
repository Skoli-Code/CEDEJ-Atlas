webpackHotUpdate(0,{

/***/ "./src/components/molecules/TemperatureLegendRow/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__("./node_modules/react/react.js");

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__("./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styledComponents = __webpack_require__("./node_modules/styled-components/dist/styled-components.es.js");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _temperatures = __webpack_require__("./src/utils/temperatures.js");

var _components = __webpack_require__("./src/components/index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TemperatureRow = function TemperatureRow(_ref) {
  var name = _ref.name,
      temperature = _ref.temperature,
      patterns = _ref.patterns,
      aridity = _ref.aridity,
      showAridity = _ref.layers.aridity.visible;

  var temp = (0, _temperatures.findByValue)(temperature);
  var visibleAridities = showAridity ? visibleTypes(aridity) : [];
  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      Td,
      { align: 'left' },
      name
    ),
    visibleAridities.map(function (ar, key) {
      return _react2.default.createElement(_components.TemperatureLegendPattern, {
        key: key,
        patterns: patterns,
        aridity: ar,
        temperature: temp
      });
    }),
    visibleAridities.length === 0 && _react2.default.createElement(_components.TemperatureLegendPattern, { temperature: temp })
  );
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TemperatureRow, 'TemperatureRow', '/home/toutenrab/Dev/_PRO/Skoli/CEDEJ/Atlas/src/components/molecules/TemperatureLegendRow/index.js');
}();

;

/***/ })

})
//# sourceMappingURL=0.e5dbd7c8349a0a0cda6c.hot-update.js.map