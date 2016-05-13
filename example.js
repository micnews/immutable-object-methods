import {getIn, setIn, mergeDeep, assign} from 'immutable-object-methods';

const input = {a: {b: 'c'}};
const updated = setIn(input, ['a', 'd'], 'e');

console.log(input);
console.log(updated);

const merged = mergeDeep(
  {foo: 'bar'},
  {beep: {boop: 4711}, foo: 'bas'}
);
console.log(merged);

// immutable assign
const assigned = assign({foo: 'bar'}, {foz: 'baz'});
console.log(assigned);

const value = getIn({a: {b: 'c'}}, ['a', 'b']);
// will print out 'c'
console.log(value);

const noneExists = getIn({}, ['a', 'b']);
// don't throw if value doesn't exists, just return undefined
console.log(noneExists === undefined);
