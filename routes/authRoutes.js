const routes = require("express").Router();
const validate = require("../middlewares/validator");
const { authSchema } = require("../schemas");
const authController = require("../controllers/authController");

routes.post(
  "/register",
  validate(authSchema.register, "body"),
  authController.handleRegister
);
routes.post(
  "/login",
  validate(authSchema.login, "body"),
  authController.handleLogin
);
routes.delete("/logout", authController.handleLogout);
routes.get("/refresh-token", authController.handleRefreshToken);

module.exports = routes;
