const map = (input, fn) => {
  let changed = false;
  const result = Object.keys(input).map((key) => {
    return [key, input[key]];
  }).reduce((result, [key, obj]) => {
    const newObj = fn(input[key], key);
    changed = changed || obj !== newObj;
    result[key] = newObj;
    return result;
  }, {});
  return changed ? result : input;
};

export default map;
