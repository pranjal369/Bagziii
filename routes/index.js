/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require('express');
const app = express();
const router=express.Router();
const isLoggedIn=require('../middlewares/isLoggedIn');
const productModel = require('../models/product-model');
const userModel = require('../models/user-model');

router.get("/",(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
});

router.get("/shop",isLoggedIn,async(req,res)=>{
    let products= await productModel.find();
    let success=req.flash("success");
    res.render("shop",{products,success});
});

router.get("/cart",isLoggedIn,async(req,res)=>{
    // let product= await productModel.find();
    let user=await userModel
   .findOne({email:req.user.email})
   .populate("cart");
//    console.log(user);
   const bill= (Number(user.cart[0].price+20))-Number(user.cart[0].discount);
    res.render("cart",{user,bill});
});
router.get("/addtocart/:productid",isLoggedIn,async(req,res)=>{
   let user=await userModel.findOne({email:req.user.email});
   user.cart.push(req.params.productid);
   await user.save();
//    console.log(user);
   
   req.flash("success","Added to Cart"); 
   res.redirect("/shop");
});

module.exports=router;