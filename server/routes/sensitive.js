// Import necessary modules
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const UserLike = require("../models/UserLike")
const Match = require("../models/Match")
const mongoose = require("mongoose")

// Middleware function for authorization
//If auth_key is correct - proceed, no - error
//uses res.locals to authentificate requester 
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
  //Since we are triggering this function when user approves the profile, we already know that requestee is approving - we just need to check if the other party is also
  const likedLikesLiker = await UserLike.findOne({liker: req.body.user, liked: res.locals.user_data.email})
  if(likedLikesLiker){
    try{
      await new Match({
        user1: req.body.user,
        user2: res.locals.user_data.email
      }).save()
      //Create a match, it is used for chat
    } catch (e){
      console.error(e)
      res.status(500).json({error: "Internal server error"})
    }
  }
}

router.get("/users/random", authorize, async (req, res, next)=>{
    //Get a random registered user that is not the requestee
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
      //Check if our like has caused a match
      checkForMatches(req,res)
      res.status(302).json({message:"The pair is saved!"})
    } else {
      //One-sided pair is already created - no need to do anything
      res.status(400).json({error:"The pair already exists"})
    }
  } catch (e) {
    console.error(e)
    res.status(500).json({error: "Internal server error"})
  }
})

router.get("/users/matches", authorize, async (req, res, next)=>{
  try{
    //Matches could be reached by any of the parties, so we are fine wheter they are user1 or user2 - either is fine
    const findAllMatches = await Match.find({
      $or: [
        { user1: res.locals.user_data.email },
        { user2: res.locals.user_data.email }
    ]})
    let arrayOfNames = []
    //Extract emails that are not yours, uses res.locals
    findAllMatches.forEach(obj => {
      if (obj.user1 && obj.user1 !== res.locals.user_data.email) {
          // Do something with obj.user1
          arrayOfNames.push(obj.user1)
      }
      else if (obj.user2 && obj.user2 !== res.locals.user_data.email) {
          // Do something with obj.user2
          arrayOfNames.push(obj.user2)
      }
  });
    res.json({arrayOfNames})
  } catch(e){
    console.error(e)
    res.status(500).json({error: "Internal server error"})
  }
})



module.exports = router