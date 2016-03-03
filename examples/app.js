import React from 'react';
import ReactDOM from 'react-dom';
var {Router, Route} = require('../lib/index.js').default;

var BaseRoute = React.createClass({
    render: function() {
        return (
            <div className="test-class">
                Home Page
            </div>
        )
    }
});

var TestRoute = React.createClass({
    render: function() {
        return (
            <div className="test-class">
                Test Route
            </div>
        )
    }
});

var AnotherTestRoute = React.createClass({
    render: function() {
        return (
            <div className="test-class">
                Another Test Route
            </div>
        )
    }
});

var Middleware = React.createClass({
    handle: function() {
        return false;
    },
    render: function() {
        return (
            <div className="test-class">
                Middleware
            </div>
        )
    }
});

var Routes = React.createClass({
    render: function() {
        return (
            <Router>
                <Route path="" component={BaseRoute} />
                <Route path="test" component={TestRoute}>
                    <Route path="another" middleware={Middleware} component={AnotherTestRoute} />
                    <Route path="secondary" component={AnotherTestRoute}>
                        <Route path="deep" component={AnotherTestRoute} />
                    </Route>
                </Route>
            </Router>
        );
    }
});

ReactDOM.render(<Routes />, document.getElementById('react-page'));
