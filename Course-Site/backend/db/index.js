/* eslint-disable no-undef */
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({ username: String, password: String });

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  published: Boolean
});

const Admin = mongoose.model("Admin", AdminSchema);
const User = mongoose.model("User", UserSchema);
const Course = mongoose.model("Course", CourseSchema);

module.exports = {Admin, User, Course};