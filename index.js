const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con =require('./src/config');//allos us to get file with our URI from sql database
const herokuURI= con.herokuURI;
const connectionString = herokuURI;
const path=require('path');
const massive=require('massive');
const session=require('express-session');


var app = express();



app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(session({secret: 'hi',
                saveUninitialized: false}))
app.use(cors());

//MASSIVE DB SETUP
//question???? db names in require and here
massive({connectionString
}).then(db=>{
    app.set('db',db) //app is big object express creates for us, we set new variable called db on theat object and give it the info that massive sends back to us once its connected
//^ this allows us to to db.function whatever
 
    db.createUsersTable().then(response=>{
        console.log(response,'users table created')
    }).catch(err=>console.log(err))

        
            db.createCollectionsTable().then(response=>{
            console.log(response,'collections table created')
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
        console.log('new user created',results[0])
        res.status(200).send(results[0])})
    .catch(err=>console.log(err,' could not add new user see server endpoint'))
})

app.post(`/api/login`, (req,res)=>{
    let db= req.app.get('db')
  console.log(req.body)
    db.checkLoginInfo([req.body.emailTryingToLogin,req.body.passwordTryingToLogin])
    .then(results=>{
        console.log('login results',results[0])
        res.status(200).send(results[0])
    
})
 .catch(err=>{console.log(err, 'see login server endpoint')})
})

app.post(`/api/getCollections`, (req,res)=>{
    let db= req.app.get('db')

    db.getCollections(req.body.id)
    .then(results=>{
        console.log('getCollection server results',results)
        res.status(200).send(results)
    
})
 .catch(err=>{console.log(err, 'see login server endpoint')})
})



app.post(`/api/newCollection`, (req,res)=>{
     let db= req.app.get('db')
     console.log(req.body, 'this is what createCollection endpoint takes in')
     db.createCollection([req.body.userId,req.body.newCollection])
     .then(results=>{
         console.log('new collection resulst', results[0])
         res.status(200).send(results[0])
    })
    .catch(err=>{console.log(err, 'see newCollection server endpoint')})
})



var port=3001
app.listen(port,function(){
    console.log(`app listening on port ${port}`)
})

