import React from 'react';
import Route from './Route.js';
import Collection from './Collection.js';
import Middleware from './Middleware.js';

class Router extends React.Component {
    constructor(props) {
        super(props);

        window.addEventListener('hashchange', this.hashChange.bind(this), false);

        this.Collection = new Collection;
        this.Middleware = new Middleware;

        return this;
    }

    componentWillMount() {
        this._routeScan;

        this.expressions = {
            ':id': '([0-9a-z-].+)',
            ':alpha': '([a-zA-Z].+)',
            ':uuid': '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
        };

        this.setState({
            location: {
                path: this.windowLocation.pathname.replace('/', ''),
                hash: this.windowLocation.hash.replace('#', '')
            }
        });

        this.Collection.create(this.props.children, null)

        return this;
    }

    componentDidMount() {
        this._routeScan;
        return this;
    }

    hashChange() {
        this._routeScan;
        return this;
    }

    get _routeScan() {
        for(var i in this.Collection.get) {
            var theRoute = this.Collection.get[i];
            if(this.windowLocation.hash.replace('#', '') === theRoute.path) {
                this.setState({
                    currentRoute: theRoute
                });
            }
        }

        return this;
    }

    get windowLocation() {
        return window.location;
    }

    set windowLocation(object) {
        this.setState({
            location: object
        });

        for(var item in object) {
            window.location[item] = object[item].replace('#', '');
        }

        this._routeScan;

        return window.location;
    }

    addExpression(expressions) {
        if(typeof expressions !== 'object') {
            console.log('Router: addExpression argument must be an Object of {shortcode : expression}');
            return this;
        }

        for(var item in expressions) {
            this.expressions[item] = expressions[item];
        }

        return this;
    }

    render() {
        if(typeof this.state.currentRoute === 'undefined') {
            return (<span></span>);
        }

        var current = this.state.currentRoute;

        if(this.Middleware.use(current.Route)) {
            return (<this.Middleware.component />);
        };

        console.log(current.Route.type.name);

        return (<current.component />);
    }
}

Router.propTypes = {};
Router.defaultProps = {};

export default { Router, Route };
