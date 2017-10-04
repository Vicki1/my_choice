import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/main_reducer.js';

class Login extends Component{
    constructor(props){
        super(props)
         
         this.state={
             email : '',
             password: '',
             emailValid: false,
             passwordValid: false,
             
         }
       
    }



    render(){
   
        return(
            <div className='loginArea'>
           
                 
                <h2>Login</h2>
               
                <span>email:</span><input className='newEmail' onChange={(event)=>this.setState(Object.assign({},this.state,{email:event.target.value}))}></input>
                <br/>
                
                <span>password:</span><input className='newPassword' type='password' onChange={(event)=>this.setState(Object.assign({},this.state,{password:event.target.value}))}></input>
                <br/>
                
                <button onClick={()=>this.props.loginUser(this.state.email,this.state.password)}>Login</button>
                
                
             
            </div>

        )
    }

}

function mapStateToProps(state){
   
    return{
        valid: state.userLoggedIn
    }
}

export default connect(mapStateToProps,{loginUser})(Login);
