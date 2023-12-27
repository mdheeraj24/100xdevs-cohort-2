const auth = require('../auth/token');
// Middleware for handling auth
function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers['authorization'];
  if (!token) {
    res.status(401).send('Unauthorized');
    return;
  }
  const tokens = token.split(' ');
  if (tokens.length != 2 || tokens[0] != 'Bearer') {
    res.status(401).send('Unauthorized');
    return;
  }
  const jwtToken = tokens[1];
  try {
    const user = auth.verify(jwtToken);
    if (user.type != 'ADMIN') {
      res.status(401).send('Unauthorized');
      return;
    }
    req.headers['user'] = user;
    next();
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
}

module.exports = adminMiddleware;
