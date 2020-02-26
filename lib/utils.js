import React from 'react';
import { find, filter } from 'lodash';
export var foreachChildren = function foreachChildren(children, fn) {
  var childrenList = React.Children.toArray(children) || [];
  childrenList.forEach(fn);
};
export var filterChildren = function filterChildren(children, fn) {
  var childrenList = React.Children.toArray(children) || [];
  return filter(childrenList, fn);
};
export var checkIsTarget = function checkIsTarget(child, target) {
  var type = child && child.type;
  return type === target || type && type.prototype instanceof target;
};
export var findChild = function findChild(children, fn) {
  var childrenList = React.Children.toArray(children);
  return find(childrenList, fn);
};