// https://github.com/diegohaz/arc/wiki/Reducers
import camelCase from 'lodash.camelcase';

import { combineReducers } from 'redux';

const reducers = {};

const req = require.context('.', true, /\.\/.+\/reducer\.js$/);

req.keys().forEach((key) => {
  const storeName = camelCase(key.replace(/\.\/(.+)\/.+$/, '$1'));
  reducers[storeName] = req(key).default;
});

export default combineReducers(reducers);
