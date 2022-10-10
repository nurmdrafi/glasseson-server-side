const routes = require("express").Router();
const validate = require("../middlewares/validator");
const { user } = require("../schemas");
const {
  handleRegister,
  handleLogin,
  handleLogout,
  verifyRefreshToken,
} = require("../controllers/authController");

routes.post("/register", validate(user.register, "body"), handleRegister);
routes.post("/login", validate(user.login, "body"), handleLogin);
routes.get("/logout", handleLogout);
routes.get("/refresh", verifyRefreshToken);

module.exports = routes;
