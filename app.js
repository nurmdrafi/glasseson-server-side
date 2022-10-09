const express = require("express");
const createError = require("http-errors");
const { port } = require("./config/index");
const PORT = port || 5000;
const loaders = require("./loaders");

async function startServer() {
  const app = express();
  await loaders({ expressApp: app });

  // test API
  app.get("/test", (req, res) => {
    res.send({ message: "Hello World" });
  });

  // routes
  const routes = require("./routes");
  app.use("/", routes);

  // error handler
  app.use((req, res, next) => {
    next(createError.NotFound());
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      status: err.status || 500,
      message: err.message,
    });
  });

  // listening port
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

startServer();
