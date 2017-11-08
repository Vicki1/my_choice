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
var createHistory = require('history').createBrowserHistory;
      

const app = express();




///////////////////////////
//////TOPLEVEL MIDDLEWARE///
////////////////////////////



app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: con.sessionSecret,
    saveUninitialized: true,
    resave: false
  }));

app.use(bodyParser.json());
app.use(passport.initialize())
app.use(passport.session())

///////////////////////////////
//////END TOPLEVEL MIDDLEWARE///
///////////////////////////////

//////////////////////
////AUTHENTICATION/////
///////////////////////
passport.use(new Auth0Strategy({
  domain: con.domain,
  clientID: con.clientID,
  clientSecret: con.clientSecret,
  callbackURL: con.callbackURL
}, function(accessToken, refreshToken, extraParams, profile, done) {
  const db=app.get('db')
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    //////START

  db.getExistingUser([profile.id, profile.display_name]).then(user=>{
   if(user.length){
     return done(null,user[0])
   }else{
       let auth_id=profile.id;
       let username=profile.displayName ? profile.displayName: "";
        app.get('db').createUserByAuth([profile.id,profile.displayName])
     .then(user=>{
       return done(null,user[0])
        }).catch(err=>console.log(`see Auth0Strategy catch`,err))
      }
    })
}))


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
      const db=app.get('db')
      db.findSessionUser(user.auth_id).then(user=>{
     done(null, user[0]);
  });
   
 
})

///////////////
///DATABASE////
///////////////

massive({connectionString
}).then(db=>{
    app.set('db',db) 

   
       db.createUsersTable().then(response=>{
            console.log(response,'collections table created')
            }).catch(err=>console.log(err))
        
            db.createCollectionsTable().then(response=>{
            console.log(response,'collections table created')
            }).catch(err=>console.log(err))

            
               db.createVideosTable().then(response=>{
               console.log(response,'video table  created')
               }).catch(err=>console.log(err))
                 
            
}).catch(err=>console.log(err))




//////////////////////
//ENDPOINTS ///
/////////////////////

//auth endpoints
app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0',{
  successRedirect: 'http://localhost:3000/loggedIn',
  failureRedirect: 'http://localhost:3000/loginError'
}));
app.get('/auth/logout', (req,res)=>{
  req.logout();
  res.redirect(302,'http://localhost:3000/logoutError')
})


//source endpoints
app.get('/api/user', (req,res)=>{
  console.log(req.user);
  res.status(200).send(req.user);
})

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
  .catch(err=>console.log(err, `see deleteVideo endopoint`))
})



////////////////
///LISTENING////
////////////////
const port=3001
app.listen(port,function(){
    console.log(`hi there, app listening on port ${port}`)
})



