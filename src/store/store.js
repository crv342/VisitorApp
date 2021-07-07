import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';

import authReducer from './reducers/auth';
import hostReducer from './reducers/host';
import visitorReducer from './reducers/visitor';

const rootReducer = combineReducers({
  auth: authReducer,
  host: hostReducer,
  visitor: visitorReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
