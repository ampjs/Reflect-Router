var React = require('react'),
    ReactTest = require('react-addons-test-utils'),
    assert = require('assert'),
    chai = require('chai'),
    jsdom = require('jsdom'),
    {Router, Route} = require('../lib/index.js').default;

export default class MockComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="mocked-component">
                Mocked Component
            </div>
        )
    }
}

describe('Routing component', function() {
    before('Render and locate element', function() {
        this.renderedComponent = ReactTest.renderIntoDocument(
            <Router target="react-page">
                <Route path="test/route">
                    <MockComponent />
                </Route>
                <Route path="another/route" />
            </Router>
        );

        this.inputComponent = ReactTest.findRenderedDOMComponentWithClass(this.renderedComponent, 'test');
    });

    it('Routes has a default', function() {
        chai.expect(this.renderedComponent.defaultRoute).to.be.an('string');
        chai.expect(this.renderedComponent.defaultRoute).to.equal('/');

        this.renderedComponent.defaultRoute = "/test";

        chai.expect(this.renderedComponent.defaultRoute).to.equal('/test');
    });

    it('Routes state.routes is an Array, contain two and has path \'test/route\'', function() {
        chai.expect(this.renderedComponent.state.routes).to.be.an('array');
        chai.expect(this.renderedComponent.state.routes.length).to.equal(2);
        chai.expect(this.renderedComponent.getRoute('test/route')).to.not.be.null;
    });

    it('Routes match on hash change', function() {
        this.renderedComponent.windowLocation = {
            hash: '#another/route'
        };

        chai.expect(this.renderedComponent.state.currentRoute.path).to.equal('another/route');

        this.renderedComponent.windowLocation = {
            hash: '#test/route'
        };

        chai.expect(this.renderedComponent.state.currentRoute.path).to.equal('test/route');
    });

    it('Default route expressions exist', function() {
        chai.expect(this.renderedComponent.state.expressions).to.be.an('object');
        chai.expect(Object.keys(this.renderedComponent.state.expressions)).to.have.length.above(0);
    });

    it('Route expressions to contain \':test\'', function() {
        chai.expect(this.renderedComponent.addExpression).to.be.an('function');

        this.renderedComponent.addExpression({
            ':test': 'test-expression'
        });

        chai.expect(this.renderedComponent.state.expressions).to.have.any.keys(':test');
    });

    it('Route target element is set.', function() {
        chai.expect(this.renderedComponent.props.target).to.exist;
        chai.expect(this.renderedComponent.state.targetElement.id).to.equal('react-page');
    });
});
