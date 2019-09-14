
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { install } from 'redux-loop';
import { createLogger } from 'redux-logger';

import reducer from './rootReducer';

const currentEnv = process.env.NODE_ENV;
const logger = createLogger({});

const middlewares = currentEnv === 'development' ?
    /* A place to put middleware that only goes on dev or prod but not
        both. Any middleware that goes in both can be added to enhancements
        below.
        */
    [logger] :   // Add dev only middlewares to this array
    [];          // Add prod only middlewares (if any here)

const enhancements = compose(install(), applyMiddleware(...middlewares));

const store = createStore(reducer, {}, enhancements);

export default ({ element }) => (
  <Provider store={store}>{element}</Provider>
);