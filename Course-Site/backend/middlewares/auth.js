const jwt = require("jsonwebtoken");

const secretKey = "MY_SECRET_KEY";

function generateJwt(user) {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIn: "2h" });
}

function authorizeJWT(req, res, next) {
  // console.log(req.headers.authorization);
  if (req.headers.authorization !== undefined) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];

      jwt.verify(token, secretKey, (err, data) => {
        if (err) {
          res.status(403).send({ message: "Authorization failed" });
        }
        req.user = data;
        next();
      });
    } else {
      res.status(401).send({ message: "Authorization failed" });
    }
  }
}

module.exports = { secretKey, authorizeJWT, generateJwt };
