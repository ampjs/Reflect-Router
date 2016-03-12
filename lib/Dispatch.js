'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _History = require('./History.js');

var _History2 = _interopRequireDefault(_History);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dispatch = function (_React$Component) {
    _inherits(Dispatch, _React$Component);

    function Dispatch(props) {
        _classCallCheck(this, Dispatch);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dispatch).call(this, props));

        document.addEventListener('click', _this.handleClick.bind(_this), false);

        _this.origin = window.location.pathname;
        _this.name = 'Dispatch';
        _this.inCollection = false;

        _this.History = new _History2.default();
        _this.History.assign(_this);

        _this.currentRoute = {
            hash: ''
        };

        _this.click = '';
        return _this;
    }

    _createClass(Dispatch, [{
        key: 'assign',
        value: function assign(router) {
            if (router.name === 'Router') {
                this.Router = router;
            } else {
                console.log('Dispatch.assign will only accept a Router instance.');
            }

            return this;
        }
    }, {
        key: 'to',
        value: function to() {
            window.history.pushState('', '', this.origin + this.click);
            this.Router.locationChange();

            return window.location;
        }
    }, {
        key: 'do',
        value: function _do() {
            var _this2 = this;

            this.inRouteCollection(function (theRoute) {
                _this2.currentRoute = theRoute;
                _this2.to();
            }).notInRouteCollection(function () {
                console.log('notInRouteCollection callback');
                window.history.pushState('', '', _this2.click);
            });
        }
    }, {
        key: 'check',
        value: function check() {
            var _this3 = this;

            this.inRouteCollection(function (theRoute) {
                _this3.currentRoute = theRoute;
            });
        }
    }, {
        key: 'notInRouteCollection',
        value: function notInRouteCollection(callback) {
            console.log('notInRouteCollection this.inCollection', this.inCollection);
            if (!this.inCollection) {
                callback();
            }

            return this;
        }
    }, {
        key: 'inRouteCollection',
        value: function inRouteCollection(callback) {
            this.inCollection = false;

            var RouteCollection = this.Router.RouteCollection,
                RouteCollection = RouteCollection.where('path', this.click.replace('#', '')),
                RouteCollection = RouteCollection.orWhere('name', this.click.replace('#', ''));

            if (!RouteCollection.isEmpty()) {
                var theRoute = RouteCollection.first();
                this.inCollection = true;
                callback(theRoute);
            }

            return this;
        }
    }, {
        key: 'handleClick',
        value: function handleClick(e) {
            var e = window.e || e;

            if (e.target.tagName !== 'A') {
                return;
            }

            if (e.target.dataset['route']) {
                this.click = e.target.dataset['route'];
            } else {
                this.click = e.target.getAttribute('href', 2);
            }

            this.do();
            e.preventDefault();
        }
    }]);

    return Dispatch;
}(_react2.default.Component);

exports.default = Dispatch;