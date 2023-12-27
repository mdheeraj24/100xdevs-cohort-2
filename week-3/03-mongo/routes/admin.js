const { Router } = require('express');
const adminMiddleware = require('../middleware/admin');
const router = Router();
const db = require('../db/index');
// Admin Routes
router.post('/signup', async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  try {
    const admin = await db.Admin.findOne({ username: username });
    if (admin) {
      res.status(404).send('Admin already exists');
    }
    await db.Admin.create({ username: username, password: password });
    res.status(200).json({ message: 'Admin created successfully' });
  } catch (err) {
    console.log(`Error signing up admin ${err}`);
    res.status(500).send('Server Error');
  }
});

router.post('/courses', adminMiddleware, async (req, res) => {
  // Implement course creation logic
  try {
    const admin = req.headers['admin'];
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    const createdCourse = await db.Course.create({
      title: title,
      description: description,
      price: price,
      imageLink: imageLink,
      published: true,
    });
    admin.courses.push(createdCourse._id);
    await admin.save();
    res.status(200).json({
      id: createdCourse.id,
      title: createdCourse.title,
      description: createdCourse.description,
      price: createdCourse.price,
      imageLink: createdCourse.imageLink,
      published: createdCourse.published,
    });
  } catch (err) {
    console.log(`Error creating course by admin ${err}`);
    res.status(500).send('Server Error');
  }
});

router.get('/courses', adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  try {
    const admin = req.headers['admin'];
    const adminCourses = await db.Course.find({ _id: { $in: admin.courses.map(course => course._id) } }).exec();
    res.status(200).json(adminCourses.map(course => {
      return {
        id: course._id,
        title: course.title,
        description: course.description,
        imageLink: course.imageLink,
        price: course.price,
        published: course.published
      };
    }));
  } catch (err) {
    console.log(`Error fetching courses created by admin ${err}`);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
