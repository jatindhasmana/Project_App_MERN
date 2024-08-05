const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Add a new project
router.post('/add', async (req, res) => {
  try {
    const task = new Project(req.body);
    let result = await task.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all projects
router.get('/view', async (req, res) => {
  try {
    let result = await Project.find({});
    res.send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Get a single project by ID
router.get('/view/:id', async (req, res) => {
  try {
    let result = await Project.findById(req.params.id);
    res.send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.get("/search/:key", async(req,res) => {
    let result = await Project.find({
      "$or": [
        {name:{$regex:req.params.key}},
      ]
    })
    res.send(result)
  })

module.exports = router;
