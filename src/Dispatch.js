import React from 'react';
import { Router, Route } from './ReflectRouter.js';
import History from './History.js';

class Dispatch extends React.Component {
    constructor(props) {
        super(props);

        document.addEventListener('click', this.handleClick.bind(this), false);

        this.origin         = window.location.pathname;
        this.name           = 'Dispatch';
        this.inCollection   = false;

        this.History    = new History;
        this.History.assign(this);

        this.currentRoute = {
            hash: ''
        };

        this.click = '';
    }

    assign(router) {
        if(router instanceof Router) {
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
        }).notInRouteCollection(() => {
            window.history.pushState('', '', this.click);
        });
    }

    check() {
        this.inRouteCollection((theRoute) => {
            this.currentRoute = theRoute;
        });
    }

    notInRouteCollection(callback) {
        if(!this.inCollection) {
            callback()
        }

        return this;
    }

    inRouteCollection(callback) {
        this.inCollection = false;

        var RouteCollection = this.Router.RouteCollection,
            RouteCollection = RouteCollection.where('path', this.click.replace('#', '')),
            RouteCollection = RouteCollection.orWhere('name', this.click.replace('#', ''));

        if(!RouteCollection.isEmpty()) {
            var theRoute = RouteCollection.first();
            this.inCollection = true;
            callback(theRoute);
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
