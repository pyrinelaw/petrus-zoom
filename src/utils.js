import React from 'react';

import { find, filter } from 'lodash';

export const foreachChildren = (children, fn) => {
    const childrenList = React.Children.toArray(children) || [];
    childrenList.forEach(fn);
};

export const filterChildren = (children, fn) => {
    const childrenList = React.Children.toArray(children) || [];
    return filter(childrenList, fn);
};

export const checkIsTarget = (child, target) => {
    const type = child && child.type;
    return type === target || (type && type.prototype instanceof target);
};

export const findChild = (children, fn) => {
    const childrenList = React.Children.toArray(children);
    return find(childrenList, fn);
};
