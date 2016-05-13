import assign from './assign';

const isObject = obj => typeof obj === 'object' && obj !== null;

const mergeDeep = (input = {}, changes) => {
  let result = input;

  Object.keys(changes).forEach(key => {
    const child = changes[key];
    const newChild = isObject(child)
      ? mergeDeep(input[key], child) : child;

    if (result[key] !== newChild) {
      if (result === input) {
        result = assign(input, {
          [key]: newChild
        });
      } else {
        result[key] = newChild;
      }
    }
  });

  return result;
};

export default mergeDeep;
