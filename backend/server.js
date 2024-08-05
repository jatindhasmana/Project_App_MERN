require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = 8000;

const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();
const dbUrl = process.env.ATLASDB_URL

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

app.use(cors());
app.use(express.json());

app.use(projectRoutes);
app.use(userRoutes);
app.use(uploadRoutes);

app.listen(port, () => {
  console.log(`Server is listening to port: ${port}`);
});
