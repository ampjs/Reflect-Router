import React from 'react';
import Route from './Route.js';
import Collection from './Collection.js';
import Dispatch from './Dispatch.js';
import Middleware from './Middleware.js';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.name = 'Router';

        window.addEventListener('popstate', this.hashChange.bind(this), false);

        this.Collection = new Collection;
        this.Dispatch   = new Dispatch;
        this.Middleware = new Middleware;

        return this;
    }

    componentWillMount() {
        this.expressions = {
            ':id': '([0-9a-z-].+)',
            ':alpha': '([a-zA-Z].+)',
            ':uuid': '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
        };

        this.Collection.create(this.props.children, null);
        this.Dispatch.assign(this).do();

        return this;
    }

    hashChange() {
        console.log('Router.hashChange')
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
        console.log(this.Collection);
        if(typeof this.Dispatch.currentRoute === 'undefined') {
            return (<span></span>);
        }

        var current = this.Dispatch.currentRoute;

        console.log(current);

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
