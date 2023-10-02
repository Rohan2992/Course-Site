const express = require("express");
const { User, Course } = require("../db");
const { authorizeJWT, generateJwt } = require("../middlewares/auth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(403).json({ mesage: "User already exists" });
  } else {
    const token = generateJwt(req.body);
    const newUser = new User({ ...req.body, subscribedCourses: [] });
    await newUser.save();
    res.status(201).json({ mesage: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = generateJwt(req.body);
    res.send({ message: "Logged in successfully", token });
  } else {
    res.status(401).json({ message: "User does not exist" });
  }
});

router.get("/courses", authorizeJWT, async (req, res) => {
  const courses = await Course.find({ published: true });
  //   console.log(req.user);
  res.json(courses);
});

router.post("/courses/:courseId", authorizeJWT, async (req, res) => {
  // const course = await Course.findById(req.params.courseId);
  // console.log(course);
  // if (course) {
  //   const user = await User.findOne({ username: req.user.username });
  //   if (user) {
  //     user.purchasedCourses.push(course);
  //     await user.save();
  //     res.json({ message: "Course purchased successfully" });
  //   } else {
  //     res.status(403).json({ message: "User not found" });
  //   }
  // } else {
  //   res.status(404).json({ message: "Course not found" });
  // }

  const id = req.params.courseId;
  const course = await Course.findById(req.params.courseId);
  // console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    let flag = false;
    // console.log(user.purchasedCourses);

    // Do something with the referencedDocument
    for (const refId of user.purchasedCourses) {
      if (refId.equals(id)) {
        flag = true;
      }
    }
    if (user && !flag) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res
        .status(403)
        .json({ message: "Either User not found or Course already exists" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authorizeJWT, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
