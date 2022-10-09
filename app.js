const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const { errors } = require("celebrate");
const logger = require("morgan");
const PORT = process.env.PORT || 5000;
const corsConfig = require("./config/corsConfig");
const connectingDatabase = require("./helpers/connectingMongoDB");
require("dotenv").config();

// app configuration
const app = express();
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());
app.use(logger("dev"));
app.use(errors());

// connecting database
connectingDatabase();

// testing
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
