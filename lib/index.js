import _extends from "@babel/runtime/helpers/esm/extends";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import Content from './content';
import { checkIsTarget } from './utils'; // 默认设置选项

var DEFAULT_OPTIONS = {
  scale: 100,
  // 缩放倍数, js 加减的时候存在小数不正常的情况，为了避免此情况使用100的倍数来控制
  // 偏移位置控制
  position: {
    x: 0,
    // x 轴偏移像素
    y: 0 // y 轴偏移像素

  }
};

var Zoom =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Zoom, _React$Component);

  // 正常的做法都是会放到 static 中，目前 eslint 并不允许这样使用，相应配置需要屏蔽
  // 目前还没有找到对应配置项
  // static Content = Content;
  function Zoom(props) {
    var _this;

    _classCallCheck(this, Zoom);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Zoom).call(this, props));

    _this.onZoomStep = function (stepValue) {
      var options = _this.state.options;
      var _options$scale = options.scale,
          scale = _options$scale === void 0 ? 100 : _options$scale;
      var newScale = scale + (window.parseInt(stepValue) || 0);
      if (newScale <= 0) return;

      _this.setState({
        options: _objectSpread({}, options, {
          scale: newScale
        })
      });
    };

    _this.onZoomTo = function (value) {
      if (!(value > 0)) return;
      var options = _this.state.options;
      var _options$scale2 = options.scale,
          scale = _options$scale2 === void 0 ? 100 : _options$scale2;
      var newScale = window.parseInt(value) || scale;

      _this.setState({
        options: _objectSpread({}, options, {
          scale: newScale
        })
      });
    };

    _this.onPositionTo = function (position) {
      var options = _this.state.options;

      _this.setState({
        options: _objectSpread({}, options, {
          position: position || options.position
        })
      });
    };

    _this.onReset = function () {
      _this.setState({
        options: _objectSpread({}, DEFAULT_OPTIONS, {}, _this.props.defaultOptions || {})
      });
    };

    _this.renderContent = function (dom) {
      var options = _this.state.options;
      return React.createElement(Content, _extends({}, dom.props, {
        options: options,
        onPositionTo: _this.onPositionTo
      }));
    };

    _this.renderChildren = function () {
      var options = _this.state.options;
      var children = _this.props.children;
      var childrenDom = typeof children == 'function' && children({
        options: options,
        onZoomStep: _this.onZoomStep,
        onZoomTo: _this.onZoomTo,
        onPositionTo: _this.onPositionTo,
        onReset: _this.onReset
      });
      var childrenList = get(childrenDom, 'props.children') || childrenDom || [];
      var list = childrenList.map(function (child, index) {
        if (checkIsTarget(child, Content)) {
          return React.createElement(React.Fragment, {
            key: "zoom-child-".concat(index)
          }, _this.renderContent(child));
        }

        return React.createElement(React.Fragment, {
          key: "zoom-child-".concat(index)
        }, child);
      });
      return list;
    };

    _this.state = {
      options: _objectSpread({}, DEFAULT_OPTIONS, {}, props.defaultOptions || {})
    };
    return _this;
  }
  /**
   * 按步骤缩放，如果填入负数，则会缩小
   */


  _createClass(Zoom, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          style = _this$props.style;
      return React.createElement("div", {
        className: "petrus-zoom ".concat(className ? " ".concat(className) : ''),
        style: style || {}
      }, this.renderChildren());
    }
  }]);

  return Zoom;
}(React.Component);

Zoom.propTypes = {
  defaultOptions: PropTypes.object,
  // 默认设置选项
  className: PropTypes.string,
  // 传入样式名
  style: PropTypes.object // 传入样式

};
Zoom.defaultProps = {
  defaultOptions: DEFAULT_OPTIONS,
  className: '',
  style: null
};
Zoom.Content = Content;
export default Zoom;