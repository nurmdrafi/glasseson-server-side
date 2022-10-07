const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const createError = require("http-errors");
const PORT = process.env.PORT || 5000;
const corsConfig = require("./config/corsConfig");
require("dotenv").config();
require("./helpers/init_mongodb");

/* app configuration */
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// testing
app.get("/test", (req, res) => {
  res.send({ message: "Hello World" });
});

/* routes */
const routes = require("./routes");
app.use("/", routes);

// error handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
