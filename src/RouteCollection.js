import React from 'react';
import ReflectCollection from 'reflect-collection';

class RouteCollection extends ReflectCollection {
    constructor(data) {
        super(data);

        this.schema(['path', 'Route', 'component', 'name'], true);
    }

    create(children, parent) {
        var routes = React.Children,
            parent = parent || null;

        routes.forEach(children, function(child, childCount) {
            var current = this._childObject(child, parent);

            this.add(current);

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
            component: child.props.component,
            name: child.props.name
        };
    }
}

export default RouteCollection;
