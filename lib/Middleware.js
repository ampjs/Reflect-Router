'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Middleware = function () {
    function Middleware() {
        _classCallCheck(this, Middleware);
    }

    _createClass(Middleware, [{
        key: 'use',
        value: function use(component) {
            this.component = null;
            if (typeof component.props.middleware !== 'function' && typeof component.props.middleware === 'undefined') {
                return false;
            }

            var middleware = new component.props.middleware();

            this.component = component.props.middleware;

            if (middleware.handle()) {
                return false;
            }

            return true;
        }
    }]);

    return Middleware;
}();

exports.default = Middleware;