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
var MOVE_TIME = 0; // 当前移动时间戳

var Content =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Content, _React$Component);

  function Content(props) {
    var _this;

    _classCallCheck(this, Content);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Content).call(this, props));

    _this.onPositionTo = function (e) {
      var isMoveEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var _this$props = _this.props,
          options = _this$props.options,
          onPositionTo = _this$props.onPositionTo;
      var position = options.position;
      var startPosition = _this.state.startPosition;
      if (!startPosition) return;

      if (!isMoveEnd) {
        var timeStamp = new Date().getTime(); // 为了避免频繁的移动，不断渲染造成性能问题，每两次移动间隔在一定的时间

        if (timeStamp - MOVE_TIME <= 50) {
          return;
        }

        MOVE_TIME = timeStamp;
      }

      onPositionTo && onPositionTo({
        x: position.x + window.parseInt(e.pageX - startPosition.x),
        y: position.y + window.parseInt(e.pageY - startPosition.y)
      });

      _this.setState({
        startPosition: isMoveEnd ? null : {
          x: window.parseInt(e.pageX),
          y: window.parseInt(e.pageY)
        }
      });
    };

    _this.onMoveStart = function (e) {
      var startPosition = _this.state.startPosition;

      if (startPosition) {
        _this.setState({
          startPosition: null
        });
      } else {
        MOVE_TIME = new Date().getTime();

        _this.setState({
          startPosition: {
            x: e.pageX,
            y: e.pageY
          }
        });
      }
    };

    _this.onMove = function (e) {
      _this.onPositionTo(e);
    };

    _this.onMoveEnd = function (e) {
      _this.onPositionTo(e, true);
    };

    _this.state = {
      startPosition: null // 拖动起始点

    };
    return _this;
  }

  _createClass(Content, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.body.addEventListener('mousemove', this.onMove);
      document.body.addEventListener('mouseup', this.onMoveEnd);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      console.warn('要卸载了');
      document.body.removeEventListener('mousemove', this.onMove);
      document.body.removeEventListener('mouseup', this.onMoveEnd);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          options = _this$props2.options,
          justifyContent = _this$props2.justifyContent,
          transformOrigin = _this$props2.transformOrigin,
          className = _this$props2.className,
          _this$props2$style = _this$props2.style,
          style = _this$props2$style === void 0 ? {} : _this$props2$style;
      var position = options.position,
          _options$scale = options.scale,
          scale = _options$scale === void 0 ? 100 : _options$scale;
      var transform = "translate(".concat(position.x || 0, "px, ").concat(position.y || 0, "px) scale(").concat(window.parseInt(scale) / 100, ")");
      return React.createElement("div", {
        className: "petrus-zoom-content ".concat(className ? " ".concat(className) : ''),
        style: _objectSpread({}, style, {
          justifyContent: justifyContent || 'center'
        }),
        onMouseDown: this.onMoveStart // onMouseMove={this.onMove}
        // onMouseUp={this.onMoveEnd}

      }, React.createElement("div", {
        className: "petrus-zoom-content__wrap",
        style: {
          transformOrigin: transformOrigin,
          transform: transform
        }
      }, children));
    }
  }]);

  return Content;
}(React.Component);

Content.propTypes = {
  className: PropTypes.string,
  // 传入样式名
  style: PropTypes.object,
  // 传入样式
  options: PropTypes.object,
  // 默认设置选项
  justifyContent: PropTypes.string,
  // 对齐方式, 参数与 css 中 justify-content 保持一致
  transformOrigin: PropTypes.string // 缩放便宜基点，参数与 css 中 transform-origin 保持一致

};
Content.defaultProps = {
  className: '',
  style: null,
  options: null,
  justifyContent: 'center',
  // 对齐方式：默认居中
  transformOrigin: 'center'
};
export { Content as default };