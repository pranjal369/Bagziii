/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,
    // cart will contains the ID's of products..
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
        }
    ],

    orders: {
        type: Array,
        default: []
    },

    contact: Number,
    picture: String
});

module.exports = mongoose.model("user", userSchema);