'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _CustomPropTypes = require('./utils/CustomPropTypes');

var CustomPropTypes = _interopRequireWildcard(_CustomPropTypes);

var _Scale = require('./utils/Scale');

var _Data = require('./utils/Data');

var _xyPropsEqual = require('./utils/xyPropsEqual');

var _xyPropsEqual2 = _interopRequireDefault(_xyPropsEqual);

var _RangeRect = require('./RangeRect');

var _RangeRect2 = _interopRequireDefault(_RangeRect);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AreaBarChart = function (_React$Component) {
  _inherits(AreaBarChart, _React$Component);

  function AreaBarChart() {
    _classCallCheck(this, AreaBarChart);

    return _possibleConstructorReturn(this, (AreaBarChart.__proto__ || Object.getPrototypeOf(AreaBarChart)).apply(this, arguments));
  }

  _createClass(AreaBarChart, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var shouldUpdate = !(0, _xyPropsEqual2.default)(this.props, nextProps, ['barStyle']);
      // console.log('should areabarchart update?', shouldUpdate);
      return shouldUpdate;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          scale = _props.scale,
          data = _props.data,
          horizontal = _props.horizontal,
          getX = _props.getX,
          getXEnd = _props.getXEnd,
          getY = _props.getY,
          getYEnd = _props.getYEnd,
          barClassName = _props.barClassName,
          barStyle = _props.barStyle,
          getClass = _props.getClass;

      (0, _invariant2.default)((0, _Scale.hasXYScales)(scale), 'AreaBarChart.props.scale.x and scale.y must both be valid d3 scales');

      var barProps = {
        scale: scale,
        style: barStyle
      };
      var getZero = _lodash2.default.constant(0);

      return _react2.default.createElement(
        'g',
        null,
        data.map(function (d, i) {
          var _map = ['onMouseEnterBar', 'onMouseMoveBar', 'onMouseLeaveBar'].map(function (eventName) {

            // partially apply this bar's data point as 2nd callback argument
            var callback = _lodash2.default.get(_this2.props, eventName);
            return _lodash2.default.isFunction(callback) ? _lodash2.default.partial(callback, _lodash2.default, d) : null;
          }),
              _map2 = _slicedToArray(_map, 3),
              onMouseEnter = _map2[0],
              onMouseMove = _map2[1],
              onMouseLeave = _map2[2];

          barProps.className = 'chart-area-bar ' + (getClass ? (0, _Data.makeAccessor)(getClass)(d) : '') + ' ' + barClassName;
          return _react2.default.createElement(_RangeRect2.default, _extends({
            datum: d,
            getX: horizontal ? getZero : getX,
            getXEnd: horizontal ? getX : getXEnd,
            getY: !horizontal ? getZero : getY,
            getYEnd: !horizontal ? getY : getYEnd,
            key: 'chart-area-bar-' + i,
            onMouseEnter: onMouseEnter,
            onMouseMove: onMouseMove,
            onMouseLeave: onMouseLeave
          }, barProps));
        })
      );
    }
  }], [{
    key: 'getDomain',
    value: function getDomain(props) {
      var scaleType = props.scaleType,
          horizontal = props.horizontal,
          data = props.data;

      // only have to specify range axis domain, other axis uses default domainFromData
      // for area bar chart, the independent variable is the range
      // ie. the range controls the thickness of the bar

      var rangeAxis = horizontal ? 'y' : 'x';
      var rangeDataType = (0, _Scale.dataTypeFromScaleType)(scaleType[rangeAxis]);
      // make accessor functions from getX|Y and getX|YEnd
      var rangeStartAccessor = (0, _Data.makeAccessor)(props['get' + rangeAxis.toUpperCase()]);
      var rangeEndAccessor = (0, _Data.makeAccessor)(props['get' + rangeAxis.toUpperCase() + 'End']);

      return _defineProperty({}, rangeAxis, (0, _Data.domainFromRangeData)(data, rangeStartAccessor, rangeEndAccessor, rangeDataType));
    }
  }]);

  return AreaBarChart;
}(_react2.default.Component);

AreaBarChart.propTypes = {
  scale: CustomPropTypes.xyObjectOf(_propTypes2.default.func.isRequired),
  data: _propTypes2.default.array,
  horizontal: _propTypes2.default.bool,

  getX: CustomPropTypes.getter,
  getXEnd: CustomPropTypes.getter,
  getY: CustomPropTypes.getter,
  getYEnd: CustomPropTypes.getter,
  getClass: CustomPropTypes.getter,

  barClassName: _propTypes2.default.string,
  barStyle: _propTypes2.default.object,

  onMouseEnterBar: _propTypes2.default.func,
  onMouseMoveBar: _propTypes2.default.func,
  onMouseLeaveBar: _propTypes2.default.func
};
AreaBarChart.defaultProps = {
  data: [],
  horizontal: false,
  barClassName: '',
  barStyle: {}
};
exports.default = AreaBarChart;
//# sourceMappingURL=AreaBarChart.js.map