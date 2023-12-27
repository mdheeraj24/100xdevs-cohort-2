const { Router } = require('express');
const db = require('../db/index');
const router = Router();
const userMiddleware = require('../middleware/user');

// User Routes
router.post('/signup', async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await db.User.findOne({ username: username });
    if (user) {
      res.status(404).send('User already exists');
    }
    await db.User.create({ username: username, password: password });
    res.status(200).json({ message: 'User created successfully' });
  } catch (err) {
    console.log(`Error signing up user ${err}`);
    res.status(500).send('Server Error');
  }
});

router.get('/courses', async (req, res) => {
  // Implement listing all courses logic
  try {
    const courses = await db.Course.find({});
    res.status(200).json({
      courses: courses.map(course => {
        return {
          title: course.title,
          description: course.description,
          price: course.price,
          published: course.published,
          imageLink: course.imageLink,
          id: course._id
        }
      }),
    });
  } catch (err) {
    console.log(`Error getting all courses ${err}`);
    res.status(500).send('Server Error');
  }
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  try {
    const user = req.headers['user'];
    const course = await db.Course.find({ _id: courseId });
    if (!course) {
      res.status(404).send({
        message: 'Course not found'
      });
    }
    if (user.courses.filter(c => c == courseId).length == 0) {
      user.courses.push(courseId);
      await user.save();
    }
    res.status(200).json({
      message: 'Course purchased successfully'
    });
  } catch (err) {
    console.log(`Error Purchasing Course: ${courseId} ${err}`);
    res.status(500).send('Server Error');
  }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
  // Implement fetching purchased courses logic
  const user = req.headers['user'];
  try {
    const courses = await db.Course.find({ _id: { $in: user.courses } }).exec();
    res.status(200).json({
      purchasedCourses: courses.map(course => {
        return {
          title: course.title,
          id: course._id,
          description: course.description,
          imageLink: course.imageLink,
          published: course.published
        };
      })
    });
  } catch (err) {
    console.log(`Error purchsing course ${err}`);
    res.status(500).send('Server Error')
  }
});

module.exports = router
