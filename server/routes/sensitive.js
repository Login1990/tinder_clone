// Import necessary modules
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const UserLike = require("../models/UserLike")
const Match = require("../models/Match")
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

async function checkForMatches(req, res){
  const likedLikesLiker = await UserLike.findOne({liker: req.body.user, liked: res.locals.user_data.email})
  if(likedLikesLiker){
    try{
      await new Match({
        user1: req.body.user,
        user2: res.locals.user_data.email
      }).save()
    } catch (e){
      console.error(e)
      res.status(500).json({error: "Internal server error"})
    }
  }
}

function moveObjects(sourceArray, destinationObject, key) {
  sourceArray.forEach(obj => {
    const keyValue = obj[key];
    if (!destinationObject[keyValue]) {
      destinationObject[keyValue] = [];
    }
    destinationObject[keyValue].push(obj);
  });
}

router.get("/users/random", authorize, async (req, res, next)=>{
    const foundRandomUser = await User.aggregate([{ $match: { _id: { $ne: new mongoose.Types.ObjectId(res.locals.user_data._id)} } }, { $sample: { size: 1 } }]);
    if(foundRandomUser){
        res.json({email: foundRandomUser[0].email})
    } else {
        res.json({email: "example@example.com"})
    }
})

router.post("/users/likes", authorize, async (req,res,next)=>{
  try{
    const pairExists = await UserLike.findOne({liker: res.locals.user_data.email, liked: req.body.user})
    if (!pairExists){
      //We already know that liker matched the liked, so we just need to check if liked matches with liker, then it is a match!
      await new UserLike({
        liker: res.locals.user_data.email,
        liked: req.body.user
      }).save()
      checkForMatches(req,res)
      res.status(302).json({message:"The pair is saved!"})
    } else {
      res.status(400).json({error:"The pair already exists"})
    }

  } catch (e) {
    console.error(e)
    res.status(500).json({error: "Internal server error"})
  }
})

router.get("/users/matches", authorize, async (req, res, next)=>{
  try{
    const findAllMatches = await Match.find({
      $or: [
        { user1: res.locals.user_data.email },
        { user2: res.locals.user_data.email }
    ]})
    res.json(findAllMatches)
  } catch(e){
    console.error(e)
    res.status(500).json({error: "Internal server error"})
  }
})



module.exports = router