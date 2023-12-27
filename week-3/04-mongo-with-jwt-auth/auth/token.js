const jwt = require('jsonwebtoken');

const jwtPass = 'JWT Password, keep it simple';
const sign = function(userId, userType) {
  return jwt.sign({
    id: userId,
    type: userType,
  }, jwtPass, {
    expiresIn: '1h'
  })
}

const verify = function(token) {
  try {
    return jwt.verify(token, jwtPass);
  } catch (err) {
    console.log(`Token verification failed ${err}`)
    throw new Error('Invalid Token');
  }
}
module.exports = {
  sign,
  verify,
}
