import axios from 'axios';
//import {SAVE_VIDEO} from './actions.js'
const SAVE_VIDEO = 'SAVE_VIDEO';
//const NEW_USER = 'NEW_USER';
const LOGIN_USER = 'LOGIN_USER';
const CREATE_COLLECTION = 'CREATE_COLLECTION';
const GET_COLLECTION ='GET_COLLECTION';
const COLLECTION_SELECTED = 'COLLECTION_SELECTED';
const USER_ALREADY_LOGGED_IN= 'USER_ALREADY_LOGGED_IN';
//const DELETE_COLLECTION= 'DELETE_COLLECTION';



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

/*export function newUser(newEmail,newUsername,newPassword){
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
}*/

export function getAuth0User(){
    console.log("loginwithAuth0 fired")
    return{
        type: LOGIN_USER,
        payload: axios.get(`/api/login`)
        .then((res)=> {
            console.log(res.data)
            return res.data
        })
        .catch((err)=>console.log(err, 'error from loginWithAuth0 in main_reducer.js'))
    
    }
        
}


export function getCollections(userId){
    return {
        type: GET_COLLECTION,
        payload: axios.post(`/api/getCollections/`,{userId})
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

export function deleteCollection(collectionId,userId ){
return{
    type:  GET_COLLECTION,
    payload: axios.delete(`/api/deleteCollection/${userId}/${collectionId}`,)
    .then ((res)=>{
        console.log(res.data)
        return res.data
    })
      .catch(err=>console.log(err, 'error from deleteCollection axios request'))
}
}

export function selectCollection(collectionId){
    console.log(collectionId, ' this is collectionId selectCollection action creator takes in')
    return {
        type: COLLECTION_SELECTED,
        payload: axios.get(`/api/selectCollection/${collectionId}`)
        .then((res)=>{
            console.log(res.data, 'this is what selectCollection axios call returned')
            return res.data
        })
        .catch(err=>console.log(err,' error from selectCollection axios request'))
    }
}

/*export function putUserOnState(id,username){
    console.log('put user Action: ',id,username)
return{
    type:USER_ALREADY_LOGGED_IN,
    payload: {
        userId: id,
        username: username
    }
}
}*/

//DELETE VIDEO WITHIN DB, THEN GET NEW COLLECTION WITHOUT DELETED VIDEO AND SET IT TO SELECTED COLLECTION IN REDUX
export function deleteVideo(id, collectionId){
   return{
       type: COLLECTION_SELECTED,
       payload: axios.delete(`/api/deleteVideo/${id}/${collectionId}`)
        .then((res)=>{
            console.log(res.data, 'this is what selectCollection axios call returned')
            return res.data
        })
        .catch(err=>console.log(err,' error from selectCollection axios request'))
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
        
        case COLLECTION_SELECTED + '_FULFILLED':
            return Object.assign({},state,{selectedCollection:action.payload})
        
        case SAVE_VIDEO +  '_FULFILLED' :
            return Object.assign({},state);
            
         
        case LOGIN_USER + '_FULFILLED':
            console.log(action.payload, `this is what LOGIN_USER reducer fn takes in`);
            return Object.assign({},state,{userId:action.payload.id,username: action.payload.display_name});

        case USER_ALREADY_LOGGED_IN :
            console.log(action.payload, 'give to cookie whatever reducer')
            return Object.assign({},state,{username: action.payload.username, userId:action.payload.userId})

        case GET_COLLECTION + '_FULFILLED':
            
            return Object.assign({},state,{collections: action.payload});
            

        case CREATE_COLLECTION + '_FULFILLED':
            
            var newCollectionsArray = [...state.collections, action.payload];
            return Object.assign({},state,{collections : newCollectionsArray});

        
   

          default:
        return state;
    }
 
}