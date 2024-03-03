// Import necessary modules
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const mongoose = require("mongoose")

// Middleware function for authorization
const authorize = (req, res, next) => {
    const token = req.headers.authorization
    if (token && process.env.SECRET){
      jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if(err){
          res.status(403).json({error: "Token verification failed. :("})
        } else {
          res.locals.user_data = decoded
          next()
        }
      })
    }
};

router.get("/users/random", authorize, async (req, res, next)=>{
    const foundRandomUser = await User.aggregate([{ $match: { _id: { $ne: new mongoose.Types.ObjectId(res.locals.user_data._id)} } }, { $sample: { size: 1 } }]);
    if(foundRandomUser){
        res.json({email: foundRandomUser[0].email})
    } else {
        res.json({email: "example@example.com"})
    }
})

router.post("/users/likes", authorize, (req,res,next)=>{
    res.json({message: "hello"}) //dummy text, replace
})



module.exports = router