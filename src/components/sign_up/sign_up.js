import React,{Component} from 'react';
import {connect} from 'react-redux';
import {newUser} from '../../redux/main_reducer.js'


class SignUp extends Component{
    constructor(props){
        super(props)
         
         this.state={
             newEmail: '',
             newUsername: '',
             newPassword: ''
             
         }
       
    }



    render(){
   
        return(
            <div className='signUpArea'>
           
                
                <h3>Sign Up</h3>
                <span className="signUpInput">email:</span><input className='newEmail' onChange={(event)=>this.setState(Object.assign({},this.state,{newEmail:event.target.value}))}></input>
                <br/>
                
                <span className="signUpInput">username:</span><input className='newPassword' onChange={(event)=>this.setState(Object.assign({},this.state,{newUsername:event.target.value}))}></input>
                <br/>
                
                <span className="signUpInput">password:</span><input className='newPassword' type='password' onChange={(event)=>this.setState(Object.assign({},this.state,{newPassword:event.target.value}))}></input>
                <br/>
                
                <button onClick={()=>this.props.newUser(this.state.newEmail,this.state.newUsername,this.state.newPassword)}>Sign Up</button>
                
                
             
            </div>

        )
    }

}

function mapStateToProps(state){
   
    return{
        state: state
    }
}

export default connect(mapStateToProps,{newUser})(SignUp);