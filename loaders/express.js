const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const corsConfig = require("../config/corsConfig");

expressLoader = async ({ app }) => {
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

  return app;
};

module.exports = expressLoader;
