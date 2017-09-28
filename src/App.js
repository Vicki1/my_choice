import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTubeSearch from './components/youtube_search/youtube_search.js'
import {connect} from 'react-redux';


class App extends Component {
  render() {
  
      
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>MyChoice</h2>
        </div>
        <YouTubeSearch/>
      </div>
    );
  
  }
 
  }



function mapStateToProps(state){
    console.log(state);
    return{
        state:state
    }
}

export default connect(mapStateToProps)(App);

