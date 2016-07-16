import _assign from 'object-assign';

const assign = (first, ...args) =>
  Array.isArray(first)
  ? _assign([], first, ...args)
  : _assign({}, first, ...args);

export default assign;
