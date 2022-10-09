const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const { secret } = require("../config/index");

exports.signAccessToken = (currentUser) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      role: currentUser.role,
    };
    const accessToken = secret.accessToken;
    const options = {
      expiresIn: "20m",
      issuer: "glassesOn - Eyeglasses Online Store & Blog",
      audience: currentUser.email,
    };
    JWT.sign(payload, accessToken, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
};

exports.signRefreshToken = (currentUser) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      role: currentUser.role,
    };
    const refreshToken = secret.refreshToken;
    const options = {
      expiresIn: "20m",
      issuer: "glassesOn - Eyeglasses Online Store & Blog",
      audience: currentUser.email,
    };
    JWT.sign(payload, refreshToken, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      // TODO: implement redis cache
      /* client.SET(userId, token, 'EX', 365 * 24 * 60 * 60, (err, reply) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          return
        }
        resolve(token)
      }) */
      resolve(token);
    });
  });
};
