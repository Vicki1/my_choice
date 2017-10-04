import React, { Component } from 'react';
import './App.css';
import TopNavBar from "./components/top_nav_bar/top_nav_bar"

import {connect} from 'react-redux';

import router from './router';


class App extends Component {
  render() {

  console.log('current state ', this.props.state)
    return (
      <div id="App_mainContainer">
          <TopNavBar/>
          <div id="App_routerContainer">
              {router}
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

