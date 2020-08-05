const register = require('./controllers/register')
const profile = require('./controllers/profile')
const signin = require('./controllers/signin')
const image = require('./controllers/image')

const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex= require('knex');
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'nupura',
      password : 'nupura123',
      database : 'smart-brain'
    }
});
console.log(db.select('*').from('users'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> { res.send(db.users) })

app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db)})
app.put('/image', (req, res)=> { image.handleImage (req, res, db) })
app.post('/imageurl', (req, res)=> { image.handleApiCall (req, res) })

app.listen(3000, ()=>{
    console.log('app is running on port 3000');
})

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT -->user

*/