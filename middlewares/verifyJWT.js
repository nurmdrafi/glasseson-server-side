const jwt = require("jsonwebtoken");
const { secret } = require("../config/index");

verifyJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(" ")[1];

    jwt.verify(accessToken, secret.accessToken, (err, decoded) => {
      if (err) {
        res.status(403).send({ message: "Forbidden Access" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } catch (error) {
    return res.status(401).send({ message: "UnAuthorized Access" });
  }
};
module.exports = verifyJWT;
