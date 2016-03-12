'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reflectCollection = require('reflect-collection');

var _reflectCollection2 = _interopRequireDefault(_reflectCollection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RouteCollection = function (_ReflectCollection) {
    _inherits(RouteCollection, _ReflectCollection);

    function RouteCollection(data) {
        _classCallCheck(this, RouteCollection);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RouteCollection).call(this, data));

        _this.schema(['path', 'Route', 'component', 'name'], true);
        return _this;
    }

    _createClass(RouteCollection, [{
        key: 'create',
        value: function create(children, parent) {
            var routes = _react2.default.Children,
                parent = parent || null;

            routes.forEach(children, function (child, childCount) {
                var current = this._childObject(child, parent);

                this.add(current);

                if (childCount > 0) {
                    this.create(child.props.children, current);
                }
            }.bind(this));

            return this;
        }
    }, {
        key: '_childObject',
        value: function _childObject(child, parent) {
            var parentPath = '';

            if (parent) {
                parentPath = parent.path;
            }

            var fullPath = parentPath + '/' + child.props.path;

            if (fullPath.substring(0, 1) == '/') {
                fullPath = fullPath.substring(1);
            }

            return {
                Route: child,
                path: fullPath,
                component: child.props.component,
                name: child.props.name
            };
        }
    }]);

    return RouteCollection;
}(_reflectCollection2.default);

exports.default = RouteCollection;