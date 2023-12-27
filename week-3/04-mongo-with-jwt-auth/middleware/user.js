const auth = require('../auth/token');
function userMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const token = req.headers['authorization'];
  if (!token) {
    console.log('Token not provided in Authorization header');
    res.status(401).send('Unauthorized');
    return;
  }
  const tokens = token.split(' ');
  if (tokens.length != 2 || tokens[0] !== 'Bearer') {
    console.log('Token format not correct' + tokens);
    res.status(401).send('Unauthorized');
    return;
  }
  const jwtToken = tokens[1];
  try {
    const user = auth.verify(jwtToken);
    if (user.type != 'USER') {
      console.log('User type passwed is wrong');
      res.status(401).send('Unauthorized');
      return;
    }
    req.headers['user'] = user;
    next();
  } catch (err) {
    console.log(`Error verifying token, ${err}`);
    res.status(401).send('Unauthorized');
  }
}

module.exports = userMiddleware;
