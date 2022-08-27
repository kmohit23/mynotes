const express = require('express');
const router=express.Router();
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


const JWT_SECRET='kmohitkumar';


// Route1: Create a User using : POST"/api/auth/createuser". No login Required

router.post('/createuser',[
    body('name','Enter Valid Name').isLength({ min: 4 }),
    body('email','Enter Valid Email').isEmail(),
    body('password','Enter Valid Password').isLength({ min: 5 })
], async (req,res)=>{

  // If there is errors , return bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check whether the user with this email exits already 
try{

let user = await User.findOne({email:req.body.email});
if(user){
  return res.status(400).json({error:"You Have Entered Email that Already Exists"});
} 

const salt = await bcrypt.genSaltSync(10);
const key= await bcrypt.hashSync(req.body.password, salt);

// Create a new user

user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: key,
  });

  const data={
    user:{
       id: user.id
    }
  }
  const authToken=jwt.sign(data,JWT_SECRET);
  success=true
  res.json({success, authToken})
} catch (error){
  console.log(error.message);
  res.status(500).send("Some error occured")
}

})
// Route2: Authenticate a User while login  using : POST"/api/auth/login". No login Required

router.post('/login',[
  body('email','Enter Valid Email').isEmail(),
  body('password','Password cannot be blank').exists()
], async (req,res)=>{
  // If there is errors , return bad request and the errors

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
    // Check whether the user with this email exits already 
   const {email,password}=req.body; 
try{
  let user = await User.findOne({email});
  if(!user){
    return res.status(400).json({error:"Inavild Credentials "});
  } 

  const passwordCompare= await bcrypt.compare(password,user.password);
  if(!passwordCompare){
    success=false
    return res.status(400).json({success ,error:"Invalid Credentials"})
  }
  const data={
    user:{
       id:user.id
    }
  }
  const authToken=jwt.sign(data,JWT_SECRET);
  success=true
  res.json({success, authToken})

 } catch (error){
    console.log(error.message);
    res.status(500).send("Some error occured")
  }

})

// Route 3: Get logged in user details using : POST "/api/auth/getuser. login required"
router.post('/getuser',fetchuser, async (req,res)=>{
  try {
    userId=req.user.id;
    const user= await User.findById(userId).select("-password")
    res.send(user)
    
  } catch (error){
    console.log(error.message);
    res.status(500).send("Some error")
  }
})


module.exports=router;

