// Import necessary modules
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../models/User")

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
    const foundRandomUser = await User.aggregate([{ $sample: { size: 1 } }]);
    console.log(foundRandomUser)
    console.log(res.locals.user_data)
    res.json({message: "Fuck you"})
})


module.exports = router