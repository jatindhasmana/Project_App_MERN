const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const File = require('../models/File')

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

//Get My Projects
router.get('/userProjects/:id', async(req,res) => {
  try{
    let result = await Project.find({owner : req.params.id}).populate('owner', 'name')
  res.send(result)
  }catch(e){
    res.status(401).send(e)
  }
})

// Get all projects
router.get('/view', async (req, res) => {
  try {
    let result = await Project.find().populate('owner', 'name');
    res.send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});

// Get a single project by ID
router.get('/view/:id', async (req, res) => {
  try {
    let result = await Project.findById(req.params.id).populate('owner', 'name');
    res.send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});


router.get('/search/:key', async (req, res) => {
  try {
    const key = req.params.key;
    const projects = await Project.find({
      "$or": [
        { name: { $regex: key, $options: 'i' } } // Case-insensitive search
      ]
    })
    .populate('owner', 'name')

    res.send(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search projects' });
  }
});

router.put('/project/:id', async(req,res) => {
  try{
     await Project.updateOne(
      {_id: req.params.id},
      {$set: req.body}
    )
    res.status(200).send({message:'Project has been updated successfully'})
  }catch(e){
    res.status(404).send(e)
  }
})

router.delete('/delete/:id' , async (req,res) => {
  try{
    await Project.findByIdAndDelete(req.params.id)
    await File.deleteMany({project:req.params.id})

    res.status(200).send({message: 'Project and associated files has been deleted successfully'})
  }catch(e){
    res.status(404).send(e)
  }
})


module.exports = router;
