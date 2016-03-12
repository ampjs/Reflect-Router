'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dispatch = require('./Dispatch.js');

var _Dispatch2 = _interopRequireDefault(_Dispatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var History = function (_React$Component) {
    _inherits(History, _React$Component);

    function History(props) {
        _classCallCheck(this, History);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(History).call(this, props));
    }

    _createClass(History, [{
        key: 'assign',
        value: function assign(dispatcher) {
            if (dispatcher.name === 'Dispatch') {
                this.Dispatch = dispatcher;
            } else {
                console.log('History.assign will only accept a Dispatch instance.');
            }

            return this;
        }
    }, {
        key: 'check',
        value: function check() {
            var _this2 = this;

            this.Dispatch.click = this.location;

            this.Dispatch.inRouteCollection(function (theRoute) {
                _this2.Dispatch.currentRoute = theRoute;
            });

            return this.Dispatch;
        }
    }, {
        key: 'location',
        get: function get() {
            if (this.locationHash) {
                return this.locationHash;
            } else {
                return this.locationPath;
            }
        }
    }, {
        key: 'locationHash',
        get: function get() {
            return window.location.hash.replace('#', '');
        }
    }, {
        key: 'locationPath',
        get: function get() {
            return window.location.pathname.replace(this.Dispatch.origin, '');
        }
    }]);

    return History;
}(_react2.default.Component);

exports.default = History;