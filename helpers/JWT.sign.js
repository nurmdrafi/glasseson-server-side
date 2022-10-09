const JWT = require("jsonwebtoken");
const createError = require("http-errors");

exports.signAccessToken = (currentUser) => {
  return new Promise((resolve, reject) => {
    const payload = {
      _id: currentUser._id,
      username: currentUser.username,
      email: currentUser.email,
      role: currentUser.role,
    };
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "20m",
      issuer: "glassesOn - Eyeglasses Online Store & Blog",
      audience: currentUser.email,
    };
    JWT.sign(payload, secret, options, (err, token) => {
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
    const secret = process.env.REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "20m",
      issuer: "glassesOn - Eyeglasses Online Store & Blog",
      audience: currentUser.email,
    };
    JWT.sign(payload, secret, options, (err, token) => {
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
