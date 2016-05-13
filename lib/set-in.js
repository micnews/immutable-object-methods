import assign from './assign';

const setIn = (input = {}, [key, ...rest], value) => {
  const oldChild = input[key];
  const newChild = rest.length ? setIn(oldChild, rest, value) : value;
  return newChild === oldChild
    ? input : assign(input, {[key]: newChild});
};

export default setIn;
