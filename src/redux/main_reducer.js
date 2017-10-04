import axios from 'axios';
//import {SAVE_VIDEO} from './actions.js'
const SAVE_VIDEO = 'SAVE_VIDEO';
const NEW_USER = 'NEW_USER';
const LOGIN_USER = 'LOGIN_USER';
const CREATE_COLLECTION = 'CREATE_COLLECTION';
const GET_COLLECTION ='GET_COLLECTION';
const COLLECTION_SELECTED = 'COLLECTION_SELECTED';
const USER_ALREADY_LOGGED_IN= 'USER_ALREADY_LOGGED_IN';



//var data=getVideos();

var initialState= 
{
 
    username: '',
    userId: '',
    collections: [],
    selectedVideo:'',
    selectedCollection: []

}


//ACTION CRETORS, prepare them to be dispatched to reducer, but changes will happen in server via axios before action is passed to reducer to alter redux state
export function saveVideo(id,collectionId,videoId,description){
    return {
        type: SAVE_VIDEO,
        payload: axios.post(`/api/addVideoToCollection/`,{videoId:videoId, collectionId:collectionId, description:description})
    .then((res)=>{
  
            return res.data;
})
    .catch(err=>console.log(err,' error from SaveVideo action creator axios request'))
    }
   
}

export function newUser(newEmail,newUsername,newPassword){
    return {
        type: NEW_USER,
        payload: axios.post(`/api/newUser`,{email:newEmail,username:newUsername,password:newPassword})
        .then((res)=>{
           
            return res.data;
        })
        .catch(err=>console.log(err,' error from newUser action creator axios request'))
    }
   
}

export function loginUser(email,password){
    console.log (email,password,'this is what loginUser action creator takes in');
    return{
        type: LOGIN_USER,
        payload: axios.post(`/api/login`,{emailTryingToLogin: email, passwordTryingToLogin: password})
        .then((res)=>{
  
            return res.data;
        })
        .catch(err=>console.log(err, 'error from loginUser axios request'))
    }
}


export function getCollections(userId){
    return {
        type: GET_COLLECTION,
        payload: axios.post(`/api/getCollections/`,{id:userId})
        .then((res)=>{
  
            return res.data
        })
        .catch(err=>console.log(err, 'error from getCollections axios request'))
    }
}



export function createCollection(userId, collectionName){
//console.log(collectionName, userId, 'this is what createCollection action creator takes in');
return{
    type: CREATE_COLLECTION,
    payload: axios.post(`/api/newCollection`,{userId:userId, newCollection:collectionName})
    .then((res)=>{
  
        return res.data
    })
    .catch(err=>console.log(err, 'error from createCollection axios request'))
}
}

export function selectCollection(collectionId){
    console.log(collectionId, ' this is collectionId selectCollection action creator takes in')
    return {
        type: COLLECTION_SELECTED,
        action: axios.get(`/api/selectCollection/${collectionId}`)
        .then((res)=>{
            console.log(res.data, 'this is what selecCollection axios call returned')
            return res.data
        })
        .catch(err=>console.log(err,' error from selectCollection axios request'))
    }
}

export function putUserOnState(id,username){
    console.log('put user Action: ',id,username)
return{
    type:USER_ALREADY_LOGGED_IN,
    payload: {
        userId: id,
        username: username
    }
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
            return console.log('savedVideo reducer case took in ', action.payload);
            
         case NEW_USER + '_FULFILLED' :
            
            return Object.assign({},state,{username: action.payload.username, userId:action.payload.id});

        case LOGIN_USER + '_FULFILLED':
            
            return Object.assign({},state,{username: action.payload.username,userId:action.payload.id});

        case USER_ALREADY_LOGGED_IN :
            console.log(action.payload, 'give to cookie whatever reducer')
            return Object.assign({},state,{username: action.payload.username, userId:action.payload.userId})

        case GET_COLLECTION + '_FULFILLED':
            
            return Object.assign({},state,{collections: action.payload});
            

        case CREATE_COLLECTION + '_FULFILLED':
            
            var newCollectionsArray = [...state.collections, action.payload];
            return Object.assign({},state,{collections : newCollectionsArray});

        case COLLECTION_SELECTED + '_FULFILLED':
        console.log('collectionSelected reducer ran', action.payload);
        return (Object.assign({},this.state,{selectedCollection: action.payload}));
   

          default:
        return state;
    }
 
}