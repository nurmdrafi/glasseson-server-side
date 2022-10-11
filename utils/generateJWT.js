const JWT = require("jsonwebtoken");
const createError = require("http-errors");
const config = require("../config");

exports.signAccessToken = (currentUser) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      role: currentUser.role,
    };
    const accessToken = config.secret.accessToken;
    const options = {
      expiresIn: "20m",
      issuer: "glassesOn - Eyeglasses Online Store & Blog",
      audience: currentUser.email,
    };
    JWT.sign(payload, accessToken, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
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
    const refreshToken = config.secret.refreshToken;
    const options = {
      expiresIn: "20m",
      issuer: "glassesOn - Eyeglasses Online Store & Blog",
      audience: currentUser.email,
    };
    JWT.sign(payload, refreshToken, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
      }
      resolve(token);
    });
  });
};

exports.verifyRefreshToken = (refreshToken) => {
  return new Promise((resolve, reject) => {
    JWT.verify(
      refreshToken,
      config.secret.refreshToken,
      async (err, payload) => {
        if (err) {
          if (err.name === "JsonWebTokenError") {
            return next(createError.Unauthorized());
          } else {
            return next(createError.Unauthorized(err.message));
          }
        }
        resolve(payload);
      }
    );
  });
};
