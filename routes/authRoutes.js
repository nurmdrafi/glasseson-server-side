const routes = require("express").Router();
const {
  handleRegister,
  handleLogin,
  handleLogout,
  verifyRefreshToken,
} = require("../controllers/authController");

routes.post("/register", handleRegister);
routes.post("/login", handleLogin);
routes.get("/logout", handleLogout);
routes.get("/refresh", verifyRefreshToken);

module.exports = routes;
