import { validationResult } from "express-validator";
import Course from "../models/course.model.js";

const getAllCourses = async (req, res) => {
  const query = req.query;
  const page = query.page || 1;
  const limit = query.limit;
  const skip = (page - 1) * limit;

  let courses = await Course.find().limit(limit).skip(skip);
  res.json(courses);
};

const getCourse = async (req, res) => {
  const courseId = req.params.courseId;
  let course = await Course.findById(courseId);
  res.json(course);
};

const addCourse = async (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    let newCourse = new Course({ ...req.body });
    await newCourse.save();
    res.json(newCourse);
  } else {
    res.json(result);
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const input = req.body;
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      input,
    );
    res.json(updatedCourse);
  } catch (error) {
    res.json({ errorMessage: error });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const deletedCourse = await Course.findOneAndDelete({ _id: courseId });
    res.json({ deletedCourse, msg: "deleted successfully" });
  } catch (error) {
    res.status(404).json({ Error: "Course Not Found" });
  }
};

export { getAllCourses, getCourse, addCourse, updateCourse, deleteCourse };
