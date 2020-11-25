const router = require("express").Router();
const Course = require("../database/models/course");

// cloudinary config :


//get all courses

router.get("/", async (req, res) => {
  await Course.find({}, (err, data) => {
    return res.json(data);
  });
});


router.post("/getCourses", async (req, res) => {
  console.log(req.body);



  const courses = await Course.find({ teacher: req.body.teacherId })
    .populate("teacher")
    .exec();
  console.log(courses);
  return res.json(courses);
});







// router.get("/getBySection/:section", async (req, res) => {
//   const sections = req.params.section;
//   if(sections){
//     const courses = await Course.find({ sections })
//     res.json(courses)
//   }else{
//     return res.status(401).json({});
//   }

// });

// console.log(req.params);
// const courses = await Course.find({ category: req.body.teacherId })
//   .populate("teacher")
//   .exec();
// console.log(courses);
// res.json(courses);





// add new couses in the database
router.post("/addCourse", async (req, res) => {
  const {
    teacher,
    title,
    description,
    videoUrl,
    imgUrl,
    price,
    numberOfViews,
    sections,
  } = req.body;

  const newCourse = new Course({
    teacher,
    title,
    description,
    videoUrl,
    imgUrl,
    price,
    numberOfViews,
    sections,
  });

  const newCourseAdded = await newCourse.save();
  console.log("cours", newCourseAdded);

  res.send(newCourseAdded);
});



module.exports = router
