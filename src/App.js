import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import YouTubeSearch from './components/youtube_search/youtube_search.js'

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





export default App;
