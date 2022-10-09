const expressLoader = require("./express");
const mongooseLoader = require("./mongoose");

loaders = async ({ expressApp }) => {
  await mongooseLoader();
  await expressLoader({ app: expressApp });
};

module.exports = loaders;
