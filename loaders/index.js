const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");
const redisLoader = require("./redis");

loaders = async ({ expressApp }) => {
  await mongooseLoader();
  await expressLoader({ app: expressApp });
  await redisLoader();
};

module.exports = loaders;
