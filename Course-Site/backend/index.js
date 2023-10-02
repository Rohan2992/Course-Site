//jshint esversion:8
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3000;
const url = "mongodb://127.0.0.1:27017/";
const dbName = "CourseSellingDB";

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose
  .connect(url + dbName)
  .then(() => {
    console.log("Connection established successfully");
  })
  .catch(err => console.error(err));
app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

//functions
function cbListener(port) {
  console.log("Listening on " + port);
}

// listener
app.listen(port, cbListener(port));
