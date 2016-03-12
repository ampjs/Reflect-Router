import React from 'react';
import Route from './Route.js';
import RouteCollection from './RouteCollection.js';
import Dispatch from './Dispatch.js';
import Middleware from './Middleware.js';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.name = 'Router';

        window.addEventListener('popstate', this.locationChange.bind(this), false);

        this.RouteCollection    = new RouteCollection(null);
        this.Dispatch           = new Dispatch;
        this.Middleware         = new Middleware;

        return this;
    }

    componentWillMount() {
        this.expressions = {
            ':id': '([0-9a-z-].+)',
            ':alpha': '([a-zA-Z].+)',
            ':uuid': '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
        };

        this.RouteCollection.create(this.props.children);
        this.Dispatch.assign(this).do();

        return this;
    }

    locationChange() {
        this.Dispatch.History.check();

        this.setState({
            route: this.Dispatch.click
        });

        return this;
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
        if(typeof this.Dispatch.currentRoute === 'undefined') {
            return (<span></span>);
        }

        var current = this.Dispatch.currentRoute;

        if(this.Middleware.use(current.Route)) {
            return (<this.Middleware.component />);
        };

        return (<current.component />);
    }
}

Router.propTypes = {};
Router.defaultProps = {};

Router.displayName = 'ReflectRouter';

export { Router, Route };
