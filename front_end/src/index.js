import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/app';
import reducers from './reducers';

import rootReducer from './reducers/index';
import { StateLoader } from "./state_loader"

import thunk from 'redux-thunk';

import { throttle } from 'lodash';

// const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const stateLoader = new StateLoader();

const store = createStore(
	rootReducer,
	stateLoader.loadState(),
	applyMiddleware(thunk, ReduxPromise)
)

store.subscribe(throttle(() => {
    stateLoader.saveState(store.getState());
}), 1000);

ReactDOM.render(
	<Provider store={store}>
	  <App />
	</Provider>
	, document.querySelector('.app-container'));

// // Take this components generated html and put in on the page (the DOM) in a certain place.
// ReactDOM.render(<App />, document.querySelector('.app-container'));
