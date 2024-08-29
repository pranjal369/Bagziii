/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");

// so we have set our environment variable to be saved in the memory, we didn't even made any .env file to store any connection variable..
// so this really good for the purpose of security...
// console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === "development") {

    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        // console.log(owners);
        // if another person is trying to nr owner then we say No permission
        if (owners.length > 0) {
            return res.status(502).send("You dont have permission to create new owner");;
        }
         
        // if no owner then create one...
       let {fullname,email,password}=req.body;

        let createdOwner= await ownerModel.create({
            fullname,
            email,
            password
        });
        res.status(201).send(createdOwner);
        // console.log(createdOwner);
        

    });


}


router.get("/admin", (req, res) => {
   let success= req.flash("success");
    res.render("createproducts",{success});
})


module.exports = router;