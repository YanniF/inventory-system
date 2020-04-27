import { combineReducers } from 'redux';

import auth from './auth';
import inventory from './inventory';

const rootReducer = combineReducers({ auth, inventory });

export default rootReducer;
