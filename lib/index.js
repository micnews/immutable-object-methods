import assign from 'object-assign';

const changesInput = (input, keys, value) => {
  const key = keys[0];
  if (keys.length === 1) {
    return input[key] !== value;
  }

  if (!input[key]) {
    return true;
  }

  return changesInput(input[key], keys.slice(1), value);
};

const _setIn = (input = {}, keys, value) => {
  const key = keys[0];
  if (keys.length === 1) {
    return assign({}, input, {[key]: value});
  }

  return assign({}, input, {[key]: _setIn(input[key], keys.slice(1), value)});
};

export const setIn = (input, keys, value) => {
  return changesInput(input, keys, value) ? _setIn(input, keys, value) : input;
};
