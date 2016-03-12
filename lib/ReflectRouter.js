'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Route = exports.Router = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Route = require('./Route.js');

var _Route2 = _interopRequireDefault(_Route);

var _RouteCollection = require('./RouteCollection.js');

var _RouteCollection2 = _interopRequireDefault(_RouteCollection);

var _Dispatch = require('./Dispatch.js');

var _Dispatch2 = _interopRequireDefault(_Dispatch);

var _Middleware = require('./Middleware.js');

var _Middleware2 = _interopRequireDefault(_Middleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Router = function (_React$Component) {
    _inherits(Router, _React$Component);

    function Router(props) {
        var _ret;

        _classCallCheck(this, Router);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Router).call(this, props));

        _this.name = 'Router';

        window.addEventListener('popstate', _this.locationChange.bind(_this), false);

        _this.RouteCollection = new _RouteCollection2.default(null);
        _this.Dispatch = new _Dispatch2.default();
        _this.Middleware = new _Middleware2.default();

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Router, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.expressions = {
                ':id': '([0-9a-z-].+)',
                ':alpha': '([a-zA-Z].+)',
                ':uuid': '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
            };

            this.RouteCollection.create(this.props.children);
            this.Dispatch.assign(this).do();

            return this;
        }
    }, {
        key: 'locationChange',
        value: function locationChange() {
            this.Dispatch.check();

            this.setState({
                route: this.Dispatch.click
            });

            return this;
        }
    }, {
        key: 'addExpression',
        value: function addExpression(expressions) {
            if ((typeof expressions === 'undefined' ? 'undefined' : _typeof(expressions)) !== 'object') {
                console.log('Router: addExpression argument must be an Object of {shortcode : expression}');
                return this;
            }

            for (var item in expressions) {
                this.expressions[item] = expressions[item];
            }

            return this;
        }
    }, {
        key: 'render',
        value: function render() {
            if (typeof this.Dispatch.currentRoute === 'undefined') {
                return _react2.default.createElement('span', null);
            }

            var current = this.Dispatch.currentRoute;

            if (this.Middleware.use(current.Route)) {
                return _react2.default.createElement(this.Middleware.component, null);
            };

            return _react2.default.createElement(current.component, null);
        }
    }]);

    return Router;
}(_react2.default.Component);

Router.propTypes = {};
Router.defaultProps = {};

Router.displayName = 'ReflectRouter';

exports.Router = Router;
exports.Route = _Route2.default;