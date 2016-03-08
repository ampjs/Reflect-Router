import React from 'react';
import Router from './index.js';
import History from './History.js';

class Dispatch extends React.Component {
    constructor(props) {
        super(props);

        document.addEventListener('click', this.handleClick.bind(this), false);

        this.origin     = window.location.pathname;
        this.name       = 'Dispatch';

        this.History    = new History;
        this.History.assign(this);

        this.currentRoute = {
            hash: ''
        };

        this.click = '';
    }

    assign(router) {
        if(router.name === 'Router') {
            this.Router = router
        } else {
            console.log('Dispatch.assign will only accept a Router instance.');
        }

        return this;
    }

    to() {
        window.history.pushState('', '', this.origin + this.click);
        this.Router.locationChange();

        return window.location;
    }

    do() {
        this.inRouteCollection((theRoute) => {
            this.currentRoute = theRoute;
            this.to();
        });
    }

    inRouteCollection(callback) {
        for(var i in this.Router.Collection.get) {
            var theRoute = this.Router.Collection.get[i];
            if(this._routeMatches(theRoute)) {
                return callback(theRoute);
            }
        }

        return this;
    }

    _routeMatches(theRoute) {
        switch(this.click.replace('#', '')) {
            case theRoute.path:
                return true;
                break;
            case theRoute.name:
                this.click = theRoute.path;
                return true;
                break;
            default:
                return false;
        }
    }

    handleClick(e) {
        var e = window.e || e;

        if(e.target.tagName !== 'A') {
            return;
        }

        if(e.target.dataset['route']) {
            this.click = e.target.dataset['route'];
        } else {
            this.click = e.target.getAttribute('href', 2);
        }

        this.do();

        e.preventDefault();
    }
}

export default Dispatch;
