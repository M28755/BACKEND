var express = require('express');
var router = express.Router();
const path = require("path");
const bcrypt = require('bcryptjs')


const userDb = [] //simulating temporary database
console.log(userDb);

//get request to show signup page
router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/signup.html'))
})

router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    //checking if user already exist

    const userExist = userDb.find(user => {
      return user.username === username || user.email === email;
    })
    if (userExist) {
      return res.status(400).send("User already exist!");
    }
    //password matching
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match");
    }
    //password hashing
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //creating user object
    const user = {
      username,
      email,
      password: hashPassword,
      role: 'user'
    };
    userDb.push(user);
    res.status(201).send("User created successfully!");

    //redirecting to login page
    res.redirect('/users/login');

  } catch (err) {
    res.status(500).send("Error creating user", err);

  }
})
//get request for login page
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/login.html'))
})
//post loging request
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    //find user from the db
    const user = userDb.find(u => {
      return u.username === username;
    });
    if (!user) {
      return res.status(400).send("Invalid credintials!");
    }
    // Compare input password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credintials!");
    }

    // Successfully logged in! Let's drop a cookie.
    res.cookie('user_session', username, { httpOnly: true });
    res.send("User logged in successfully!");

  } catch (err) {
    res.status(500).send("Error login user", err)

  }
})

/* router.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
}) */

module.exports = router;
