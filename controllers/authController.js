const { User } = require("../models");
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../utils/generateJWT");

const authController = {
  handleRegister: async (req, res, next) => {
    try {
      const { username, email, first_name, last_name, password } = req.body;

      // check duplicate email in database
      const isExist = await User.findOne({ email: email });
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
      next(error);
    }
  },
  handleLogin: async (req, res, next) => {
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
  },
  handleLogout: async (req, res, next) => {
    try {
      const cookies = req.cookies;
      const refreshToken = cookies?.jwt;
      if (!refreshToken) {
        throw createError.BadRequest();
      }
      await verifyRefreshToken(refreshToken);

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
      next(error);
    }
  },
  handleRefreshToken: async (req, res) => {
    try {
      const prevRefreshToken = req?.cookies?.jwt;
      if (!prevRefreshToken) {
        throw createError.Forbidden();
      }

      const payload = await verifyRefreshToken(prevRefreshToken);

      const accessToken = await signAccessToken(payload);
      const refreshToken = await signRefreshToken(payload);

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
    } catch (error) {
      next(error);
    }
  },
};

module.exports = authController;
