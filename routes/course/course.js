const express = require("express");
const courseModel = require("../../models/CourseModel/CourseModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/createCourse", upload.single("image"), (req, res) => {
  console.log(req.file, req.body);
  const saveCourse = new courseModel({
    name: req.body.name,
    image: req.file.path,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
  });
  saveCourse
    .save()
    .then(() => {
      res.status(201).json({
        message: "course is created successfully",
      });
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
});

router.get("/courseList", async (req, res) => {
  const courseList = await courseModel.find();
  res.status(200).json({
    succes: true,
    courses: courseList,
  });
});

router.put("/course/:id", upload.single("image"),async (req, res) => {
  const { id } = req.params;
  const updateCourse = await courseModel.findByIdAndUpdate(
    id,
    { 
      image:req.file.path,
      name:req.body.name,
      description:req.body.description,
      author:req.body.author,
      price:req.body.price,

      
    },
    { new: true }
  );
  if (!updateCourse) {
    return res
      .status(404)
      .json({ message: "No Course with the given ID was found." });
  } else {
    res.status(200).json(updateCourse);
  }
});

router.delete("/course/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCourse = await courseModel.findByIdAndDelete(id);
  if (!deleteCourse) {
    return res
      .status(404)
      .json({ message: "No Course with the given ID was found." });
  } else {
    res.status(200).json({
      message: "course is deleted successfully",
      deleteCourse,
    });
  }
});

module.exports = router;
