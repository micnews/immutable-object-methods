import assign from 'object-assign';

export default (first, ...args) =>
  Array.isArray(first)
  ? assign([], first, ...args)
  : assign({}, first, ...args);
