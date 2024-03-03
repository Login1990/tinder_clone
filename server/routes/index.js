var express = require('express');
var router = express.Router();
var User = require("../models/User")
var bcrypt = require("bcrypt")
var dotenv = require("dotenv")
var jwt = require("jsonwebtoken")


dotenv.config()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: "main page"})
});

router.get("/hi", (req, res, next) => {
  res.json({message: "hello"})
})

router.post("/register", async (req,res,next) => {
  try{
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }
  
    const existingUser = await User.findOne({email: req.body.email})
  
    if(!existingUser){
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt);
      await new User({
        email: req.body.email,
        password: hashedPassword
      }).save()
      res.status(302).json({message:"The registration is successful!"})
    } else {
      res.status(400).json({error:"Email already exists :("})
    }
  } catch (e){
    console.error(e)
    res.status(500).json({error: "Internal server error"})
  }
})

router.post("/login", async(req,res,next)=>{
  try{
    const {email, password} = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email, and password' });
    }
    const foundUser = await User.findOne({email: req.body.email});
    if(foundUser){
      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
        if(isMatch){
          const payload = {
            email: req.body.email,
            password: foundUser.password,
            _id: foundUser._id
          }
          if(!process.env.SECRET){
            res.status(500).json({error:"Secret is not defined"})
          }
          const token = jwt.sign(payload, process.env.SECRET)
          res.status(200).json({token, message: "Successful login"})
        }
      })
    } else {
      res.status(400).json({error:"Bad credentials"})
    }
  } catch (e){
    console.error(e)
    res.status(500).json({error: "Internal server error"})
  }
})


router.get("/login/authentification", (req, res, next) => {
  const token = req.headers.authorization
  if (token && process.env.SECRET){
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if(err){
        res.status(401).json({error: "Token verification failed. :("})
      } else {
        res.json(decoded)
      }
    })
  }
})

module.exports = router;
