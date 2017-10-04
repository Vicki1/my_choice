import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Login from './components/login/login.js';
import SignUp from './components/sign_up/sign_up.js';
import MainPage from './components/main_page/main_page';



export default(
        <Switch>
            <Route  component={Login}  path='/' exact/>
            <Route component={SignUp} path='/signUp'  />
            <Route  component={MainPage} path='/mainPage'  />
        </Switch>

)