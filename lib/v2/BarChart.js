'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _d3 = require('d3');

var _d32 = _interopRequireDefault(_d3);

var _utilJs = require('./util.js');

// on the taxonomy of bar charts:

// there are 3 types of bar charts,
// distinguished by whether the 2D data points they plot represent values or ranges

// 1. Value-Value
// typical bar chart, plotting values that look like [[0,5], [1,3], ...]
// with bars that are centered horizontally on x-value and extend from 0 to y-value,
// (or centered vertically on their y-value and extend from 0 to the x-value, in the case of horizontal chart variant)
// eg. http://www.snapsurveys.com/wp-content/uploads/2012/10/bar_2d8.png

// 2. Range-Value
// instead of a single value, one of the two data points represents a range of values
// usually the range is the independent variable and the value is the observation
// most commonly used in histogram, where each bar represents a bin (which is a range)
// data may look something like [[0, 5], 100], [[5, 15], 300], ...] or [{x: 0, xEnd: 5, y:100}...]
// often all bars are the same width, (same range sizes) but not necessarily
// bars still from extend from 0 to y-value,
// but the x-values of their sides, and therefore their width, is determined by the range
// (or vice versa in the case of horizontal variant)
// eg. http://labs.physics.dur.ac.uk/skills/skills/images/histogram4.jpg

// 3. Value-Range
// like Range-Value, one of the two data points represents a range of values
// but generally the range is the dependent variable (ie. observation) instead of vice versa in #2
// bars are centered over their x-value as in #1,
// but their top & bottom y-values, and therefore their length, is determined by the range. they don't extend to 0.
// (or vice versa in the case of horizontal variant)
// eg. (horizontal) http://6.anychart.com/products/anychart/docs/users-guide/img/Samples/sample-range-bar-chart-y-datetime-axis.png

// 4. Range-Range
// both of the data points represent ranges
// ie. data looks like [{x: 10, xEnd: 20, y: 12, yEnd: 40} ...]
// these are simply plotted as floating rectangles whose coordinates, length and width are all determined by the ranges
// there is no horizontal or vertical variant
// eg... can't find a good example

// creating a BarChart component...
// x and y values are represented by getX and getY accessors passed in as props
// to represent a range instead of a single value, call with both getX and getXEnd (or getY and getYEnd),
// which will be the accessors for the start and end values of the range
// to represent horizontal vs. vertical variant, pass in orientation="horizontal" or orientation="vertical"

// so to create the types described above:
// 1. Value-Value - only pass in getX and getY, + orientation
// 2. Range-Value
//   a. pass in getX, getXEnd and getY with orientation="vertical"
//   b. or getX, getY and getYEnd with orientation="horizontal"
// 3. Value-Range
//   a. pass in getX, getY and getYEnd with orientation="vertical"
//   b. or getX, getXEnd and getY with orientation="horizontal"
// 4. Range-Range - pass in all of getX, getXEnd, getY and getYEnd. no need for orientation.

//const BAR_CHART_TYPES = {
//    VALUE_VALUE: 'VALUE_VALUE',
//    RANGE_VALUE: 'RANGE_VALUE',
//    VALUE_RANGE: 'VALUE_RANGE',
//    RANGE_RANGE: 'RANGE_RANGE',
//};

var PropTypes = _react2['default'].PropTypes;
function getBarChartType(props) {
    var getXEnd = props.getXEnd;
    var getYEnd = props.getYEnd;
    var orientation = props.orientation;

    var isVertical = orientation === 'vertical';
    return _lodash2['default'].isUndefined(getXEnd) && _lodash2['default'].isUndefined(getYEnd) ? 'ValueValue' : _lodash2['default'].isUndefined(getYEnd) && isVertical || _lodash2['default'].isUndefined(getXEnd) && !isVertical ? 'RangeValue' : _lodash2['default'].isUndefined(getXEnd) && isVertical || _lodash2['default'].isUndefined(getYEnd) && !isVertical ? 'ValueRange' : 'RangeRange';
}

function domain(data, type) {}

