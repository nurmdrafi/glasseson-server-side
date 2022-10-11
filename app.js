const express = require("express");
const createError = require("http-errors");
const config = require("./config");
const PORT = config.port || 5000;
const loaders = require("./loaders");
const { client } = require("./loaders/redis");

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
  client.SET("foo", "bar");

  // listening port
  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}

startServer();
