/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const mongoose = require('mongoose');
const config=require('config')
const dbgr=require("debug")("development:mongoose");


mongoose
    .connect(`${config.get("MONGODB_URI")}`)
    .then(function () {
        console.log("Connected Successfully...");
    })
    .catch(function (err) {
        console.log(err);
    })

module.exports = mongoose.connection;