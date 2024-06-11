import express from 'express';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';

dotenv.config();
const PORT = process.env.PORT || 3001;

import handleRegister from './controllers/register.js';
import handleSignIn from './controllers/signin.js';
import handleImage from './controllers/image.js';
import GetBountires from './controllers/clarifai.js';

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.URLDB,
        host: process.env.HostDB,
        port: process.env.PORTDB,
        user: process.env.UsernameDB,
        password: process.env.PasswordDB,
        database: process.env.NameDB,
        ssl: { rejectUnauthorized: false }
    },
});


const app = express();

app.use(cors());
app.use(express.json());





app.get('/', (req, res) => {
    res.json('success');
});


app.post('/signin', handleSignIn(db, bcrypt));


app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) });




app.put('/image', (req, res) => { handleImage(req, res, db) });

app.post('/Clarifai', (req, res) => { GetBountires(req, res) });


app.listen(PORT, err => {
    if (err)
        throw err;
    console.log(`app is running on port ${PORT}`);
});

