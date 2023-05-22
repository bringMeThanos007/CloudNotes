
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

// Route :1  Storing user DATA
router.post('/newuser', [
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  // password must be at least 5 chars long
  body('password').isLength({ min: 5 })
], async (req, res) => {

  let success  = false;
  // Validation code
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() })
  }

  // storing data in MongoDB
  try {

    // check whether email exist already
    let user = await User.findOne({ email: req.body.email })
    if (user) {
      return res.status(400).json({ success, error: "email aready exist" });
    }
    //  crypting password
    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    // console.log(req.body);
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass
    })
    // using tokens
    const data = {
      user: {
        id: user.id
      }
    }
    const jwtToken = jwt.sign(data, "hihellohihello");
    success=true;
    res.json({ success, jwtToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  
  }

})

//Route :2  Authenticate a user 
router.post('/login', [
  body('email', 'enter a valid email id').isEmail(),
  // password must be at least 5 chars long
  body('password', 'password cannot be blank').exists(),
], async (req, res) => {

  let success  = false;
  // Validation code
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ errors: errors.array() })
  }

  // verifying user
  const { email, password } = req.body;
  try {
    // check whether email exist already
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ success, error: "please try to login wit correct credentials" });
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      return res.status(400).json({ success, error: "please try to login wit correct credentials" });
    }
    // using tokens
    const data = {
      user: {
        id: user.id
      }
    }
    const nameData = {
      user:{
        name:user.name
      }
    }
    const name = nameData.user.name;
    const jwtToken = jwt.sign(data, "hihellohihello");
    success = true;
    res.json({ success, jwtToken ,name });


  } catch (error) {
    console.error(error.message);
    res.status(500).send("some error occured")
  }
})

// Route :3  egts user details
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
     userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})

module.exports = router;