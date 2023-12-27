const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const mongodbURL = process.env.MONGODB_URL;
// Connect to MongoDB
mongoose.connect(mongodbURL);

// Define schemas
const AdminSchema = new Schema({
  // Schema definition here
  id: ObjectId,
  username: { type: String, index: true },
  password: String,
  courses: [ObjectId],
});

const UserSchema = new Schema({
  // Schema definition here
  id: ObjectId,
  username: { type: String, index: true },
  password: String,
  courses: [ObjectId],
});

const CourseSchema = new Schema({
  // Schema definition here
  id: ObjectId,
  title: String,
  description: String,
  imageLink: String,
  price: String,
  published: Boolean,
});

const Admin = mongoose.model('Admin', AdminSchema);
const User = mongoose.model('User', UserSchema);
const Course = mongoose.model('Course', CourseSchema);

module.exports = {
  Admin,
  User,
  Course
}
