import React from 'react';
import {render} from 'react-dom';
import {createStore} from 'redux';
import App from './App.js'
import mainReducer from './redux/main_reducer';

//grab state from global variable injected into server generated HTML
const preloadedState=window.__PRELOADED_STATE__

//allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

/*var initialState={
    savedVideos:[]
}*/


//create redux store with initial state
export default createStore(mainReducer,preloadedState);
