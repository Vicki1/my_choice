import axios from 'axios';
//import {SAVE_VIDEO} from './actions.js'
const SAVE_VIDEO = 'SAVE_VIDEO';
const NEW_USER = 'NEW_USER';
const LOGIN_USER = 'LOGIN_USER';



//var data=getVideos();

var initialState= {
    userLoggedIn: '',
    username: '',
    userId:'',
    collections:{}
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
    return {
        type: NEW_USER,
        payload: axios.post(`api/newUser`,{email:newEmail,username:newUsername,password:newPassword})
        .then((res)=>{
            console.log(res,"axios new User data returned")
            return res.data;
        })
        .catch(err=>console.log(err,' error from newUser action creator axios request'))
    }
   
}

export function loginUser(email,password){
    console.log (email,password,'this is what loginUser action creator takes in');
    return{
        type: LOGIN_USER,
        payload: axios.post(`api/login`,{emailTryingToLogin: email, passwordTryingToLogin: password})
        .then((res)=>{
            console.log(res.data, 'this is what loginUser axios function returned')
            return res.data;
        })
        .catch(err=>console.log(err, 'error from loginUser axios request'))
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
            return Object.assign({},state,{username: action.payload.username, userId:action.payload.id});

        case LOGIN_USER + '_FULFILLED':
            console.log('loginuser reducer ran', action);
            return Object.assign({},state,{username: action.payload.username,userId:action.payload.id});

          default:
        return state;
    }
 
}