import test from 'ava';
import 'babel-core/register';
import {assign, getIn, mergeDeep, setIn, set, without, map,
  default as objectMethods} from './lib';

test('default export', t => {
  t.is(objectMethods.assign, assign);
  t.is(objectMethods.getIn, getIn);
  t.is(objectMethods.mergeDeep, mergeDeep);
  t.is(objectMethods.setIn, setIn);
  t.is(objectMethods.set, set);
  t.is(objectMethods.without, without);
  t.is(objectMethods.map, map);
});

test('set', t => {
  const input = Object.freeze({a: 'b'});
  const actual = set(input, 'foo', 'bar');
  const expected = {
    a: 'b',
    foo: 'bar'
  };
  t.deepEqual(actual, expected);
});

test('set with unchanged data', t => {
  const input = Object.freeze({foo: 'bar'});
  const actual = set(input, 'foo', 'bar');
  const expected = input;
  t.is(actual, expected);
});

test('set with array', t => {
  const input = Object.freeze([0, 1]);
  const actual = set(input, 0, -1);
  const expected = [-1, 1];

  t.deepEqual(actual, expected);
  t.true(Array.isArray(actual));
});

test('setIn', t => {
  const input = Object.freeze({});
  const actual = setIn(input, Object.freeze(['a', 'b', 'c']), 'foo');
  const expected = {
    a: {
      b: {
        c: 'foo'
      }
    }
  };
  t.deepEqual(actual, expected);
});

test('setIn with unchanged array', t => {
  const input = Object.freeze({
    a: 'b',
    c: [1, 2, 3]
  });
  const actual = setIn(input, Object.freeze(['a']), 'yo');
  const expected = {
    a: 'yo',
    c: [1, 2, 3]
  };
  t.deepEqual(actual, expected);
  t.is(actual.c, input.c);
});

test('setIn with unchanged value', t => {
  const input = Object.freeze({
    a: {
      b: 'c'
    }
  });
  const actual = setIn(input, Object.freeze(['a', 'b']), 'c');
  const expected = input;
  t.is(actual, expected);
});

test('setIn with nested changed value', t => {
  const input = Object.freeze({
    a: {
      b: 'c'
    }
  });
  const actual = setIn(input, Object.freeze(['a', 'b']), 'd');
  const expected = {
    a: {
      b: 'd'
    }
  };
  t.deepEqual(actual, expected);
});

test('setIn with null value, unchanged', t => {
  const input = Object.freeze({
    a: {
      b: 0
    }
  });
  const actual = setIn(input, Object.freeze(['a', 'b']), 0);
  const expected = input;
  t.is(actual, expected);
});

test('assign', t => {
  const actual = assign(Object.freeze({}));
  const expected = {};
  t.deepEqual(actual, expected);
  t.not(actual, expected);
});

test('assign multiple', t => {
  const actual = assign(Object.freeze({a: 'b'}), Object.freeze({c: 'd'}));
  const expected = {a: 'b', c: 'd'};
  t.deepEqual(actual, expected);
});

test('assign w array', t => {
  const input = [0];
  const actual = assign(input, [1, 2, 3]);
  const expected = [1, 2, 3];
  t.deepEqual(actual, expected);
  t.true(Array.isArray(actual));
});

test('mergeDeep', t => {
  const input = Object.freeze({});
  const changes = Object.freeze({
    a: {
      b: {
        c: 'foo'
      }
    },
    d: 'bar'
  });
  const actual = mergeDeep(input, changes);
  const expected = changes;
  t.deepEqual(actual, expected);
});

test('mergeDeep with unchanged array', t => {
  const input = Object.freeze({
    a: 'b',
    c: [1, 2, 3]
  });
  const changes = Object.freeze({a: 'yo'});
  const actual = mergeDeep(input, changes);
  const expected = {
    a: 'yo',
    c: [1, 2, 3]
  };
  t.deepEqual(actual, expected);
  t.is(actual.c, input.c);
});

test('mergeDeep with unchanged value', t => {
  const input = Object.freeze({
    a: {
      b: 'c'
    },
    beep: 'boop'
  });
  const changes = Object.freeze({
    a: {
      b: 'c'
    }
  });
  const actual = mergeDeep(input, changes);
  const expected = input;
  t.is(actual, expected);
});

test('mergeDeep with unchanged values', t => {
  const input = Object.freeze({
    a: {
      b: 'c'
    },
    beep: 'boop',
    foo: 'bar'
  });
  const changes = Object.freeze({
    a: {
      b: 'c'
    },
    beep: 'boop'
  });
  const actual = mergeDeep(input, changes);
  const expected = input;
  t.is(actual, expected);
});

test('mergeDeep with nested changed value', t => {
  const input = Object.freeze({
    a: {
      b: 'c'
    },
    foo: 'bar'
  });
  const changes = Object.freeze({
    a: {
      b: 'd'
    }
  });
  const actual = mergeDeep(input, changes);
  const expected = {
    a: {
      b: 'd'
    },
    foo: 'bar'
  };
  t.deepEqual(actual, expected);
});

test('mergeDeep with null value, unchanged', t => {
  const input = Object.freeze({
    a: {
      b: 0
    },
    c: false
  });
  const changes = Object.freeze({
    a: {
      b: 0
    }
  });
  const actual = mergeDeep(input, changes);
  const expected = input;
  t.is(actual, expected);
});

test('getIn() with none object', t => {
  const input = null;
  const actual = getIn(input, ['a']);
  t.is(actual, undefined);
});

test('getIn() with simple object & exists', t => {
  const input = {
    a: {b: 'c'}
  };
  const actual = getIn(input, ['a', 'b']);
  const expected = 'c';
  t.is(actual, expected);
});

test('getIn() with simple object & does not exists', t => {
  const input = {
    a: {b: 'c'}
  };
  const actual = getIn(input, ['foo', 'bar']);
  t.is(actual, undefined);
});

test('without()', t => {
  const input = Object.freeze({
    a: 'b',
    c: 'd'
  });
  const actual = without(input, 'c');
  const expected = {
    a: 'b'
  };
  t.deepEqual(actual, expected);
});

test('without() that does not change data', t => {
  const input = Object.freeze({
    a: 'b',
    c: 'd'
  });
  const actual = without(input, 'not exists');
  const expected = input;
  t.deepEqual(actual, expected);
});

test('without() with falsy value', t => {
  const input = Object.freeze({
    foo: null
  });
  const actual = without(input, 'foo');
  const expected = {};
  t.deepEqual(actual, expected);
});

test('map', t => {
  const input = {a: 1, b: 2, c: 3, d: 4};
  const actual = map(input, num => num % 2);
  const expected = {a: 1, b: 0, c: 1, d: 0};
  t.deepEqual(actual, expected);
});

test('map not changed values', t => {
  const input = {a: 1, b: 2, c: 3};
  const actual = map(input, num => num);
  const expected = input;
  t.is(actual, expected);
});

test('map w key', t => {
  const input = {a: '', b: ''};
  const actual = map(input, (val, key) => key);
  const expected = {a: 'a', b: 'b'};
  t.deepEqual(actual, expected);
});
