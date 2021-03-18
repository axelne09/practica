const express = require('express');
//const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();


//Import Routes
const cuentosRoute = require('./routes/cuentos');
const usersRoute = require('./routes/users');


//Use Routes
app.use('/api/cuentos', cuentosRoute);
app.use('/api/users', usersRoute);


app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



module.exports = app;
