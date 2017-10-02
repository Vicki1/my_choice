import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTubeSearch from './components/youtube_search/youtube_search.js'
import SelectedCollection from './components/selected_collection/selected_collection.js';
import  Login from './components/login/login.js';
import SignUp from './components/sign_up/sign_up';
import {connect} from 'react-redux';


class App extends Component {
  render() {
  console.log(this.props.username)
  console.log('current state ', this.props.state)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MyChoice</h2>
        </div>
        <span>user:{this.props.username}</span>
        <SignUp/>
        <Login/>
        <SelectedCollection/>
        <YouTubeSearch/>
      </div>
    );
  
  }
 
  }



function mapStateToProps(state){
    console.log(state);
    return{
        username: state.username,
        state: state
    }
}

export default connect(mapStateToProps)(App);

