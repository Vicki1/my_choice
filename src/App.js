import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTubeSearch from './components/youtube_search/youtube_search.js'
import SelectedCollection from './components/selected_collection/selected_collection.js';
import SignUp from './components/sign_up/sign_up';
import {connect} from 'react-redux';


class App extends Component {
  render() {
  
      
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MyChoice</h2>
        </div>
        <span>user:{this.props.username}</span>
        <SignUp/>
        <SelectedCollection/>
        <YouTubeSearch/>
      </div>
    );
  
  }
 
  }



function mapStateToProps(state){
    console.log(state);
    return{
        username: state.username
    }
}

export default connect(mapStateToProps)(App);

