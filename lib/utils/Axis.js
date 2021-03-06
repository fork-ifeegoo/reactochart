"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAxisChildProps = getAxisChildProps;
function getAxisChildProps(props) {
  var scale = props.scale,
      width = props.width,
      height = props.height,
      position = props.position,
      placement = props.placement,
      spacing = props.spacing,
      ticks = props.ticks,
      tickCount = props.tickCount,
      tickLength = props.tickLength,
      tickClassName = props.tickClassName,
      tickStyle = props.tickStyle,
      title = props.title,
      titleDistance = props.titleDistance,
      titleAlign = props.titleAlign,
      titleRotate = props.titleRotate,
      titleStyle = props.titleStyle,
      labelDistance = props.labelDistance,
      labelClassName = props.labelClassName,
      labelStyle = props.labelStyle,
      labelFormat = props.labelFormat,
      labelFormats = props.labelFormats,
      labels = props.labels,
      gridLineClassName = props.gridLineClassName,
      gridLineStyle = props.gridLineStyle,
      onMouseEnterLabel = props.onMouseEnterLabel,
      onMouseMoveLabel = props.onMouseMoveLabel,
      onMouseLeaveLabel = props.onMouseLeaveLabel;


  var ticksProps = {
    width: width, height: height, scale: scale, ticks: ticks, tickCount: tickCount, spacing: spacing,
    position: position, placement: placement, tickLength: tickLength, tickStyle: tickStyle, tickClassName: tickClassName
  };

  var gridProps = {
    width: width, height: height, scale: scale, ticks: ticks, tickCount: tickCount, spacing: spacing,
    lineClassName: gridLineClassName, lineStyle: gridLineStyle
  };

  var labelsProps = {
    width: width, height: height, scale: scale, ticks: ticks, tickCount: tickCount, spacing: spacing,
    position: position, placement: placement, labels: labels,
    labelClassName: labelClassName, labelStyle: labelStyle, distance: labelDistance, format: labelFormat, formats: labelFormats,
    onMouseEnterLabel: onMouseEnterLabel, onMouseMoveLabel: onMouseMoveLabel, onMouseLeaveLabel: onMouseLeaveLabel
  };

  var titleProps = {
    width: width, height: height, position: position, placement: placement, title: title, spacing: spacing,
    style: titleStyle, distance: titleDistance, alignment: titleAlign, rotate: titleRotate
  };

  return { ticksProps: ticksProps, gridProps: gridProps, labelsProps: labelsProps, titleProps: titleProps };
}
//# sourceMappingURL=Axis.js.map