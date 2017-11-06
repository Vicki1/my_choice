import React,{Component} from 'react';
//import {connect} from 'react-redux';
//import {loginUser,loginWithAuth0} from '../../redux/main_reducer.js';
//import SignUp from '../sign_up/sign_up.js'

export default class LoginError extends Component{
    
    render(){
   
      return(
        <div className="loginErrorArea">
             There appears to have been issues logging in
         </div>
        )
    }

}

