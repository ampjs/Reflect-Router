import React from 'react';

class Collection extends React.Component {
    constructor(props) {
        super(props);

        this.collection = [];
    }

    get get() {
        return this.collection;
    }

    create(children, parent) {
        var routes = React.Children;

        routes.forEach(children, function(child, childCount) {
            var current = this._childObject(child, parent);

            this.extend(current)

            if(childCount > 0) {
                this.create(child.props.children, current);
            }
        }.bind(this));

        return this;
    }

    _childObject(child, parent) {
        var parentPath = '';

        if(parent) {
            parentPath = parent.path;
        }

        var fullPath = parentPath + '/' + child.props.path;

        if(fullPath.substring(0, 1) == '/') {
            fullPath = fullPath.substring(1);
        }

        return {
            Route: child,
            path: fullPath,
            component: child.props.component
        };
    }

    extend(item) {
        this.collection.push(item);

        return this;
    }
}

export default Collection;
