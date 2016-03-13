import React from 'react';
import Dispatch from './Dispatch.js';

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    assign(dispatcher) {
        if(dispatcher instanceof Dispatch) {
            this.Dispatch = dispatcher
        } else {
            console.log('History.assign will only accept a Dispatch instance.');
        }

        return this;
    }

    get location() {
        if(this.locationHash) {
            return this.locationHash;
        } else {
            return this.locationPath;
        }
    }

    get locationHash() {
        return window.location.hash.replace('#', '');
    }

    get locationPath() {
        return window.location.pathname.replace(this.Dispatch.origin, '');
    }
}

export default History;
