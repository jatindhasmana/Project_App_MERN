const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudConfig.js');
const upload = multer({ storage });
const File = require('../models/File');
const Project = require('../models/Project');

// Upload a file
router.post('/upload/:id', upload.single('file'), async (req, res) => {
  try {
    let proj = await Project.findById(req.params.id);
    let owner = proj.owner;

    const fileUpload = new File({
      project: req.params.id,
      filePath: req.file.path,
      uploaded_by: owner,
    });

    let result = await fileUpload.save();
    res.send(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get files by project ID
router.get('/upload/:id', async (req, res) => {
  try {
    let getId = req.params.id;
    let result = await File.find({ project: getId }).populate('uploaded_by', 'name');
    res.send(result);
  } catch (e) {
    res.status(404).send(e);
  }
});

router.delete('/file/:id', async(req,res) => {
  try{
    await File.deleteOne({_id: req.params.id})
    res.status(200).send({message: "File has been deleted successfully"})
  }catch(e){
    res.status(404).send(e)
  }
})

module.exports = router;
