import _assign from './assign';
import _mergeDeep from './merge-deep';
import _setIn from './set-in';
import _getIn from './get-in';
import _set from './set';
import _without from './without';
import _map from './map';
import setupChain from './chain';

export const assign = _assign;
export const mergeDeep = _mergeDeep;
export const setIn = _setIn;
export const getIn = _getIn;
export const set = _set;
export const without = _without;
export const map = _map;
export const chain = setupChain({
  assign, mergeDeep, setIn, getIn, set, without, map
});

export default {
  assign,
  getIn,
  setIn,
  mergeDeep,
  set,
  without,
  map,
  chain
};
