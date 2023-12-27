const db = require('../db');
async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  let username = req.headers.username;
  let password = req.headers.password;
  try {
    let user = await db.User.findOne({ username: username });
    if (user && user.password === password) {
      req.headers['user'] = user;
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.log(`Error finding user ${err}`);
    res.status(401).send('Unauthorized');
  }
}
module.exports = userMiddleware;
