require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8000;

const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProjectPage');
}

app.use(cors());
app.use(express.json());

app.use(projectRoutes);
app.use(userRoutes);
app.use(uploadRoutes);

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
