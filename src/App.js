import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTubeSearch from './components/youtube_search/youtube_search.js'
import SelectedCollection from './components/selected_collection/selected_collection.js';
import  Login from './components/login/login.js';
import SignUp from './components/sign_up/sign_up';
import Collections from './components/collections/collections.js';
import {connect} from 'react-redux';


class App extends Component {
  render() {

  console.log('current state ', this.props.state)
    return (
      <div className="App">
       
          <SignUp/>
          <Login/>
          <div className="userIsLoggedIn">
            <div className="topPart">
              <span className="user">user:{this.props.username}</span>
              <Collections/>
            </div>
              <SelectedCollection/>
              <YouTubeSearch/>
         </div>
      </div>
    );
  
  }
 
  }



function mapStateToProps(state){
  
    return{
        username: state.username,
        state: state,
        collections: state.collections
    }
}

export default connect(mapStateToProps)(App);

