import React from 'react';

class Router extends React.Component {
    constructor(props) {
        super(props);

        this.displayName = 'ReflectRouter';

        window.addEventListener('popstate', this.locationChange.bind(this), false);

        return this;
    }

    componentWillMount() {
        this.expressions = {
            ':id': '([0-9a-z-].+)',
            ':alpha': '([a-zA-Z].+)',
            ':uuid': '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}'
        };

        return this;
    }

    locationChange() {
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
        return (<span>Reflect Router</span>);
    }
}

Router.propTypes = {};
Router.defaultProps = {};

export default { Router };
