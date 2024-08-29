/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// const express = require("express");
// const router = express.Router();
const userModel = require('../models/user-model');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateToken');


module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
            req.flash("Error","Account already exists,please Login..");
            return res.redirect("/");
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) {
                    return res.send(err.message);
                }
                else {

                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });
                    // res.send(token);
                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.redirect("/shop");
                    // res.send("User Created successfully");
                }
            })
        })


        // res.send(user);

    }
    catch (err) {
        res.send(err.message);

    }
};
module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (!user) {
        req.flash("Error","Email or Password incorrect...");
        return res.redirect("/");
    }

    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);
            return res.redirect("/shop");
        }
        else {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/");
        }
    });
};


module.exports.logout = function (req, res) {
    res.cookie("token", "");
    res.redirect("/");
  };