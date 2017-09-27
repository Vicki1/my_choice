import {createStore} from 'redux';
import mainReducer from './redux/main_reducer';


var initialState={
    weights:['hey weights is connected'],
    exercise:[],
    puppies:[],
}


export default createStore(mainReducer,initialState);