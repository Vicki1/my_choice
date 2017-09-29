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
     console.log(this.state);
        return(
            <div className='signUpArea input'>
           
                 
                <h2>Sign Up</h2>
                <span>email:</span><input className='newEmail' onChange={(event)=>this.setState(Object.assign({},this.state,{newEmail:event.target.value}))}></input>
                <br/>
                
                <span>username:</span><input className='newPassword' onChange={(event)=>this.setState(Object.assign({},this.state,{newUsername:event.target.value}))}></input>
                <br/>
                
                <span>password:</span><input className='newPassword' type='password' onChange={(event)=>this.setState(Object.assign({},this.state,{newPassword:event.target.value}))}></input>
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