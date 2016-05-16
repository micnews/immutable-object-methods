import assign from './assign';

export default (input, key) => {
  if (input[key] === undefined) {
    return input;
  }

  const result = assign(input);
  delete result[key];
  return result;
};
