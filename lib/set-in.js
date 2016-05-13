import assign from './assign';

const setIn = (input = {}, [key, ...rest], value) => {
  if (key !== undefined) {
    const oldChild = input[key];
    const newChild = setIn(oldChild, rest, value);
    return newChild === oldChild
      ? input : assign(input, {[key]: newChild});
  }

  return value;
};

export default setIn;
