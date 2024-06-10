const express= require('express')
const { body, validationResult }= require ("express-validator");
const router = express.Router();
const User=require('../models/User')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser= require('../middleware/fetchuser')

const JWT_SECRET="Naviisaniceb0y";


//Router 01:create a new user using: POST(/api/auth/create-user) no login required
router.post(
  "/create-user",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
//if any errors are there while giving inputs will be identified here
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    salt= await bcrypt.genSalt(10);
    const saltPass= await bcrypt.hash(req.body.password,salt);

    //creating user and storing it in database
    try {
    let user= await User.findOne({email:req.body.email})
    if(user)
    {
      res.status(400).json({status:"failed"});
    }
    else{
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: saltPass,
      });

      const data={
        user:{
          id:user.id
        }
      }
      const token = jwt.sign(data, JWT_SECRET);
      res.send({status:true,token:token});
    }
    } catch (error) {
      console.error(error=error.message)
      res.status(500).send("Internal Server Error")
    }
    //.then((user) => res.json(user))
    // .catch(err=>{console.log(err)
    // res.json(
    //   ((error = "please neter the unique values for emails and passwords"),
    //   (message = err.errmsg))
    // );})
    
  }
);


//Router 02:user login with user credentials using: POST(/api/auth/login):no login required
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").exists()
  ],
//if any errors are there while giving inputs will be identified here
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      let user= await User.findOne({email})
      if(!user)
      {
        res.status(400).json({status:false,error:"Please login with in valid credentials"})
      }
      else{

      let status=false;
      const passwordCompare= await bcrypt.compare(password, user.password)
      if(!passwordCompare)
      {
        res
          .status(400)
          .json({status:false, error: "Please login with in valid credentials" });
      }
      else{
       const data = {
         user: {
           id: user.id,
         },
       };
       const token = jwt.sign(data, JWT_SECRET);
       status=true
       res.json({status:status,"authtoken":token});
      }
    }
    } catch (error) {
      console.error((error = error.message));
      res.status(500).send("Internal Server Error");
    }
  }
  
)

router.post(
  "/getUser", fetchUser,
//if any errors are there while giving inputs will be identified here
  async (req, res) => {
    try {
      const userId= req.user.id
      const user= await User.findById(userId).select("-password");
      res.send(user)
    } catch (error) {
      console.error((error = error.message));
      res.status(500).send("Internal Server Error");
    }
  })

module.exports= router