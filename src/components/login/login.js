import React,{Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../redux/main_reducer.js';
import SignUp from '../sign_up/sign_up.js'

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

    handleClick(){
        this.props.loginUser(this.state.email,this.state.password)
        this.props.history.push(`/mainPage`)
    }

    render(){
   
      return(
        <div className="landingArea">
            <div className='loginArea'>
           
                 
                <h3>Login</h3>
               
                <span>email:</span><input className='newEmail' onChange={(event)=>this.setState(Object.assign({},this.state,{email:event.target.value}))}></input>
                <br/>
                
                <span>password:</span><input className='newPassword' type='password' onChange={(event)=>this.setState(Object.assign({},this.state,{password:event.target.value}))}></input>
                <br/>
                
                <button onClick={()=>this.handleClick()}>Login</button>
                {/*<Link to={this.props.history.push(`/mainPage`)}><button onClick={()=>this.props.loginUser(this.state.email,this.state.password)}>Login</button></Link>*/}
                
                
             
            </div>
            <div className="bigOr">
                <h3>OR</h3>
            </div>
            <SignUp/>
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
