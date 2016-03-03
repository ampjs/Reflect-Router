class Middleware {
    constructor() {

    }

    use(component) {
        this.component = null;
        if(typeof component.props.middleware !== 'function' && typeof component.props.middleware === 'undefined') {
            return false;
        }

        var middleware = new component.props.middleware();

        this.component = component.props.middleware;

        if(middleware.handle()) {
            return false;
        }

        return true;
    }
}

export default Middleware;
