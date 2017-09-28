
import {SAVE_VIDEO} from './actions.js'


export default function mainReducer(state,action){
   
    switch(action.type){
        case SAVE_VIDEO :
            
             var newObject={ collection: action.payload.collection,
                                videoId: action.payload.videoId,
                                description:'MyNote:'
                            }
            var newCollection=[...state.savedVideos,newObject];
            
            return Object.assign({},state,{savedVideos:newCollection});


          default:
        return state;
    }
 
}