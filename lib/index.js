import assign from 'object-assign';

const changesInput = (input, keys, value) => {
  for (let i = 0; i < keys.length; ++i) {
    if (!input) {
      return true;
    }

    input = input[keys[i]];
  }

  return input !== value;
};

const _setIn = (input = {}, [key, ...rest], value) => assign(
  {}, input, {
    [key]: rest.length ? _setIn(input[key], rest, value) : value
  }
);

export const setIn = (input, keys, value) =>
  changesInput(input, keys, value) ? _setIn(input, keys, value) : input;

export default {setIn};
