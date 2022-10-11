const routes = require("express").Router();
const validate = require("../middlewares/validator");
const { authSchema } = require("../schemas");
const {
  handleRegister,
  handleLogin,
  handleLogout,
  handleRefreshToken,
} = require("../controllers/authController");

routes.post("/register", validate(authSchema.register, "body"), handleRegister);
routes.post("/login", validate(authSchema.login, "body"), handleLogin);
routes.get("/logout", handleLogout);
routes.get("/refresh-token", handleRefreshToken);

module.exports = routes;
