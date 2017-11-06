import React from 'react';
import {Switch,Route} from 'react-router-dom';
//import Login from './components/login/login.js';
import MainPage from './components/main_page/main_page';
import LoginError from './components/loginError/loginError.js'



export default(
        <Switch>
            <Route  component={MainPage} path='/'  exact/>
            <Route component={LoginError} path='/loginError'/>
        </Switch>

)