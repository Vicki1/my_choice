import React, {Component} from 'react';
import Collections from '../collections/collections';
import SelectedCollection from '../selected_collection/selected_collection';
import YouTubeSearch from '../youtube_search/youtube_search';
import {getAuth0User} from '../../redux/main_reducer';
import {connect} from 'react-redux';

class MainPage extends Component{
    constructor(props){
        super(props)

            this.state={
                    loggedIn: false,
                    showLoginSignUpButton: false
            }
    }


componentDidMount(){
alert("You have successfully been logged out")
}

    render(){
        return(
            <div className="mainPageDiv">
                <a href="http://localhost:3001/auth"><button>Login</button></a>
                <Collections/>
                <SelectedCollection/>
                <h2>Search YouTube Videos</h2>
                <YouTubeSearch/>
            </div>
        )
    }
}



/*<Collections/>
            </div>
              <SelectedCollection/>
              <YouTubeSearch/>*/
function mapStateToProps(state){
   
    return{
        state: state
    }
}

export default connect(mapStateToProps,{getAuth0User})(MainPage);

