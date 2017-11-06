const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con =require('./src/config');//allows us to get file with our URI from sql database
const herokuURI= con.herokuURI;
const connectionString = herokuURI;
const path=require('path');
const massive=require('massive');
const session=require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
var createHistory = require('history').createBrowserHistory


const app = express();

app.use(bodyParser.json());

app.use(session({secret: con.sessionSecret}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
  domain: con.domain,
  clientID: con.clientID,
  clientSecret: con.clientSecret,
  callbackURL: con.callbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    //////START



   app.get('db').getExistingUser([profile.id, profile.display_name])
 .then(results=>{
   if(results[0]){
     app.get('db').createUserByAuth([profile.id,profile.displayName])
     .then(results=>{
       console.log('created new Auth User with', results)
       //res.status(200).send(results[0])
        })
     .catch(err=>console.log(`error see Auth0.createUserByAuth function`,err))
   }else{
     console.log(`sending existing user info`,results)
     //res.status(200).send(results[0])
   }
 })
 .catch(err=>console.log(err=>console.log(`error check Auth0.getExistingUser db call`,err)))
    ///////END*/

 return done(null, profile);
  
}));

app.get('/auth', passport.authenticate('auth0'));

//this may or may not be right, try diff /api/login function



app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000',
  failureRedirect: 'http://localhost:3000/loginError'
}))

passport.serializeUser(function(user, done) {

  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get('/me', (req, res, next) => {
  if (!req.user) {
    return res.status(404).send('User not found');
  } else {
    return res.status(200).send(req.user);
  }
})


/*app.use(session({secret: con.sessionSecret,
                resave: false,
                saveUninitialized:true,
               }));*/



app.use(express.static(path.join(__dirname,'public')));

app.use(cors());


massive({connectionString
}).then(db=>{
    app.set('db',db) 
 
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

//////////////////
// Auth0 stuff ///
//////////////////

app.use(session({secret: ''}))
app.use(passport.initialize())

/////////////////////////
/// End of Auth0 stuff///
/////////////////////////







app.get("/test", (req,res)=>{
console.log('this is working ',req.session)
res.status(200).send('it worked')
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
         console.log('new collection results', results[0])
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


app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const port=3001
app.listen(port,function(){
    console.log(`hi there, app listening on port ${port}`)
})
