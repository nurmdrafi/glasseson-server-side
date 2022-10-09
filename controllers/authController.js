const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/index");
const createError = require("http-errors");
const { signAccessToken, signRefreshToken } = require("../helpers/JWT.sign");

// create new user / register
exports.handleRegister = async (req, res, next) => {
  try {
    const { username, email, first_name, last_name, password } = req.body;

    // check duplicate email in database
    const isExist = await models.User.findOne({ email: email });
    if (isExist)
      throw createError.Conflict(`${email} is already been registered`);
    else {
      const user = new User({
        username,
        email,
        first_name,
        last_name,
        password,
      });
      await user.save();
      res.status(201).json({ message: "New User Registered" });
    }
  } catch (error) {
    // next(error);
    if (error.name === "ValidationError") {
      const messages = [];
      for (let field in error.errors) {
        messages.push(error.errors[field].message);
      }
      res.status(422).json({ message: messages.join(", ").toString() });
    } else {
      next(error);
    }
  }
};

// handle login
exports.handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError.BadRequest();
    }
    // check valid user & password
    const currentUser = await User.findOne({ email: email });
    if (!currentUser) {
      throw createError.NotFound("Email is not exist");
    } else {
      const isMatch = await bcrypt.compare(password, currentUser.password);
      if (!isMatch) {
        throw createError.NotFound("Invalid password");
      } else {
        const accessToken = await signAccessToken(currentUser);
        const refreshToken = await signRefreshToken(currentUser);

        // send tokens
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
          accessToken,
        });

        // store refresh token
        await User.updateOne(
          { email: email },
          { $set: { refreshToken: refreshToken } }
        );
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.handleLogout = async (req, res) => {
  try {
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;

    // delete refresh token from database
    await User.updateOne(
      { refreshToken: refreshToken },
      { $set: { refreshToken: "" } }
    );

    // delete refresh token from cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "User Logout" });
  } catch (error) {
    res.status(401).json({ message: "UnAuthorized Access" });
  }
};

exports.verifyRefreshToken = async (req, res) => {
  try {
    const prevRefreshToken = req?.cookies?.jwt;
    const currentUser = await User.findOne({ refreshToken: prevRefreshToken });

    jwt.verify(prevRefreshToken, refreshTokenSecret, async (err, decoded) => {
      if (err || !currentUser) {
        res.status(403).send({ message: "Forbidden Access" });
      } else {
        const payload = {
          _id: decoded._id,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
        };

        // create new tokens
        const accessToken = jwt.sign(payload, accessTokenSecret, {
          expiresIn: "20m",
        });
        const refreshToken = jwt.sign(payload, refreshTokenSecret, {
          expiresIn: "1d",
        });

        // send tokens
        res.cookie("jwt", refreshToken, {
          httpOnly: true,
          sameSite: "none",
          secure: true,
          maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
          accessToken,
        });

        // store new refresh token
        await User.updateOne(
          { email: decoded.email },
          { $set: { refreshToken: refreshToken } }
        );
      }
    });
  } catch (error) {
    res.status(401).json({ message: "UnAuthorized Access" });
  }
};
