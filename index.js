const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con =require('./src/config');//allows us to get file with our URI from sql database
const herokuURI= con.herokuURI;
const connectionString = herokuURI;
const path=require('path');
const massive=require('massive');
const session=require('express-session');

var createHistory = require('history').createBrowserHistory


var app = express();



app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());

app.use(session({secret: 'thislasjdf;lajdf;ajsd;',
                
                cookie: {   name: "myCookie",
                            maxAge: 2628000000 },
                saveUninitialized:true,
               
        
    }));

                
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
/*
//STARTED TO TRY THE HISTORY STUFF
  const history= createHistory();

//get current location
  const location = history.location  

//Listen from changes to the current location.
const unlisten=history.listen((location,action)=>{
    //location is an object like window.location
    console.log(action,location.pathname, location.state)
})
//use push, replace,and go to navigate around.
history.push('/home',{some: 'state'})
// to stop listening, call the function return from listen();

unlisten();
 //END OF TRYING THE HISTORY STUFF;
 */

// //Endpoints for MyChoice



app.get("/test", (req,res)=>{
console.log('this is working ',req.session)
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

//CHECK THE USER'S COOKIE
app.get(`/api/isUserLoggedIn`,function(req,res){
    let db= req.app.get('db')
    console.log(req.session)
    if(req.session.myChoiceUserId){
        db.loginWithCookie(req.session.myChoiceUserId)
            .then((results)=>{
                console.log(results)
                return res.status(200).send(results[0])

            })
            .catch((err)=>{
                console.log(err, 'error from /api/isUserLoggedIn cookie')
                return res.status(401).send(err, "database error, cookie endpoint")
            })
    } else{
        return res.status(200).send(false)
    }
})


app.post(`/api/login`, (req,res)=>{
    let db= req.app.get('db')
  
  console.log(req.session)
    db.checkLoginInfo([req.body.emailTryingToLogin,req.body.passwordTryingToLogin])
    .then(results=>{
        console.log('login results',results[0])
        req.session.myChoiceUserId=results[0].id
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

app.delete(`/api/deleteCollection/:id/:collectionId`, (req,res)=>{
    let db=req.app.get('db')
         console.log(req.params, 'this is what deleteCollection endpoint takes in')
         db.deleteCollection([req.params.collectionId])
         .then(db.getCollections(req.params.id)
                .then(results=>{
                console.log('getCollection server results from deleteCollectiojn endpoint',results)
                res.status(200).send(results)
    
            })
                .catch(err=>console.log(err, 'see deleteCollection endpoint, and its callback for getCollections'))
            )
        
        .catch(err=>{console.log(err, 'see deleteCollection server endpoint')})
})


app.post(`/api/addVideoToCollection/`, (req,res)=>{
     let db= req.app.get('db')
     console.log(req.body, 'this is what addVideo endpoint takes in')
     db.addVideoToCollection([req.body.videoId,req.body.collectionId,req.body.description])
     .then(results=>{
         console.log('new video added to collection ', results[0])
         res.status(200).send(results[0])
     })
     .catch(err=>console.log(err,' see addVideoToCollection endpoint'))
})


app.get('/api/selectCollection/:collectionId', (req,res)=>{
    let db= req.app.get('db')
    console.log(req.params.collectionId, 'this is what selectedCollection endpoint is taking in')
    db.selectCollection(req.params.collectionId)
    .then(results=>{
        console.log('this is data returned to selectCollection endpoint', results)
        res.status(200).send(results)
    })
    .catch(err=>console.log(err, ' see selectCollection server endpoint'))

})

app.delete(`/api/deleteVideo/:id/:collectionId`, (req,res)=>{
  let db= req.app.get('db')
    console.log(req.params)
  db.deleteVideo([req.params.id])
  .then(()=>{
            console.log('db.deleteVideo ran',req.params.collectionId)
        db.selectCollection([req.params.collectionId])
        .then((results)=>{
            console.log('new array after video delete',results)
                res.status(200).send(results)

        })
        
        
        .catch(err=>console.log(err, 'see deleteVideo endpoint'))
  

  }
  )
  .catch((err)=>console.log(err, `see deleteVideo endopoint`))
})

var port=3001
app.listen(port,function(){
    console.log(`app listening on port ${port}`)
})

