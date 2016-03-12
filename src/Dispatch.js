import React from 'react';
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
        for(var i in this.Router.RouteCollection.all()) {
            var RouteCollection = this.Router.RouteCollection,
                RouteCollection = RouteCollection.where('path', this.click.replace('#', '')),
                RouteCollection = RouteCollection.orWhere('name', this.click.replace('#', ''));

            if(!RouteCollection.isEmpty()) {
                var theRoute = RouteCollection.first();
                this.click = theRoute.path;
                return callback(theRoute);
            }
        }

        return this;
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
