const routes = require("express").Router(),
  authRoutes = require("./authRoutes");

routes.use("/auth", authRoutes);

module.exports = routes;
