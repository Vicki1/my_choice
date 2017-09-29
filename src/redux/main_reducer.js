import axios from 'axios';
//import {SAVE_VIDEO} from './actions.js'
const SAVE_VIDEO = 'SAVE_VIDEO';
const NEW_USER = 'NEW_USER';




//var data=getVideos();

var initialState= {
    username: '',
   // savedVideos : data
}

//ACTION CRETORS, prepare them to be dispatched to reducer, but changes will happen in server via axios before action is passed to reducer to alter redux state
export function saveVideo(id,collection,videoId,description){
    return {
        type: SAVE_VIDEO,
        payload: axios.post(`/api/addVideoToCollection/${id}/${collection}/${videoId}/${description}`)
    .then((res)=>res.data)
    .catch(err=>console.log(err,' error from SaveVideo action creator axios request'))
    }
   
}

export function newUser(newEmail,newUsername,newPassword){
    console.log(newEmail,newUsername,newPassword, ' this is what newUser gets')
    console.log(NEW_USER)
    return {
        type: NEW_USER,
        payload: axios.post(`api/newUser`,{email:newEmail,username:newUsername,password:newPassword})
        .then((res)=>{
            console.log(res, " this is what i get back in the axios promise")
            return res.data;
        })
        .catch(err=>console.log(err,' error from newUser action creator axios request'))
    }
   
}



/*var initialState={
    savedVideos : [
        {collection:'',vidoeId:'',description:''},
        {ollection:'',vidoeId:'',description:''},
        {ollection:'',vidoeId:'',description:''}]
}*/




//create redux store with initial state


export default function mainReducer(state=initialState,action){
   
    switch(action.type){
        case SAVE_VIDEO +  '_FULFILLED' :
            
             var newObject= action.payload
            var newCollection=[...state.savedVideos,newObject];
            
            return Object.assign({},state,{savedVideos:newCollection});

        case NEW_USER + '_FULFILLED' :
            console.log('new user reducer ran',action)
            return Object.assign({},state,{username: action.payload.username})


          default:
        return state;
    }
 
}