const express = require('express');
const zod = require('zod');
const app = express();

function authMiddleWare(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;
  if (username != 'dheeraj' || password != 'pass') {
    console.log("Invalid user");
    res.status(403).json({
      msg: "User does not exist"
    });
  } else {
    console.log('User Authentication success');
    next();
  }
}

const schema = zod.array(zod.number());
app.use(express.json());
app.use(authMiddleWare);
app.post("/healthcheck", function(req, res) {
  const kidneys = req.body.kidneys;
  const validate = schema.safeParse(kidneys);
  if (!validate.success) {
    res.status(400).json({
      msg: "Invalid input"
    })
    return;
  }
  console.log("Health check");
  res.status(200).json({
    msg: `Healthcheck passed for kidnes: ${kidneys}`
  });
  return;
});

app.listen(3000);