var BarChart = _react2['default'].createClass({
    displayName: 'BarChart',

    propTypes: {
        // the array of data objects
        data: PropTypes.array.isRequired,
        // accessor for X & Y coordinates
        getX: _utilJs.AccessorPropType,
        getY: _utilJs.AccessorPropType,

        orientation: PropTypes.string,

        xScale: PropTypes.func,
        yScale: PropTypes.func
    },
    getDefaultProps: function getDefaultProps() {
        return {
            orientation: 'vertical'
        };
    },

    statics: {
        getOptions: function getOptions(props, xType, yType) {},
        //getDomain(props, xType, yType) {
        //    const {data, getX, getY, orientation} = props;
        //    const [xAccessor, yAccessor] = [accessor(getX), accessor(getY)];
        //    const barType = getBarChartType(props);
        //    const isVertical = (orientation === 'vertical');
        //
        //    if(barType === 'ValueValue') {
        //        console.log(d3.extent(data, yAccessor), d3.extent(data, yAccessor).reverse());
        //        // bar extends to zero, so the bar axis must include zero
        //        const x = isVertical ?
        //            d3.extent(data, xAccessor) :
        //            d3.extent(d3.extent(data, xAccessor).concat(0));
        //        const y = isVertical ?
        //            d3.extent(d3.extent(data, yAccessor).concat(0)) :
        //            d3.extent(data, yAccessor).reverse();
        //        return {x, y}
        //    }
        //},
        getExtent: function getExtent(data, getX, getY, props) {
            console.log('props', props);
            console.log('extent', _d32['default'].extent(data, (0, _utilJs.accessor)(getX)));

            var xAccessor = (0, _utilJs.accessor)(getX);
            var yAccessor = (0, _utilJs.accessor)(getY);
            var type = getBarChartType(props);
            var isVertical = props.orientation === 'vertical';

            if (type === 'ValueValue') {
                console.log(_d32['default'].extent(data, yAccessor), _d32['default'].extent(data, yAccessor).reverse());
                // bar extends to zero, so the bar axis must include zero
                var x = isVertical ? _d32['default'].extent(data, xAccessor) : _d32['default'].extent(_d32['default'].extent(data, xAccessor).concat(0));
                var y = isVertical ? _d32['default'].extent(_d32['default'].extent(data, yAccessor).concat(0)) : _d32['default'].extent(data, yAccessor).reverse();
                return { x: x, y: y };
            }

            return {
                x: _d32['default'].extent(data, (0, _utilJs.accessor)(getX)),
                y: _d32['default'].extent(_d32['default'].extent(data, (0, _utilJs.accessor)(getY)).concat(0))
            };
        }
    },
    getHovered: function getHovered() {},

    render: function render() {
        console.log('barchart', this.props);

        //const type = getBarChartType(this.props);
        var renderer = this['render' + getBarChartType(this.props) + 'Bars'];

        return _react2['default'].createElement(
            'g',
            null,
            renderer()
        );
    },
    renderValueValueBars: function renderValueValueBars() {
        var _this = this;

        var _props = this.props;

        //const isHorizontal = this.props.orientation === 'bar';
        //const barThickness = this.state.barScale.rangeBand();
        var xScale = _props.xScale;
        var yScale = _props.yScale;
        var getX = _props.getX;
        var getY = _props.getY;
        var barThickness = 5;

        var xAccessor = (0, _utilJs.accessor)(getX);
        var yAccessor = (0, _utilJs.accessor)(getY);

        return this.props.orientation === 'vertical' ? _react2['default'].createElement(
            'g',
            null,
            this.props.data.map(function (d, i) {
                var yVal = yAccessor(d);
                var barLength = Math.abs(yScale(0) - yScale(yVal));
                var barY = yVal >= 0 ? yScale(0) - barLength : yScale(0);

                return _react2['default'].createElement('rect', {
                    className: 'chart-bar chart-bar-vertical',
                    x: _this.props.xScale(xAccessor(d)) - barThickness / 2,
                    y: barY,
                    width: barThickness,
                    height: barLength
                });
            })
        ) : _react2['default'].createElement(
            'g',
            null,
            this.props.data.map(function (d, i) {
                var xVal = xAccessor(d);
                var barLength = Math.abs(xScale(0) - xScale(xVal));
                var barX = xVal >= 0 ? xScale(0) : xScale(0) - barLength;

                return _react2['default'].createElement('rect', {
                    className: 'chart-bar chart-bar-vertical',
                    x: barX,
                    y: _this.props.yScale(yAccessor(d)) - barThickness / 2,
                    width: barLength,
                    height: barThickness
                });
            })
        );
    },
    renderRangeValueBars: function renderRangeValueBars() {
        var _this2 = this;

        return renderNotImplemented();

        var _props2 = this.props;
        var xScale = _props2.xScale;
        var yScale = _props2.yScale;
        var getX = _props2.getX;
        var getY = _props2.getY;

        var isHorizontal = this.props.orientation === 'bar';
        //const barThickness = this.state.barScale.rangeBand();
        var barThickness = 5;

        var xAccessor = (0, _utilJs.accessor)(getX);
        var yAccessor = (0, _utilJs.accessor)(getY);

        return _react2['default'].createElement(
            'g',
            null,
            this.props.data.map(function (d, i) {
                var yVal = yAccessor(d);
                var barLength = Math.abs(yScale(0) - yScale(yVal));
                var barY = yVal >= 0 ? yScale(0) - barLength : yScale(0);

                return _react2['default'].createElement('rect', {
                    className: 'chart-bar chart-bar-vertical',
                    x: _this2.props.xScale(xAccessor(d)) - barThickness / 2,
                    y: barY,
                    width: barThickness,
                    height: barLength
                });
            })
        );
    },
    renderValueRangeBars: function renderValueRangeBars() {
        return renderNotImplemented('value range');
    },
    renderRangeRangeBars: function renderRangeRangeBars() {}
});

function renderNotImplemented() {
    var text = arguments.length <= 0 || arguments[0] === undefined ? "not implemented" : arguments[0];

    return _react2['default'].createElement(
        'svg',
        { x: 100, y: 100, style: { overflow: 'visible' } },
        _react2['default'].createElement(
            'text',
            null,
            text
        )
    );
}

exports['default'] = BarChart;
module.exports = exports['default'];