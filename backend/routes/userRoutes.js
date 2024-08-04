const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login a user
router.post('/login', async (req, res) => {
  try {
    let data = req.body;
    if (data.password && data.email) {
      let user = await User.findOne(req.body).select('-password');
      res.send(user ? user : { result: 'NO Data found' });
    } else {
      res.send({ result: 'Sorry Try again' });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get user by ID
router.get('/user/:id', async (req, res) => {
  try {
    let result = await User.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(401).send({ message: e });
  }
});

module.exports = router;
