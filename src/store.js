import mainReducer from './redux/main_reducer';
import promiseMiddleware from 'redux-promise-middleware';
import {createStore,applyMiddleware} from 'redux';


export default createStore(mainReducer,applyMiddleware(promiseMiddleware()));


