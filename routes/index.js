const routes = require("express").Router();
const authRoutes = require("./authRoutes");

// blogRoutes = require("./blogRoutes"),
// paymentRoutes = require("./paymentRoutes");

routes.use("/auth", authRoutes);
// routes.use("/blog", blogRoutes);
// routes.use("/payment", paymentRoutes);

module.exports = routes;
