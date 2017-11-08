import React from 'react';
import {Switch,Route} from 'react-router-dom';
//import Login from './components/login/login.js';
import LandingPage from './components/main_page/main_page';
import LoggedOutLandingPage from './components/loggedOutLandingPage/loggedOutLandingPage';
import LoginError from './components/loginError/loginError.js';
import LoggedIn from './components/loggedIn/loggedIn.js';
import LogoutError from './components/logoutError/logoutError';



export default(
        <Switch>
            <Route  component={LandingPage} path='/'  exact/>
            <Route component={LoginError} path='/loginError'/>
             <Route component={LoggedIn} path='/loggedIn'/>
             <Route component={LogoutError} path='/logoutError'/>
             <Route component={LoggedOutLandingPage} path='/loggedOut'/>
             
        </Switch>

)