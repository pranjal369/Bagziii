/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const db=require("./config/mongoose-connection")
// const userModel = require('./models/user');
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const postModel = require('./models/post');
const path = require('path');
const ownersRoute=require('./routes/ownersRoute');
const usersRoute=require('./routes/usersRoute');
const productsRoute=require('./routes/productsRoute');
const indexRoute = require("./routes/index");

const expressSession=require("express-session");
const flash=require("connect-flash");
// now .env files can be accessible in app.js
require("dotenv").config();

// const upload = require('./config/multerconfig');
const { log } = require('console');


app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

// middleware for flash messages...
app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);

// for flash messsages...
app.use(flash());

// console.log(process.env.EXPRESS_SESSION_SECRET);


// routes
app.use("/",indexRoute);
app.use("/owners",ownersRoute);
app.use("/users",usersRoute);
app.use("/products",productsRoute);



app.listen(3000);