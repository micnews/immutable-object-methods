import test from 'ava';
import 'babel-core/register';
import {setIn} from './lib';

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
