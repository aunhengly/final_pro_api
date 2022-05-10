const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors  = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED =0

// const { response } = require('express');
// const { user } = require('pg/lib/defaults');
// const res = require('express/lib/response');

const db = knex ({
   client: 'pg',
   connection: {
     host : 'postgresql-round-21063',
     user : 'henglyaun',
     password : '',
     database : 'smart-brain'
   }
 });

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res)=>{res. send('Hello, from App.get') })
app.post('/signin', (req, res) => { signin.handleSignin(db, bcrypt)(req, res) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3001, ()=> {
   console.log(`The App is running on port ${process.env.PORT}`);
})

/*
   / --> res = this is working
   /signin --> POST = success/fail
   /register --> POST = new user obj
   /profile/: userId --> GET = return user 
   /image --> PUT -->   user

*/