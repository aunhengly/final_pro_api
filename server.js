const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors  = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const { response } = require('express');
const { user } = require('pg/lib/defaults');
const res = require('express/lib/response');

const db = knex ({
   client: 'pg',
   connection: {
     host : '127.0.0.1',
     user : 'henglyaun',
     password : '',
     database : 'smart-brain'
   }
 });

const app = express();
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res)=>{
   res.send('Hello, from App.get');
})

app.post('/signin', (req, res) => { signin.handleSignin(db, bcrypt)(req, res) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3001, ()=> {
   console.log('The App is running at port 3001');
})

/*
   / --> res = this is working
   /signin --> POST = success/fail
   /register --> POST = new user obj
   /profile/: userId --> GET = return user 
   /image --> PUT -->   user

*/