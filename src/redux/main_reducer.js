
import {SAVE_VIDEO} from './actions.js'

export default function mainReducer(state,action){
    switch(action.type){
        case SAVE_VIDEO :
            return console.log('reducer received',action.payload.collection,action.payload.videoId);

          default:
        console.log('no videos added')
        return state;
    }
 
}