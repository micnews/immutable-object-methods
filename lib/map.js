export default (input, fn) => {
  let changed = false;
  const result = Object.keys(input).reduce((result, key) => {
    const obj = input[key];
    const newObj = fn(input[key], key);
    changed = changed || obj !== newObj;
    result[key] = newObj;
    return result;
  }, {});
  return changed ? result : input;
};
