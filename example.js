import {setIn} from 'immutable-object-methods';

const input = {a: {b: 'c'}};
const updated = setIn(input, ['a', 'd'], e);

console.log(input);
console.log(updated);
