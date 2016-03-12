import React from 'react';

class Route extends React.Component {
    constructor(props) {
        super(props);
    }
}

Route.propTypes = {
    path: React.PropTypes.string.isRequired,
    component: React.PropTypes.func.isRequired,
    middleware: React.PropTypes.func,
    name: React.PropTypes.string
};

export default Route;
