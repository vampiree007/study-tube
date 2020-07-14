import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import rootReducer from './root-reducer';

//this step ensures we can add our own code if we want alter                                                       

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger, promiseMiddleware))

export default store;