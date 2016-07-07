import entries from 'object.entries';

export default (input, fn) => {
  let changed = false;
  const result = entries(input).reduce((result, [key, obj]) => {
    const newObj = fn(input[key], key);
    changed = changed || obj !== newObj;
    result[key] = newObj;
    return result;
  }, {});
  return changed ? result : input;
};
