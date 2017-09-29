const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con =require('./src/config');//allos us to get file with our URI from sql database
const herokuURI= con.herokuURI;
const connectionString = herokuURI;
const path=require('path');
const massive=require('massive');
const session=require('express-session');
//import React from 'react';
//import App from './src/App.js';



//brewbase advice
//const config=require'./src/config';
//question?????
//const ensureLoggedIn=require('connect-ensure-login').ensureLogginIn();
//const router=express.Router();



var app = express();



app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(session({secret: 'hi',
                saveUninitialized: false}));
app.use(cors());

//MASSIVE DB SETUP
//question???? db names in require and here
massive({connectionString
}).then(db=>{
    app.set('db',db) //app is big object express creates for us, we set new variable called db on theat object and give it the info that massive sends back to us once its connected
//^ this allows us to to db.function whatever
 
    db.createUsersTable().then(response=>{
        console.log(response,'users table created');
    }).catch(err=>console.log(err))

        
            db.createCollectionsTable().then(response=>{
            console.log(response,'collections table created');
            }).catch(err=>console.log(err))

            
               db.createVideosTable().then(response=>{
               console.log(response,'video table  created')
               }).catch(err=>console.log(err))
                 
            
})

    



// //Endpoints for MyChoice
app.get("/test", (req,res)=>{
console.log('this is working')
res.status(200).send('it worked')
})
// app.post(`api/newUser/:newEmail/:newUsername/:newPassword`, (req,res)=>{
app.post(`/api/newUser`, (req,res)=>{
    //console.log(req.params.newEmail,req.params.username,req.params.newPassword)
    let db = req.app.get('db')
 
    db.addNewUser([req.body.email,req.body.username,req.body.password])
    .then(results=>{
        console.log('new user created')
        res.status(200).send(results[0])})
    .catch(err=>console.log(err,' could not add new user see server endpoint'))
})

app.get('/api/getVideosByUser/:id', (req,res)=>{
    db.getVideosByUser(req.params.id)
    .then(results=>{res.status(200).send(results)})
    .catch(err=>console.log(err,' could not get user videos see server endpoint'))
})

app.post('/api/addVideoToCollection/:id/:collection/:videoId/:description',(req,res)=>{
    db.addVideoToCollection([req.params.id,req.params.collection,req.params.videoId,req.params.description])
    .then(results=>{res.status(200).send({
                    collection : req.params.collection,
                    videoId: req.params.videoId,
                    description: req.params.description
                          });
                        })
    .catch(err=>console.log(err,' could not post to user videos see server endpoint'))
})
app.get('/isbworking', (req,res,next)=>{
    db.create_collection().then(results=>{
        res.status(200).send(res)
    })
})




var port=3001
app.listen(port,function(){
    console.log(`app listening on port ${port}`);
})

