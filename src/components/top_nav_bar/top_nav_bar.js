import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {putUserOnState} from "../../redux/main_reducer";

//import axios from "axios";

class TopNavBar extends Component{
    constructor(props){
        super(props)

            this.state={
                loggedIn : false,
                username: props.username
            }
           
    }

/*componentDidMount(){
        setTimeout(()=>{
axios.get(`/api/isUserLoggedIn`)
        .then((res)=>{
            console.log(res.data, "this info we got when checking to see  if user was already logged with axios call");
            if(res.data){
                this.setState({loggedIn:true})
                console.log('about to run action creator')
                this.props.putUserOnState(res.data.id,res.data.username)
                
            }
            else{
                this.setState({loggedIn:false})

            }
        })
        .catch((err)=>console.log(err, 'isUserAlreadyLoggedIn axios call error'))
        },100)
        
    }*/

    

render(){
    console.log(this.props)
    
    return(
        <div className="topNavBar">
            <span className="myChoice">MyChoice</span>
          
        
        </div>
    )
}

}


function mapStateToProps(state){
   
    return{
        state : state
    }
}

export default connect(mapStateToProps)(TopNavBar);
