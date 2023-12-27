const db = require('../db');
// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  let username = req.headers.username;
  let password = req.headers.password;
  try {
    let admin = await db.Admin.findOne({ username: username });
    if (admin && admin.password === password) {
      req.headers['admin'] = admin;
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } catch (err) {
    console.log(`Error finding admin ${err}`);
    res.status(401).send('Unauthorized');
  }
}

module.exports = adminMiddleware;
