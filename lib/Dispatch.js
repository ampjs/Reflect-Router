import React from 'react';
import Router from './index.js';

class Dispatch extends React.Component {
    constructor(props) {
        super(props);

        document.addEventListener('click', this.handleClick.bind(this), false);

        this.origin = window.location.pathname;

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
        this.Router.hashChange();

        return window.location;
    }

    do() {
        for(var i in this.Router.Collection.get) {
            var theRoute = this.Router.Collection.get[i];
            if(this.click.replace('#', '') === theRoute.path) {
                this.currentRoute = theRoute;
                this.to();
                return this;
            }
        }

        window.location.href = this.click;
    }

    handleClick(e) {
        var e = window.e || e;

        if(e.target.tagName !== 'A') {
            return;
        }

        this.click = e.target.getAttribute('href', 2);
        this.do();

        e.preventDefault();
    }
}

export default Dispatch;
