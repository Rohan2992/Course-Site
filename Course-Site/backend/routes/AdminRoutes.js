const express = require("express");
const { Admin, Course } = require("../db");
const { authorizeJWT, generateJwt } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username } = req.body;

  const exsistingAdmin = await Admin.findOne({ username });

  if (exsistingAdmin) {
    res.status(403).send({ message: "Admin already exists" });
  } else {
    const token = generateJwt(req.body);
    const admin = new Admin(req.body);
    await admin.save();
    res
      .status(201)
      .json({ message: "Admin created successfully", token: token });
  }
});

router.get("/me", authorizeJWT, (req, res) => {
  // console.table(req.user);
  if (req.user !== undefined) {
    {
      res.json({ user: req.user.username });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = generateJwt({ username });
    res.json({ message: "Logged in successfully", token: token });
  } else {
    res.status(403).send({ message: "Admin does not exist" });
  }
});

router.post("/courses", authorizeJWT, async (req, res) => {
  const courseExists = await Course.findOne({ title: req.body.title });

  if (courseExists) {
    res.send({ message: "Course already exists and cannot be created" });
  } else {
    const course = new Course(req.body);
    await course.save();

    res.status(201).json({
      message: "Course created successfully",
      course: course
    });
  }
});

router.get("/courses/:courseId", authorizeJWT, async (req, res) => {
  const id = req.params.courseId;
  const course = await Course.findById(id);
  if (course) {
    res.status(200).send(course);
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.put("/courses/:courseId", authorizeJWT, async (req, res) => {
  const id = req.params.courseId;
  const course = await Course.findByIdAndUpdate(
    id,
    { ...req.body },
    { new: true }
  );
  // console.log(course);
  if (course) {
    res.status(200).json({ message: "Course updated successfully", course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authorizeJWT, async (req, res) => {
  const COURSES = await Course.find();
  res.status(200).json({ courses: COURSES });
});

module.exports = router;
