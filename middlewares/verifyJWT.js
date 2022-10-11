const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { secret } = require("../config/index");

exports.verifyAccessToken = (req, res, next) => {
  if (!req.headers["authorization"]) {
    return next(createError.Forbidden());
  } else {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader.split(" ")[1];
    jwt.verify(accessToken, secret.accessToken, (err, decoded) => {
      if (err) {
        if (err.name === "JsonWebTokenError") {
          return next(createError.Unauthorized());
        } else {
          return next(createError.Unauthorized(err.message));
        }
      }
      req.decoded = decoded;
      next();
    });
  }
};
module.exports = verifyAccessToken;
