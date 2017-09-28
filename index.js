const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con =require('./src/config');//allos us to get file with our URI from sql database
const herokuURI= con.herokuURI;
const path=require('path');
const massive=require('massive');
const connectionString = herokuURI;
const session=require('express-session');
import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import mainReducer from './src/redux/main_reducer.js';
import App from './src/App.js';
import qs from 'qs';
import {renderToString} from 'react-dom/server';

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/static', express.static('static'))
app.use(express.static(path.join(__dirname,'public')));
app.use(handleRender)
app.use(session({
    secret: 'devmtn coder',
    resave: false,
    saveUninitialized: true
}))

massive(connectionString).then(db=>{
    app.set('db',db);

    db.create_users_table().then(res=>{
        res.status(200).send(res)
    }).catch(err=>console.log(err))

    db.create_video_table().then(res=>{
        res.status(200).send(res)
    }).catch(err=>console.log(err))
})

function handleRender(req,res){
    //create new Redux store instance
    const store=createStore(mainReducer)

    //render the component to a string
    const html=renderToString(
        <Provider store={store}>
            <App/>
        </Provider>
    )

    //get initial state from our Redux store
    const preloadedState = store.getState()

    //send the rendered page back to the client***
    res.send(renderFullPage(html,preloadedState))
};
function renderFullPage(html,preloadedState){
    return
    <!doctype html>
    <html>
        <head>
            <title>MyChoice</title>
        </head>
        <body>
            <div id="root">${html}</div>
            <script>
                  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
            </script>
           
            <script src="/static/bundle.js"></script>
        </body>
    </html>
       


};
//security issues with script? see docs, XXS attack?

app.get('/isbworking', function (req,res,next){
    req.app.get('db').create_collection().then(res=>{
        res.status(200).send(res)
    })
})

app.post('/')


var port=3000
app.listen(port,function(){
    console.log(`app listening on port ${port}`);
})

