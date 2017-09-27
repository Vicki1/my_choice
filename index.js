const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const con =require('./src/config');//allos us to get file with our URI from sql database
const herokuURI= con.herokuURI;
const path=require('path');
const massive=require('massive');
const connectionString = herokuURI;
const session=require('express-session');


var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

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

