export default unchainedMethods => {
  const {map} = unchainedMethods;

  const chain = input => {
    const methods = map(
      unchainedMethods,
      fn => (...args) => chain(fn(input, ...args)
    ));

    methods.value = input;

    return methods;
  };

  return input => chain(input);
};
